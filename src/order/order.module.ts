import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { ProductCartModule } from 'src/product-cart/product-cart.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Order]),
    ProductCartModule
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports:[TypeOrmModule]

})
export class OrderModule {}
