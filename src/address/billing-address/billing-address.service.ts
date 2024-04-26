import { Injectable } from '@nestjs/common';
import { CreateBillingAddressDto } from './dto/create-billing-address.dto';
import { UpdateBillingAddressDto } from './dto/update-billing-address.dto';
import { BillingAddressRepository } from './billing-address.repository';

@Injectable()
export class BillingAddressService {
  constructor(private readonly billingAddressRepository: BillingAddressRepository) { }
  async create(createBillingAddressDto: CreateBillingAddressDto) {
    try {
      const res = await this.billingAddressRepository.create(createBillingAddressDto);
      return {
        success: true,
        message: "Billing address created successfully.",
        data: res,
      }
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async findByUserId(id: string) {
    try{
      const res = await this.billingAddressRepository.findByUserId(id);
      return {
        success: true,
        message: "Data fetched successfully.",
        data: res,
      }
    }catch(error){
      throw new Error(error)
    }
  }

  findAll() {
    return `This action returns all billingAddress`;
  }

  async findOne(id: string) {
    try{
      const res = await this.billingAddressRepository.findById(id);
      return {
        success: true,
        message: "Data fetched successfully.",
        data: res,
      }
    }catch(error){
      throw new Error(error)
    }
  }

  async update(id: string, updateBillingAddressDto: UpdateBillingAddressDto) {
    try{
      const address = await this.billingAddressRepository.findById(id);
      if(!address){
        throw new Error("Billing Address Not found.");
      }
      const updateAddress = await this.billingAddressRepository.updateOne({_id: id}, {...updateBillingAddressDto});
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
      const address = await this.billingAddressRepository.findById(id);
      if(!address){
        throw new Error("Billing Address Not found.");
      }
      const updateAddress = await this.billingAddressRepository.updateOne({_id: id}, {deleted: true});
      return{
        success: true,
        message: "Billing address deleted successfully."
      }
    }catch(error){
      throw new Error(error)
    }
  }
}
