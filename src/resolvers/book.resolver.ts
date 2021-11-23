import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import BookModel from '../models/book.model';
import Book from '../models/book.entity';

@Resolver(Book)
class BookResolver {
  constructor() {}

  @Query(returns => [Book])
  async books() {
    const books = await BookModel.find();
    return books;
  }

  @Mutation(returns => Book)
  addBook(
    @Arg("title") title: string,
    @Arg("author") author: string,
    @Arg("cover") cover: string,
  ): Promise<Book> {
    return BookModel.create({ title, author, cover });
  }
}

export default BookResolver