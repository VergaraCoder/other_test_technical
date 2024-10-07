import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './jwt/strategys/strategy.local';
import { JwtGuard } from './jwt/guards/jwt.guard';
import { RoleGuard } from './jwt/guards/role.guard';
import { LocalGuard } from './jwt/guards/local.guard';

@Module({
  imports:[
    PassportModule,
    JwtModule.registerAsync({
      imports:[ConfigModule],
      inject:[ConfigService],  
      useFactory:async(configService:ConfigService)=>({
        secret:configService.get<string>("JWT_SECRET") ,
      })
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtGuard,
    RoleGuard,
    LocalGuard
  ],
})
export class AuthModule {}
