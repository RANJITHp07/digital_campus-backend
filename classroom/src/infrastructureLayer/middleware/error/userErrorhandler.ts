import { GraphQLError } from "graphql";
import { ApolloError } from "apollo-server";
import { UserInputError } from "apollo-server";

export class ErrorHandler {
  graphqlError(message: string, code: string) {
    throw new GraphQLError(message, {
      extensions: {
        code: code,
      },
    });
  }

  userInputerror(message: string) {
    throw new UserInputError(message);
  }

  apolloError(err: any) {
    throw new ApolloError(err);
  }
}
