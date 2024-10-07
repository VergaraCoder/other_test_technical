import { Injectable } from "@nestjs/common";
import { Entitie } from "src/entity/entities/entity.entity";
import { Role } from "src/role/entities/role.entity";
import { User } from "src/user/entities/user.entity";
import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import * as bcrypt from 'bcrypt';

@Injectable()
export class seederUser implements Seeder{
    async run(dataSource: DataSource): Promise<any> {
        const repoUser=dataSource.getRepository(User);
        const data=[
            {
                name:"jesus",
                email:"jesus@gmail.com",
                password:"jesus12",
                roleId:1
            },
            {
                name:"pedro",
                email:"pedro@gmail.com",
                password:"pedro12",
                roleId:2
            },
        ];

        for(const dato of data){
            const query=await repoUser.findOne({where:{email:dato.email}});
            if(!query || (query && await bcrypt.compare(dato.password,query.password)) ){
                const hasPassword= await bcrypt.hash(dato.password,10);
                const data=repoUser.create({
                    ...dato,
                    password:hasPassword
                });
                await repoUser.save(data);
            }
        }
    }
}