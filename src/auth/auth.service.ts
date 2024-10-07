import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';
import { manageError } from 'src/common/erros/custom/custom.error';

@Injectable()
export class AuthService {

  constructor(
    private jwtService:JwtService
  ){}

  create(createAuthDto: CreateAuthDto) {
    const acces_token= this.jwtService.sign(createAuthDto,{expiresIn:'10m'});
    const refresh_token=this.jwtService.sign(createAuthDto,{expiresIn:'10d'})
    return {
      acces_token,
      refresh_token
    }
  }

  async renovateToken(refreshToken:string){
    try{
      await this.jwtService.verify(refreshToken);
      const decode=await this.jwtService.decode(refreshToken);
      delete decode.iat;
      delete decode.exp;
      const acces_token= this.jwtService.sign(decode ,{expiresIn:'10m'});
      return {
        acces_token,
        decode
      }
    }catch(err:any){
      if(err instanceof jwt.TokenExpiredError){
        throw new manageError({
          type:"UNAUTHORIZED",
          message:"THIS TOKEN HAVE EXPIRED"
        });
      }
      else if(err instanceof jwt.JsonWebTokenError || err instanceof jwt.NotBeforeError){
        throw new manageError({
          type:"UNAUTHORIZED",
          message:"THE TOKEN IS BAD "
        });
      }
      throw manageError.signedError(err.message);
    }
  }
}
