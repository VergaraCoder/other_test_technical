import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";

@Catch()
export class FilterError implements ExceptionFilter{
    catch(exception: any, host: ArgumentsHost) {
        const request=host.switchToHttp().getRequest();
        const response=host.switchToHttp().getResponse();

        let message;
        let status;
        const ifExist=exception.message.split(" :: ");
        const ifExsit2=exception.response;

        if(ifExsit2 && ifExsit2.message){
            message=ifExsit2 ? ifExsit2.error : ifExsit2.message;
            status=ifExsit2.statusCode ? ifExsit2.statusCode : 400;
        }
        else if(ifExist){
            message=ifExist[1];
            status=ifExist[0];
        }
        else{
            message=ifExsit2 ? "Bad request" : "INTERNAL SERVER ERROR";
            status= ifExsit2 ? 400 :500;
        }

        response.status(status).json({
            status:status,
            timestamp:new Date(),
            method:request.method,
            path:request.url,
            message:message
        })
    }
}