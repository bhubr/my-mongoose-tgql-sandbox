import { ApolloServer, gql } from 'apollo-server';
import createServer from '../../src/create-server';

let server: ApolloServer;

const GET_BOOKS = gql`
  query GetBooks {
    books {
      _id
      title
      author
      cover
    }
  }
`;

const ADD_BOOK = gql`
  mutation AddBook($title: String!, $author: String!, $cover: String!) {
    addBook(title: $title, author: $author, cover: $cover) {
      _id
      title
      author
      cover
    }
  }
`;

beforeAll(async () => {
  server = await createServer();
});

describe('book resolver', () => {
  it('gets a list of books', async () => {
    const result = await server.executeOperation({
      query: GET_BOOKS,
    });
    expect(result.errors).toBeUndefined();
    expect(Array.isArray(result?.data?.books));
  });

  it('creates a book then gets a list of books', async () => {
    const result1 = await server.executeOperation({
      query: ADD_BOOK,
      variables: { title: 'Dummy Book', author: 'John Doe', cover: 'https://i.imgur.com/wsGjkE9.png' },
    });
    const result2 = await server.executeOperation({
      query: GET_BOOKS,
    });
    expect(result1.errors).toBeUndefined();
    expect(Array.isArray(result2?.data?.books));
    expect(result2?.data?.books.length).toBe(1);
    expect(result2?.data?.books[0].title).toBe('Dummy Book');
  });
});
