import { ApolloServer, gql } from 'apollo-server';
import mongoose from 'mongoose';
import Book from './models/book.model';

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  type Book {
    id: ID
    title: String
    author: String
    cover: String
  }

  type Query {
    books: [Book]
  }

  type Mutation {
    addBook(title: String, author: String, cover: String): Book
  }
`;

const books = [
  {
    id: 1,
    title: 'The Awakening',
    author: 'Kate Chopin',
    cover: 'https://images-na.ssl-images-amazon.com/images/I/51Uj6YpUDWL._SX306_BO1,204,203,200_.jpg'
  },
  {
    id: 2,
    title: 'City of Glass',
    author: 'Paul Auster',
    cover: 'https://booklife.com/image-factory/http/localhost/amazongetcover/9780380771080.jpg/w204.jpg'
  },
];

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    books: async () => {
      const books = await Book.find()
      return books
    },
  },
  Mutation: {
    addBook: async (...args) => {
      const newBook = await Book.create(args[1]);
      return newBook
    }
  }
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

mongoose.connect('mongodb://localhost:27017/books', { autoIndex: false })
  .then(async conn => {
    // console.log()

    // The `listen` method launches a web server.
    server.listen().then(({ url }: { url: string }) => {
      console.log(`🚀  Server ready at ${url}`);
    });

  });
  
