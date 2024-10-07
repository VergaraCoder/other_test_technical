import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { manageError } from 'src/common/erros/custom/custom.error';

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product)
    private productRepository:Repository<Product>
  ){}

  async create(createProductDto: CreateProductDto) {
    try{
      const dataProduct=this.productRepository.create(createProductDto);
      await this.productRepository.save(dataProduct);
      return dataProduct;
    }catch(err:any){
      throw err;
    }
  }

  async findAll(querys?:any) {
    try{
      const products=await this.productRepository.find();
      if(products.length==0){
        throw new manageError({
          type:"NOT_FOUND",
          message:"DOES THERE ARE PRODUCTS"
        });
      } 
      return products;
    }catch(err:any){
      throw manageError.signedError(err.message);
    }
  }

  async findOne(id: string) {
    try{
      const product=await this.productRepository.findOneBy({id});
      if(!product){
        throw new manageError({
          type:"NOT_FOUND",
          message:"DOES THERE ARE PRODUCT"
        });
      } 
      return product;
    }catch(err:any){
      throw manageError.signedError(err.message);
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try{
      const {affected}=await this.productRepository.update(id,updateProductDto);
      if(affected==0){
        throw new manageError({
          type:"NOT_FOUND",
          message:"FAILDED TO UPDATE PRODUCT"
        });
      } 
      return "Product perfectly upodated";
    }catch(err:any){
      throw manageError.signedError(err.message);
    }
  }

  async remove(id: string) {

    try{
      const {affected}=await this.productRepository.delete(id);
      if(affected==0){
        throw new manageError({
          type:"NOT_FOUND",
          message:"FAILDED TO DELETED PRODUCT"
        });
      } 
      return "Product perfectly deleted";
    }catch(err:any){
      throw manageError.signedError(err.message);
    }
  }
}
