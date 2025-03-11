import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Product } from './product.entity';
import { ProductService } from './product.service';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';

@Resolver(() => Product) // Định nghĩa resolver cho Product
export class ProductResolver {
  constructor(private productService: ProductService) {}

  @Query(() => [Product], { name: 'layDanhSachSanPham' })
  async getAllProducts(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Query(() => [Product], { name: 'layDanhSachSanPhamTheoId' })
  async getProductsByCategoryId(
    @Args('categoryId') categoryId: string,
  ): Promise<Product[]> {
    return this.productService.findByCategoryId(categoryId);
  }

  @Mutation(() => Product, { name: 'themSanPhamMoi' }) // Trả về Product
  async createProduct(
    @Args('input') input: CreateProductInput,
  ): Promise<Product> {
    return this.productService.create(input);
  }

  @Mutation(() => Product, { name: 'suaSanPham' })
  async updateProduct(
    @Args('input') input: UpdateProductInput,
  ): Promise<Product> {
    return this.productService.update(input);
  }

  @Mutation(() => Boolean, { name: 'xoaSanPham' })
  async deleteProduct(@Args('id') id: string): Promise<boolean> {
    return this.productService.delete(id);
  }
}