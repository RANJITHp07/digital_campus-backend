import { GraphQLError } from "graphql";
import { ApolloError } from "apollo-server";
import { UserInputError } from "apollo-server";

export class ErrorHandler {
  graphqlError(message: string, err: any, code: string) {
    throw new GraphQLError(message + err, {
      extensions: {
        code: code,
        
      }
    });
  }


  apolloError(message: string, err: any) {
    throw new ApolloError(message + ' ' + err);
  }


}
