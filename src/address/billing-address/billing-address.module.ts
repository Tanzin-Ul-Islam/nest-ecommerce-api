import { Module } from '@nestjs/common';
import { BillingAddressService } from './billing-address.service';
import { BillingAddressController } from './billing-address.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BillingAddress, BillingAddressSchema } from './entities/billing-address.entity';
import { BillingAddressRepository } from './billing-address.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: BillingAddress.name,
        schema: BillingAddressSchema
      }
    ])
  ],
  controllers: [BillingAddressController],
  providers: [BillingAddressService, BillingAddressRepository]
})
export class BillingAddressModule {}
