import { Channel, Connection, ConsumeMessage } from "amqplib";
import connect from "../../config/rabbitmq";
import IListner from "../../../usecaseLayer/interface/listenRepository";

export class Listener implements IListner {
  private channel: Channel | undefined;
  private connection: Connection | undefined;

  constructor() {
    this.channel = undefined;
    this.connection = undefined;
  }

  async listen(
    exchange: string,
    routingKey: string,
    queueName: string,
    callback: (data: any) => void
  ): Promise<any> {
    await this.ensureConnection();

    if (!this.channel || !this.connection) {
      throw new Error("RabbitMQ connection not available");
    }

    try {
      await this.channel.assertExchange(exchange, "direct", { durable: true });
      const queue = await this.channel.assertQueue(queueName);

      await this.channel.bindQueue(queue.queue, exchange, routingKey);

      // Consume messages from the queue
      await this.channel.consume(queue.queue, async (data) => {
        if (data) {
          try {
            const parsedData = JSON.parse(data.content.toString());
            await callback(parsedData);
            this.channel?.ack(data); // Acknowledge successful processing
            return data;
          } catch (err) {
            console.error("Error processing message:", err);
            return false;
          }
        }
      });
      return true;
    } catch (err) {
      console.error("Error listening to queue:", err);
      return false;
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

export default Listener;
