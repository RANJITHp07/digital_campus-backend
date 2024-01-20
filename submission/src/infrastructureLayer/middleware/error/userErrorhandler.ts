import { GraphQLError } from "graphql";
import { ApolloError } from "apollo-server";
import { UserInputError } from "apollo-server";
import { IErrorHandler } from "../../../usecaseLayer/interface/errorHandler";

export class ErrorHandler implements IErrorHandler{
  graphqlError(message: string, code: string):never {
    throw new GraphQLError(message, {
      extensions: {
        code: code,
        
      }
    });
  }

  userInputError(message:string):never{
    throw new UserInputError(message);
  }


  apolloError(err: any):never {
    throw new ApolloError(err);
  }


}
