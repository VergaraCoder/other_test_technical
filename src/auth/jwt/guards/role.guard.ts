import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";
import { Observable } from "rxjs";
import { key_roles } from "src/common/decorator/decorator.decorator";
import { manageError } from "src/common/erros/custom/custom.error";


@Injectable()
export class RoleGuard implements CanActivate{
    constructor(
        private reflector:Reflector
    ){}

    canActivate(context: ExecutionContext):boolean{
        const request:Request=context.switchToHttp().getRequest();
        const rolesContext=this.reflector.get(key_roles,context.getHandler());
        const roleRequest:any=request["user"];

        if(!rolesContext.includes(roleRequest.role)){
            throw new manageError({
                type:"UNAUTHORIZED",
                message:"THIS ROLE IS NOT AUTHORIZED"
            });
        }
        return true;
    }
}