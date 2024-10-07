import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { ProductModule } from './product/product.module';
import { ProductCartModule } from './product-cart/product-cart.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import { PermissionModule } from './permission/permission.module';
import { EntityModule } from './entity/entity.module';

@Module({
  imports: [AuthModule, UserModule, RoleModule, ProductModule, ProductCartModule, CartModule, OrderModule, PermissionModule, EntityModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
