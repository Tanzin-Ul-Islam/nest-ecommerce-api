import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { BrandsModule } from './brands/brands.module';
import { CategoryModule } from './category/category.module';
import { SubCategoryModule } from './sub-category/sub-category.module';
import { ProductModule } from './product/product.module';
import { ProductFilterModule } from './product-filter/product-filter.module';
import { ShippingAddressModule } from './address/shipping-address/shipping-address.module';
import { BillingAddressModule } from './address/billing-address/billing-address.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.MONGODBURL),
    UsersModule,
    CoreModule,
    AuthModule,
    BrandsModule,
    CategoryModule,
    SubCategoryModule,
    ProductModule,
    ProductFilterModule,
    ShippingAddressModule,
    BillingAddressModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
