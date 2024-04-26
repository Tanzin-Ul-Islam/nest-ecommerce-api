import { Module } from '@nestjs/common';
import { ShippingAddressService } from './shipping-address.service';
import { ShippingAddressController } from './shipping-address.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ShippingAddress, ShippingAddressSchema } from './entities/shipping-address.entity';
import { ShippingAddressRepository } from './shipping-address.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ShippingAddress.name,
        schema: ShippingAddressSchema
      }
    ])
  ],
  controllers: [ShippingAddressController],
  providers: [ShippingAddressService, ShippingAddressRepository]
})
export class ShippingAddressModule {}
