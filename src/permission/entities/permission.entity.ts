import { Entitie } from "src/entity/entities/entity.entity";
import { Role } from "src/role/entities/role.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("permissions")
export class Permission {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    canCreate:boolean;

    @Column()
    canUpdate:boolean;

    @Column()
    canDelete:boolean;

    @Column()
    canGet:boolean;

    @Column()
    entityId:number;

    @Column()
    roleId:number;

    @Column()
    quantity:number;   // catnidad para ver a cuantos registros puede acceder

    @ManyToOne(()=>Entitie,entitie=>entitie.permission)
    Entitie:Entitie;

    @ManyToOne(()=>Role,role=>role.permission)
    role:Role;
}
