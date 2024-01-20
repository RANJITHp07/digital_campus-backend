import {ApolloServer} from 'apollo-server-express';
import { resolver } from '../graphql/resolvers/resolver';
import { typeDefs } from "../graphql/typeDefs/typeDefs";
import { errorHandlingPlugin } from '@auth-middlewares/common';

export const server=new ApolloServer({
    typeDefs:typeDefs,
    resolvers: resolver,
    introspection: true,
    plugins:[errorHandlingPlugin],
    context: ({ req }) => ({ req })
});