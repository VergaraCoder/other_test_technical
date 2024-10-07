import { Module } from '@nestjs/common';
import { ProductCartService } from './product-cart.service';
import { ProductCartController } from './product-cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from 'src/product/product.module';
import { CartModule } from 'src/cart/cart.module';
import { StockModule } from 'src/stock/stock.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([ProductCartModule]),
    ProductModule,
    CartModule,
    StockModule
  ],
  controllers: [ProductCartController],
  providers: [ProductCartService],
  exports:[TypeOrmModule]

})
export class ProductCartModule {}
