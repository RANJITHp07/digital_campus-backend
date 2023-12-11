import { Channel, Connection } from "amqplib";
import { channel, connection, connect } from "../config/rabbitmq";
import IListner from "../../usecase/interface/listenRepository";

class Listener implements IListner {
  private channel: Channel | undefined;
  private connection: Connection | undefined;
  private isConnected: boolean;

  constructor() {
    this.channel = undefined;
    this.connection = undefined;
    this.isConnected = false;
  }

  // to listen to the channel 
  async listen(exchange: string, routingKey: string, callback: (data: any) => void) {
    await this.ensureConnection();

    if (!this.channel || !this.connection) {
      throw new Error("RabbitMQ connection not available");
    }

    try {
      await this.channel.assertExchange(exchange, "direct",{durable:true});
      const queue = await this.channel.assertQueue("", {durable:true });
      await this.channel.bindQueue(queue.queue, exchange, routingKey);
      

      this.channel.consume(queue.queue, (data) => {
        if (data) {
          callback(JSON.parse(data.content.toString()));
          this.channel?.ack(data);
        }
      });
    } catch (err) {
      console.error("Error in listen:", err);
    }
  }

  //ensures that the connection is established else it establish the connection
  private async ensureConnection() {
    if (!this.isConnected) {
      await connect();
      this.channel = channel;
      this.connection = connection;
      this.isConnected = true;
    }
  }
}

export default Listener;
