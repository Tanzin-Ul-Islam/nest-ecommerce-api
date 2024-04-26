import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserRepository } from 'src/users/users.repository';
import { MailService } from 'src/core/mail/mail.service';
import { JwtAuthService } from 'src/core/jwt/jwt-auth.service';
import { MongooseModule } from '@nestjs/mongoose';
// import { UserSchema, Users } from 'src/users/entity/users';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UserRepository, MailService, JwtAuthService],
})
export class AuthModule { }
