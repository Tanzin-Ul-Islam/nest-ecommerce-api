import { Module } from '@nestjs/common';
import { ProductFilterService } from './product-filter.service';
import { ProductFilterController } from './product-filter.controller';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [
    ProductModule,
  ],
  controllers: [ProductFilterController],
  providers: [ProductFilterService]
})
export class ProductFilterModule { }
