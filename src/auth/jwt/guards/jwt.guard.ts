import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request,Response } from "express";
import { Observable } from "rxjs";
import { AuthService } from "src/auth/auth.service";
import { manageError } from "src/common/erros/custom/custom.error";
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtGuard implements CanActivate{

    constructor(
        private jwtService:JwtService,
        private authService:AuthService
    ){}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request:Request=context.switchToHttp().getRequest();
        const response:Response=context.switchToHttp().getResponse();
        const signedCookies=request.signedCookies;

        try{
            if(!signedCookies || !signedCookies["acces_token"] || !signedCookies["refresh_token"] ){
                throw new manageError({
                    type:"UNAUTHORIZED",
                    message:"THE TOKEN MUST BE PROVIDER"
                });
            }
            await this.jwtService.verify(signedCookies["acces_token"]);
            const decode =await this.jwtService.decode(signedCookies["acces_token"]);
            request["user"]=decode;
            return true;

        }catch(err:any){
            if(err instanceof jwt.TokenExpiredError){
                const newAccessToken=await this.authService.renovateToken(signedCookies["refresh_token"]);
                response.cookie("acces_token",newAccessToken.acces_token,{
                    signed:true,
                    httpOnly:true
                });
                request["user"]=newAccessToken.decode;
                return true;
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