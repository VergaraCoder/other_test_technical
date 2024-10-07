import { Permission } from "src/permission/entities/permission.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("roles")
export class Role {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    nameRole:string;

    @OneToMany(()=>User,user=>user.role)
    user:User;

    @OneToMany(()=>Permission,permission=>permission.role)
    permission:Permission[];
}
