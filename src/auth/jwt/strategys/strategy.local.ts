import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { CartService } from "src/cart/cart.service";
import { UserService } from "src/user/user.service";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(
        private CartService:CartService,
        private userService:UserService
    ){
        super({
            usernameField:"email",
            passwordField:"password"
        })
    }

    async validate(email:string,password:string){
       try{
        const validateUser=await this.userService.findOneUserByemail(email,password);
        const validateCart=await this.CartService.verifyCartByUserId(validateUser.id);
        const payloadToken={
            userId:validateCart.id,
            email:validateUser.email,
            role:validateUser.role.nameRole,
            cartId:validateCart.id
        };
        return payloadToken;
       }catch(err:any){
        throw err;
       }
    }
}