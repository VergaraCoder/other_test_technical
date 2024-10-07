import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Cart } from "src/cart/entities/cart.entity";
import { Entitie } from "src/entity/entities/entity.entity";
import { Order } from "src/order/entities/order.entity";
import { Permission } from "src/permission/entities/permission.entity";
import { ProductCart } from "src/product-cart/entities/product-cart.entity";
import { Product } from "src/product/entities/product.entity";
import { Role } from "src/role/entities/role.entity";
import { Stock } from "src/stock/entities/stock.entity";
import { User } from "src/user/entities/user.entity";

@Injectable()
export class TypeOrmCredentials implements TypeOrmOptionsFactory{
    constructor(
        private configService:ConfigService
    ){}

    createTypeOrmOptions(connectionName?: string): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
        return{
            type:"mysql",
            host:this.configService.get<string>("DB_HOST"),
            port:+this.configService.get<string>("DB_PORT"),
            username:this.configService.get<string>("DB_USERNAME"),
            password:this.configService.get<string>("DB_PASSWORD"),
            database:this.configService.get<string>("DB_DATABASE"),
            entities:[Role,User,Product,ProductCart,Order,Stock,Entitie,Permission,Cart],
            synchronize:true
        }
    }
}