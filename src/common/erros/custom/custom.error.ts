import { HttpException, HttpStatus } from "@nestjs/common";

export class manageError extends Error{
    constructor({type,message}:{type:keyof typeof HttpStatus,message:string}){
        super(`${type} :: ${message}`);
    }

    public static signedError(message:string){
        const name=message.split(" :: ")[0];
        if(name){
            throw new HttpException(message,HttpStatus[name]);
        }else{
            throw new HttpException(message,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}