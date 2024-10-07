import { applyDecorators, UseGuards } from "@nestjs/common";
import { roles } from "../decorator.decorator";
import { JwtGuard } from "src/auth/jwt/guards/jwt.guard";
import { RoleGuard } from "src/auth/jwt/guards/role.guard";

export function Auth(...rolesAsigned: string[]) {
    return applyDecorators(
      roles(...rolesAsigned),
      UseGuards(JwtGuard,RoleGuard ),
    );
  }