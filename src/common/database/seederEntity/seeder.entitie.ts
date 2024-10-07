import { Injectable } from "@nestjs/common";
import { Entitie } from "src/entity/entities/entity.entity";
import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";


@Injectable()
export class seederEntitie implements Seeder{
    async run(dataSource: DataSource): Promise<any> {
        const repoEntitie=dataSource.getRepository(Entitie);
        const data=[
            {nameEntity:"users"},
            {nameEntity:"order"},
            {nameEntity:"stock"},
            {nameEntity:"products"},
            {nameEntity:"productCart"},
        ];

        for(const dato of data){
            const query=await repoEntitie.findOne({where:{nameEntity:dato.nameEntity}});
            if(!query){
                const data=repoEntitie.create(dato);
                await repoEntitie.save(data);
            }
        }
    }
}