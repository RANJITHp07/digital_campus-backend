import { Channel, Connection } from "amqplib";
import connect from "../../config/rabbitmq";

export class Responder  {
  private channel: Channel | undefined;
  private connection: Connection | undefined;

  constructor() {
    this.channel = undefined;
    this.connection = undefined;
  }

  async listenForRequests(
    exchange: string,
    routingKey: string,
    queueName: string,
    callback: (data: any) => Promise<unknown>
  ): Promise<void> {
    await this.ensureConnection();

    if (!this.channel || !this.connection) {
      throw new Error("RabbitMQ connection not available");
    }

    try {
      await this.channel.assertExchange(exchange, "direct", { durable: true });
      const queue = await this.channel.assertQueue(queueName);

      await this.channel.bindQueue(queue.queue, exchange, routingKey);

      await this.channel.consume(queue.queue, async (data) => {
        if (data) {
          try {
            const parsedData = JSON.parse(data.content.toString());
            const reply = await callback(parsedData);

            // Send the reply to the callback queue specified in the request message properties
            this.channel?.sendToQueue(
              data.properties.replyTo,
              Buffer.from(JSON.stringify(reply)),
              {
                correlationId: data.properties.correlationId,
              }
            );

            this.channel?.ack(data);
          } catch (err) {
            console.error("Error processing message:", err);
          }
        }
        
      });
    } catch (err) {
      console.error("Error listening for requests:", err);
    }
  }

  private async ensureConnection() {
    if (!this.channel) {
      const { channel, connection } = await connect();
      this.channel = channel;
      this.connection = connection;
    }
  }
}

export default Responder;
