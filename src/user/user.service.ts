import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RoleService } from 'src/role/role.service';
import { manageError } from 'src/common/erros/custom/custom.error';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
 
  constructor(
    @InjectRepository(User)
    private userRepository:Repository<User>,
    private roleService:RoleService
  ){}

  async create(createUserDto: CreateUserDto) {
    try{
      const findRole=await this.roleService.findRoleByName(createUserDto.nameRole);
      delete createUserDto.nameRole;
      const hasPassword=await bcrypt.hash(createUserDto.password,10);
      const dataUser=this.userRepository.create({...createUserDto,roleId:findRole.id,password:hasPassword});
      await this.userRepository.save(dataUser);
      return dataUser;
    }catch(err:any){
      throw err;
    }
  }

  async findAll(querys?:any) {
    try{
      const dataUsers=await this.userRepository.find();
      if(dataUsers.length==0){
        throw new manageError({
          type:"NOT_FOUND",
          message:"DOES CREATED USERS YET"
        });
      }
      return dataUsers;
    }catch(err:any){
      throw manageError.signedError(err.message);
    }
  }

  async findOne(id: string) {
    try{
      const data=await this.userRepository.findOneBy({id});
      if(!data){
        throw new manageError({
          type:"NOT_FOUND",
          message:"USER NOT FOUND"
        });
      } 
      return data;
    }catch(err:any){
      throw manageError.signedError(err.message);
    }
  }

  
  async findOneUserByemail(email:string,password:string) {
    try{
      const data=await this.userRepository.findOneBy({email});
      if(!data || !await bcrypt.compare(password, data.password) ){
        throw new manageError({
          type:"NOT_FOUND",
          message:"USER NOT FOUND"
        });
      } 
      return data;
    }catch(err:any){
      throw manageError.signedError(err.message);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try{
      const {affected}=await this.userRepository.update(id,updateUserDto);
      if(affected==0){
        throw new manageError({
          type:"NOT_FOUND",
          message:"FAILED TO UPDATE USER"
        });
      }
      return "Perfectly updated user"
    }catch(err:any){
      throw manageError.signedError(err.message);
    } 
  }

  async remove(id: string) {
    try{
      const {affected}=await this.userRepository.delete(id);
      if(affected==0){
        throw new manageError({
          type:"NOT_FOUND",
          message:"FAILED TO DELETE USER"
        });
      }
      return "Perfectly deleted user"
    }catch(err:any){
      throw manageError.signedError(err.message);
    } 
  }
}
