import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { manageError } from 'src/common/erros/custom/custom.error';

@Injectable()
export class CartService {
  
  constructor(
    @InjectRepository(Cart)
    private cartRepository:Repository<Cart>
  ){}

  async create(createCartDto: CreateCartDto) {
    try{
      const dataCart=this.cartRepository.create(createCartDto);
      await this.cartRepository.save(dataCart);
      return dataCart;
    }catch(err:any){
      throw err;
    }
  }

  findAll() {
    return `This action returns all cart`;
  }

  async verifyCartByUserId(userId:string){
    try{
      const dataCart=await this.cartRepository.findOneBy({userId:userId});
      if(!dataCart){
        return await this.create(userId);
      }
      return dataCart;
    }catch(err:any){
      throw err;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} cart`;
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    return `This action updates a #${id} cart`;
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
