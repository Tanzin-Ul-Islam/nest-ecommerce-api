import { Module, forwardRef } from '@nestjs/common';
import { SubCategoryService } from './sub-category.service';
import { SubCategoryController } from './sub-category.controller';
import { SubCategoryRepository } from './sub-category.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { SubCategory, SubCategorySchema } from './entities/sub-category.entity';
import { CategoryModule } from 'src/category/category.module';
import { MulterCoreModule } from 'src/core/multer/multer-core.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: SubCategory.name,
        schema: SubCategorySchema,
      }
    ]),
    forwardRef(() => CategoryModule),
    MulterCoreModule,
  ],
  controllers: [SubCategoryController],
  providers: [SubCategoryService, SubCategoryRepository],
  exports:[SubCategoryService, SubCategoryRepository]
})
export class SubCategoryModule { }
