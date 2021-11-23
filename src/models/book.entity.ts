import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
class Book {
  @Field(type => ID)
  _id!: string;

  @Field()
  title!: string;

  @Field()
  author!: string;

  @Field()
  cover!: string;
}

export default Book
