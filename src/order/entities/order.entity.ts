import { ProductCart } from "src/product-cart/entities/product-cart.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("orders")
export class Order {
    @PrimaryGeneratedColumn("uuid")
    id:string;

    @Column()
    productCartId:number;

    @Column()
    totalPrice:number;

    @ManyToOne(()=>ProductCart,productCart=>productCart.order)
    productCart:ProductCart;
}
