import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Category } from './category.entity';
import { CategoryService } from './category.service';
import { CreateCategoryInput } from './dto/create-category.input';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private categoryService: CategoryService) {}

  @Query(() => [Category], { name: 'layDanhSachDanhMuc' })
  async getAllCategories(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @Query(() => Category, { name: 'layDanhSachDanhMucTheoId' })
  async getCategoryById(@Args('id') id: string): Promise<Category> {
    return this.categoryService.findOne(id);
  }

  @Mutation(() => Category, { name: 'themDanhMuc' })
  async createCategory(
    @Args('input') input: CreateCategoryInput,
  ): Promise<Category> {
    return this.categoryService.create(input);
  }
}