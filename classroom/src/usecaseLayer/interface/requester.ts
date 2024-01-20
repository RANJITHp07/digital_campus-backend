export interface IRequester {
    publishWithReply(exchange: string, routingKey: string, data: unknown): Promise<unknown | null>;
  }
  