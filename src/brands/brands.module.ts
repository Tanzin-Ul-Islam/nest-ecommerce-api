import { Module } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { BrandsController } from './brands.controller';
import { BrandsRepository } from './brands.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { BrandSchema, Brands } from './entities/brand.entity';
import { MulterCoreService } from 'src/core/multer/multer-core.service';

@Module({
  controllers: [BrandsController],
  providers: [BrandsService, BrandsRepository, MulterCoreService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Brands.name,
        schema: BrandSchema
      }
    ])
  ],
})
export class BrandsModule { }
