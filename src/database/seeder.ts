// src/database/seeder.ts
import { DataSource } from 'typeorm';
import { Product } from '../product/product.entity'; // Đường dẫn đúng
import { Category } from '../category/category.entity';

export async function seedData(dataSource: DataSource) {
  const categoryRepository = dataSource.getRepository(Category);
  const productRepository = dataSource.getRepository(Product);

  const category = new Category();
  category.name = 'Danh mục 1';
  await categoryRepository.save(category);

  const product = new Product();
  product.name = 'Bao gấm cát tường';
  product.price = 100.0;
  product.description = 'Mô tả sản phẩm';
  product.categoryId = category.id;
  await productRepository.save(product);

  console.log('Dữ liệu mẫu đã được thêm!');
}