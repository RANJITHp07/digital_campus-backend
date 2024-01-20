export interface IErrorHandler {
    graphqlError(message: string, code: string): never;
    userInputError(message: string): never;
    apolloError(err: any): never;
  }