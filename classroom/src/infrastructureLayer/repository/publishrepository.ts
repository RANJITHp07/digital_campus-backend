import { Channel, Connection } from "amqplib";
import connect from "../config/rabbitmq";
import IPublish from "../../usecaseLayer/interface/publishRepository";
import { randomUUID } from "crypto";

class Publisher implements IPublish{
  private channel: Channel | undefined;
  private connection: Connection | undefined;

  constructor() {
    this.channel = undefined;
    this.connection = undefined;
  }

  //to publish in a queue
  async publish(exchange: string, routingKey: string, data: unknown): Promise<boolean> {
    await this.ensureConnection();

    if (!this.channel || !this.connection) {
      throw new Error("RabbitMQ connection not available");
    }

    try {
      await this.channel.assertExchange(exchange, "direct",{durable:true});
        await this.channel!.publish(
          exchange,
          routingKey,
          Buffer.from(JSON.stringify(data)),
          { persistent: true },      
        )
      return true;
    } catch (err) {
      console.error("Error in publish:", err);
      return false;
    }
  }

  async producer(data: any,rpcQueue:string,replyQueueName:string) {
    await this.ensureConnection();

    if (!this.channel || !this.connection) {
      throw new Error("RabbitMQ connection not available");
    }
    const uuid = randomUUID();
    console.log("the corr id is ", uuid);
    this.channel.sendToQueue(
      rpcQueue,
      Buffer.from(JSON.stringify(data)),
      {
        replyTo: replyQueueName,
        correlationId: uuid,
        expiration: 10,
        headers: {
          function: data.operation,
        },
      }
    );
  }

  async ensureConnection() {
    if (!this.channel) {
      const {channel,connection}=await connect();
      this.channel = channel;
      this.connection = connection;
    }
  }
}

export default Publisher;


