import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtAuthService {
    constructor(private jwtService: JwtService) { }
    generateAccessToken(arg: any) {
        const token = this.jwtService.sign(arg, { secret: process.env.JWT_ACCESS_SECRET, expiresIn: '30d' });
        return token;
    }

    decodeAccessToken(token: string) {
        try {
            const response = this.jwtService.verify(token, { secret: process.env.JWT_ACCESS_SECRET });
            return response;
        } catch (error) {
            return;
        }
    }

}