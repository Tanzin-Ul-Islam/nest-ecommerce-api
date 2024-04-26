import { Global, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepository } from './users.repository';
import { MulterCoreService } from 'src/core/multer/multer-core.service';
@Global()
@Module({
  controllers: [UsersController],
  providers: [UsersService, UserRepository, MulterCoreService],
})
export class UsersModule { }
