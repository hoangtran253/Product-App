import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryInput } from './dto/create-category.input';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async findOne(id: string): Promise<Category> {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) throw new Error('Danh mục không tồn tại');
    return category;
  }

  async create(input: CreateCategoryInput): Promise<Category> {
    const category = this.categoryRepository.create(input);
    return this.categoryRepository.save(category);
  }
}