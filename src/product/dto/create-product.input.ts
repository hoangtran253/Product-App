import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
  @Field()
  name: string;

  @Field(() => Float)
  price: number;

  @Field()
  description: string;

  @Field()
  categoryId: string;
}