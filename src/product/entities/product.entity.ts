import { ProductCart } from "src/product-cart/entities/product-cart.entity";
import { Stock } from "src/stock/entities/stock.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("products")
export class Product {
    @PrimaryGeneratedColumn()
    id:string;

    @Column()
    nameProduct:string;

    @Column()
    price:number;

    @OneToMany(()=>Stock,stock=>stock.product)
    stock:Stock[];

    @OneToMany(()=>ProductCart,productCart=>productCart.product)
    productCart:ProductCart[];
}

