import { Injectable } from "@nestjs/common";
import { Entitie } from "src/entity/entities/entity.entity";
import { Permission } from "src/permission/entities/permission.entity";
import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";


@Injectable()
export class seederPermission implements Seeder{
    async run(dataSource: DataSource): Promise<any> {
        const repoPermission=dataSource.getRepository(Permission);
        const data=[
            {
                canCreate:true,
                canUpdate:true,             //repecto a users
                canDelete:true,
                canGet:true,
                roleId:1,
                entityId:1,
                quantity:2  // significa que puede actualizar mas de 2 registros
            },
            {
                canCreate:true,
                canUpdate:true,
                canDelete:true,
                canGet:true,                    //repecto a orders
                roleId:1,
                entityId:2,
                quantity:2
            },
            {
                canCreate:true,
                canUpdate:true,
                canDelete:true,                 //repecto a stock
                canGet:true,
                roleId:1,
                entityId:3,
                quantity:2
            },

            {
                canCreate:true,
                canUpdate:true,
                canDelete:true,
                canGet:true,                        //repecto a products
                roleId:1,   
                entityId:3,
                quantity:2
            },

            {
                canCreate:true,
                canUpdate:true,
                canDelete:true,
                canGet:true,                        //repecto a productsCart
                roleId:1,   
                entityId:3,
                quantity:2
            },


            // esto para abajo ya es de rol client

            {
                canCreate:true,
                canUpdate:true,
                canDelete:true,                     //repecto a users
                canGet:true,
                roleId:2,   
                entityId:1,
                quantity:1
            },
            {
                canCreate:true,
                canUpdate:true,
                canDelete:true,                      //repecto a orders
                canGet:true,
                roleId:2,
                entityId:2,
                quantity:1
            },
            {
                canCreate:true,
                canUpdate:true,
                canDelete:true,                          //repecto a products
                canGet:true,
                roleId:2,           
                entityId:2,
                quantity:1
            },
             {
                canCreate:true,
                canUpdate:true,
                canDelete:true,
                canGet:true,                    //repecto a productsCart
                roleId:2,
                entityId:2,
                quantity:2
            },
        ];

        for(const dato of data){
            const query=await repoPermission.findOne({where:{roleId:dato.roleId}});
            if(!query){
                const data=repoPermission.create(dato);
                await repoPermission.save(data);
            }
        }
    }
}