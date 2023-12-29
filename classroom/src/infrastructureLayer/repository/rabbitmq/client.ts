import { Channel, Connection } from "amqplib";
import connect from "../../config/rabbitmq";


export class Requester {
  private channel: Channel | undefined;
  private connection: Connection | undefined;
  private callbackQueue: string;

  constructor() {
    this.channel = undefined;
    this.connection = undefined;
    this.callbackQueue = ""; // Initialize the callback queue
  }

  async publishWithReply(
    exchange: string,
    routingKey: string,
    data: unknown
  ): Promise<unknown | null> {
    await this.ensureConnection();

    if (!this.channel || !this.connection) {
      throw new Error("RabbitMQ connection not available");
    }

    try {
      // Create a callback queue for receiving the reply
      const { queue } = await this.channel.assertQueue("", { exclusive: true });
      this.callbackQueue = queue;

      // Send the request to the request queue with the callback queue specified
      await this.channel.assertExchange(exchange, "direct", { durable: true });
      await this.channel.publish(
        exchange,
        routingKey,
        Buffer.from(JSON.stringify(data)),
        {
          persistent: true,
          replyTo: this.callbackQueue,
          correlationId: generateCorrelationId(),
        }
      );

      // Wait for the reply on the callback queue
      const reply = await this.waitForReply();

      return reply;
    } catch (err) {
      console.error("Error in publishWithReply:", err);
      return null;
    }
  }

  private async waitForReply(): Promise<unknown> {
    return new Promise((resolve) => {
      this.channel?.consume(this.callbackQueue, (reply) => {
        if (reply) {
          const parsedReply = JSON.parse(reply.content.toString());
          this.channel?.ack(reply);
          resolve(parsedReply);
        }
      });
    });
  }

  private async ensureConnection() {
    if (!this.channel) {
      const { channel, connection } = await connect();
      this.channel = channel;
      this.connection = connection;
    }
  }
}

function generateCorrelationId(): string {
  return Math.random().toString() + Math.random().toString();
}

export default Requester;
