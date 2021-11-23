import { ApolloServer, gql } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import BookResolver from './resolvers/book.resolver';

export default async function createServer() {
  // build Schema 
  const schema = await buildSchema({
    resolvers: [BookResolver],
  });

  // The ApolloServer constructor requires two parameters: your schema
  // definition and your set of resolvers.
  return new ApolloServer({ schema });
}
