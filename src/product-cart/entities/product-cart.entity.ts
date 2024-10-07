import { Cart } from "src/cart/entities/cart.entity";
import { Order } from "src/order/entities/order.entity";
import { Product } from "src/product/entities/product.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("productCart")
export class ProductCart {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    cartId:number;

    @Column()
    productId:string;

    @ManyToOne(()=>Product,product=>product.productCart)
    product:Product;

    @ManyToOne(()=>Cart,cart=>cart.productCart)
    cart:Cart;

    @OneToMany(()=>Order,order=>order.productCart)
    order:Order[];
}
