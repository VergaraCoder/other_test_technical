import { Injectable } from '@nestjs/common';
import { CreateProductCartDto } from './dto/create-product-cart.dto';
import { UpdateProductCartDto } from './dto/update-product-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductCart } from './entities/product-cart.entity';
import { Repository } from 'typeorm';
import { StockService } from 'src/stock/stock.service';
import { manageError } from 'src/common/erros/custom/custom.error';

@Injectable()
export class ProductCartService {

  constructor(
    @InjectRepository(ProductCart)
    private productCartRepository:Repository<ProductCart>,
    private stockService:StockService
  ){}

  async create(createProductCartDto: CreateProductCartDto,cartId:number) {
    try{
      const disponibility=await this.stockService.verifyDisponibility(createProductCartDto);
      for(const dataProduct of disponibility){
        const query= this.productCartRepository.create({
          productId:dataProduct.id,
          cartId:cartId
        });
        await this.productCartRepository.save(query);
      }
      return "products add correctly"
    }catch(err:any){
      throw err;
    }
  }

  async findAll() {
    try{
      const productsCarts=await this.productCartRepository.find();
      if(productsCarts.length==0){
        throw new manageError({
          type:"NOT_FOUND",
          message:"DOES CREATED PRODUCTS CART YET"
        });
      } 
      return productsCarts;
    }catch(err:any){
      throw manageError.signedError(err.message);
    } 
  }

  async findOne(productId:string) {
    try{
      const productCart=await this.productCartRepository.findOneBy({productId:productId});
      if(!productCart){
        throw new manageError({
          type:"NOT_FOUND",
          message:"PRODUCT CART NOT FOUND"
        });
      } 
      return productCart;
    }catch(err:any){
      throw manageError.signedError(err.message);
    } 
  }

  async update(id: string, updateProductCartDto: any) {
    try{
      const {affected}=await this.productCartRepository.update(id,updateProductCartDto);
      if(affected==0){
        throw new manageError({
          type:"NOT_FOUND",
          message:"FAILED TO UPDATE PRODUCT CART"
        });
      } 
      return "perfectly updated";
    }catch(err:any){
      throw manageError.signedError(err.message);
    } 
  }

  async remove(id: string) {
    try{
      const {affected}=await this.productCartRepository.delete(id);
      if(affected==0){
        throw new manageError({
          type:"NOT_FOUND",
          message:"FAILED TO DELETE PRODUCT CART"
        });
      } 
      return "perfectly delete";
    }catch(err:any){
      throw manageError.signedError(err.message);
    } 
  }
}
