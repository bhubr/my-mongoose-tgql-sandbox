import 'reflect-metadata';
import { ApolloServer, gql } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import mongoose from 'mongoose';
import BookResolver from './resolvers/book.resolver';

async function bootstrap() {

  // build Schema 
  const schema = await buildSchema({
    resolvers: [BookResolver],
  });

  // The ApolloServer constructor requires two parameters: your schema
  // definition and your set of resolvers.
  const server = new ApolloServer({ schema });
  
  // Connect to Mongo
  const conn = await mongoose.connect('mongodb://localhost:27017/books', { autoIndex: false })

  const { url } = await server.listen();
  console.log(`🚀  Server ready at ${url}`);
}

bootstrap();
