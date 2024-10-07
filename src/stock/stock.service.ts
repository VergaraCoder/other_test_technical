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

  create(createStockDto: CreateStockDto) {
    return 'This action adds a new stock';
  }

  findAll() {
    return `This action returns all stock`;
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
        products.push(query);
      }
      return products;
    }catch(err:any){
      throw manageError.signedError(err.message);
    }
  }


  findOne(id: number) {
    return `This action returns a #${id} stock`;
  }

  update(id: number, updateStockDto: UpdateStockDto) {
    return `This action updates a #${id} stock`;
  }

  remove(id: number) {
    return `This action removes a #${id} stock`;
  }
}
