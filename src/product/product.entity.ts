import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType() 
@Entity() 
export class Product {
  @Field() 
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field(() => Number)
  @Column('float')
  price: number;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  categoryId: string;
}