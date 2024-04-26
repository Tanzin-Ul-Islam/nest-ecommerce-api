import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShippingAddressService } from './shipping-address.service';
import { CreateShippingAddressDto } from './dto/create-shipping-address.dto';
import { UpdateShippingAddressDto } from './dto/update-shipping-address.dto';

@Controller('shipping-address')
export class ShippingAddressController {
  constructor(private readonly shippingAddressService: ShippingAddressService) { }

  @Post()
  create(@Body() createShippingAddressDto: CreateShippingAddressDto) {
    return this.shippingAddressService.create(createShippingAddressDto);
  }

  @Get('/user/:userid')
  findByUserId(@Param('userid') userid: string) {
    return this.shippingAddressService.findByUserId(userid);
  }


  @Get(':id')
  findById(@Param('id') id: string) {
    return this.shippingAddressService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShippingAddressDto: UpdateShippingAddressDto) {
    return this.shippingAddressService.update(id, updateShippingAddressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shippingAddressService.remove(id);
  }
}
