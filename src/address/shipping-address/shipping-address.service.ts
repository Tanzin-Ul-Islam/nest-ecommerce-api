import { Injectable } from '@nestjs/common';
import { CreateShippingAddressDto } from './dto/create-shipping-address.dto';
import { UpdateShippingAddressDto } from './dto/update-shipping-address.dto';
import { ShippingAddressRepository } from './shipping-address.repository';

@Injectable()
export class ShippingAddressService {
  constructor(private readonly shippingAddressRepository: ShippingAddressRepository) { }
  async create(createShippingAddressDto: CreateShippingAddressDto) {
    try {
      const res = await this.shippingAddressRepository.create(createShippingAddressDto);
      return {
        success: true,
        message: "Shipping address created successfully.",
        data: res,
      }
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async findByUserId(id: string) {
    try {
      const res = await this.shippingAddressRepository.findByUserId(id);
      return {
        success: true,
        message: "Data fetched successfully.",
        data: res,
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  async findOne(id: string) {
    try {
      const res = await this.shippingAddressRepository.findById(id);
      return {
        success: true,
        message: "Data fetched successfully.",
        data: res,
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  async update(id: string, updateShippingAddressDto: UpdateShippingAddressDto) {
    try{
      const address = await this.shippingAddressRepository.findById(id);
      if(!address){
        throw new Error("Shipping Address Not found.");
      }
      const updateAddress = await this.shippingAddressRepository.updateOne({_id: id}, {...updateShippingAddressDto});
      return{
        success: true,
        message: "Billing address updated successfully."
      }
    }catch(error){
      throw new Error(error)
    }
  }

  async remove(id: string) {
    try{
      const address = await this.shippingAddressRepository.findById(id);
      if(!address){
        throw new Error("Billing Address Not found.");
      }
      const updateAddress = await this.shippingAddressRepository.updateOne({_id: id}, {deleted: true});
      return{
        success: true,
        message: "Billing address deleted successfully."
      }
    }catch(error){
      throw new Error(error)
    }
  }
}
