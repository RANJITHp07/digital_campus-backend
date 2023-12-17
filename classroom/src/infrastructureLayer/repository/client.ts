// import { Channel, Connection, connect } from "amqplib";
// import { EventEmitter } from "events";
// import Listener from "./listenrepository";
// import Publisher from "./publishrepository";

// class RabbitMQClient {
//   private constructor() {}

//   private static instance: RabbitMQClient;
//   private isInitialized = false;

//   private producer: Publisher;
//   private consumer: Listener;
//   private connection: Connection;
//   private producerChannel: Channel;
//   private consumerChannel: Channel;


//   public static getInstance() {
//     if (!this.instance) {
//       this.instance = new RabbitMQClient();
//     }
//     return this.instance;
//   }

//   async initialize() {
//     if (this.isInitialized) {
//       return;
//     }
//     try {
//       this.producer = new Publisher();
//       this.consumer = new Listener();

//       this.producerChannel = await this.producer.ensureConnection();
//       this.consumerChannel = await this.connection.createChannel();

//       const { queue: replyQueueName } = await this.consumerChannel.assertQueue(
//         "",
//         { exclusive: true }
//       );

//       this.eventEmitter = new EventEmitter();
      

//       this.consumer.consumeMessages('AuthReply');

//       this.isInitialized = true;
//     } catch (error) {
//       console.log("rabbitmq error...", error);
//     }
//   }
//   async produce(data: any) {
//     if (!this.isInitialized) {
//       await this.initialize();
//     }
//     return await this.producer.produceMessages(data);
//   }
// }

// export default RabbitMQClient.getInstance();