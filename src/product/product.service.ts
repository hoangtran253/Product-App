// src/product/product.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async findByCategoryId(categoryId: string): Promise<Product[]> {
    return this.productRepository.find({ where: { categoryId } });
  }

  async create(input: CreateProductInput): Promise<Product> {
    const product = this.productRepository.create(input);
    return this.productRepository.save(product);
  }

  async update(input: UpdateProductInput): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id: input.id });
    if (!product) throw new Error('Sản phẩm không tồn tại');
    Object.assign(product, input);
    return this.productRepository.save(product);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.productRepository.delete(id);
    return result.affected > 0;
  }
}