import { ProductCart } from "src/product-cart/entities/product-cart.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("carts")
export class Cart {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    userId:string;

    @ManyToOne(()=>User,user=>user.cart)
    user:User;

    @OneToMany(()=>ProductCart,productCart=>productCart.cart)
    productCart:ProductCart[];
}
