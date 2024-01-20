interface IMessageRepository {
  create(message: any): Promise<unknown | null>;
  getConversation(id: string, skip: number): Promise<unknown>;
}

export default IMessageRepository;
