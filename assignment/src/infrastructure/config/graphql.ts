import {ApolloServer} from 'apollo-server-express';
import { resolver } from '../graphql/resolvers/assignment';
import { typeDefs } from "../graphql/typeDefs/typeDefs";
import { errorHandlingPlugin } from '../middleware/error/errorMiddleware';



export const server=new ApolloServer({
    typeDefs:typeDefs,
    resolvers: resolver,
    introspection: true,
    plugins:[errorHandlingPlugin]
});