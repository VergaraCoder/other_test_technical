import { Injectable } from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Stock } from './entities/stock.entity';
import { Repository } from 'typeorm';
import { manageError } from 'src/common/erros/custom/custom.error';

@Injectable()
export class StockService {
  
  constructor(
    @InjectRepository(Stock)
    private stockRepository:Repository<Stock>
  ){}

  async create(createStockDto: CreateStockDto) {
    try{
      const dataStock=this.stockRepository.create(createStockDto);
      await this.stockRepository.save(dataStock);
      return dataStock;
    }catch(err:any){
      throw manageError.signedError(err.message);
    }
  }

  async findAll() {
    try{
      const registersStock=await this.stockRepository.find();
      if(registersStock.length==0){
        throw new manageError({
          type:"NOT_FOUND",
          message:"DOES THERE ARE NOT REGISTERS YET"
        });
      }
      return registersStock;
    }catch(err:any){
      throw manageError.signedError(err.message);
    }
  }


  async verifyDisponibility(productsId:any){
    try{
      let products=[];
      for(const product of productsId){
        const query=await this.stockRepository.findOneBy({productId:product});
        if(!query || query.quantity<product.quantity){
          throw new manageError({
            type:"BAD_REQUEST",
            message:`THERE IS NOT ENOUGH ${query.product.nameProduct}`
          });
        }
        await this.update(query.id,product.quantity);
        products.push(query);
      }
      return products;
    }catch(err:any){
      throw manageError.signedError(err.message);
    }
  }


  async findOne(id: number) {
    try{
      const register=await this.stockRepository.findOne({where:{id:id}});
      if(!register){
        throw new manageError({
          type:"NOT_FOUND",
          message:"THIS REGISTER IN STOCK NOT EXIST"
        });
      }
      return register;
    }catch(err:any){
      throw manageError.signedError(err.message);
    }
  }

  async update(id: number, updateStockDto: UpdateStockDto) {
    try{
      const {affected}=await this.stockRepository.update(id,updateStockDto);
      if(affected==0){
        throw new manageError({
          type:"BAD_GATEWAY",
          message:"THE REGISTER NOT EXIST IN STOCK"
        });
      }
      return "perfectly updated"
    }catch(err:any){
      throw manageError.signedError(err.message);
    }
  }

  async remove(id: number) {
    try{
      const {affected}=await this.stockRepository.delete(id);
      if(affected==0){
        throw new manageError({
          type:"BAD_GATEWAY",
          message:"FAILEF TO DELETE REGISTER OF STOCK"
        });
      }
      return "perfectly deleted"
    }catch(err:any){
      throw manageError.signedError(err.message);
    }
  }
}
