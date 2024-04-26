import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { JwtAuthService } from "src/core/jwt/jwt-auth.service";
import { userTypes } from "src/users/entity/users";
import { UserRepository } from "src/users/users.repository";
@Injectable()
export class AdminGuard implements CanActivate {
    constructor(private jwtAuthService: JwtAuthService, private userRepository: UserRepository) { }
    async canActivate(context: ExecutionContext,): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractToken(request);
        if (!token) {
            throw new UnauthorizedException();
        }
        try {
            const decodeToken = this.jwtAuthService.decodeAccessToken(token);
            const user = await this.userRepository.findOne({ email: decodeToken.email });
            if (!user) {
                throw new UnauthorizedException();
            }
            if (user.type != userTypes.ADMIN) {
                throw new UnauthorizedException();
            }
        } catch (error) {
            return;
        }
        return true;
    }
    private extractToken(request: Request) {
        if (request.headers.authorization) {
            const [type, token] = request.headers.authorization.split(" ");
            return type === 'Bearer' ? token : undefined;
        }
        return undefined;
    }
}