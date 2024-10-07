import { Permission } from "src/permission/entities/permission.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("entities")
export class Entitie {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    nameEntity:string;

    @OneToMany(()=>Permission,permission=>permission.Entitie)
    permission:Permission[];
}
