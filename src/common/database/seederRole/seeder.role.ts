import { Injectable } from "@nestjs/common";
import { Entitie } from "src/entity/entities/entity.entity";
import { Role } from "src/role/entities/role.entity";
import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";


@Injectable()
export class seederRole implements Seeder{
    async run(dataSource: DataSource): Promise<any> {
        const repoRole=dataSource.getRepository(Role);
        const data=[
            {nameRole:"admin"},
            {nameRole:"client"},
        ];

        for(const dato of data){
            const query=await repoRole.findOne({where:{nameRole:dato.nameRole}});
            if(!query){
                const data=repoRole.create(dato);
                await repoRole.save(data);
                console.log("creamos role");
                
            }
        }
    }
}