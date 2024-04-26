import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { CategoryRepository } from './category.repository';
import { MulterCoreService } from 'src/core/multer/multer-core.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './entities/category.entity';
import { SubCategoryModule } from 'src/sub-category/sub-category.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Category.name,
        schema: CategorySchema,
      },
    ]),
    SubCategoryModule,
  ],

  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepository, MulterCoreService],
})
export class CategoryModule { }
