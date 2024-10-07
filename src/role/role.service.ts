import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { manageError } from 'src/common/erros/custom/custom.error';

@Injectable()
export class RoleService {

  constructor(
    @InjectRepository(Role)
    private roleRepository:Repository<Role>
  ){}

  create(createRoleDto: CreateRoleDto) {
    return 'This action adds a new role';
  }

  findAll() {
    return `This action returns all role`;
  }

  async findRoleByName(nameRole:string){
    try{
      const role=await this.roleRepository.findOneBy({nameRole:nameRole});
      if(!role){
        throw new manageError({
          type:"NOT_FOUND",
          message:"THE NAME ROLE IS NOT FOUND"
        });
      }
      return role;
    }catch(err:any){
      throw manageError.signedError(err.message);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
