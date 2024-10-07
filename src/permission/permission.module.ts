import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';
import { EntityModule } from 'src/entity/entity.module';
import { RoleModule } from 'src/role/role.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Permission]),
    EntityModule ,
    RoleModule
  ],
  controllers: [PermissionController],
  providers: [PermissionService],
  exports:[TypeOrmModule]

})
export class PermissionModule {}
