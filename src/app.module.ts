import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { ProductModule } from './product/product.module';
import { ProductCartModule } from './product-cart/product-cart.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import { PermissionModule } from './permission/permission.module';
import { EntityModule } from './entity/entity.module';
import { CommonModule } from './common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmCredentials } from './common/database/db.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useClass:TypeOrmCredentials
    })
    ,AuthModule, UserModule, RoleModule, ProductModule, ProductCartModule, CartModule, OrderModule, PermissionModule, EntityModule, CommonModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
