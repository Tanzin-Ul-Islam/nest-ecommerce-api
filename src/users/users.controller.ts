import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Res, Query, UseGuards, Put, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { UsersService } from './users.service';
import { FindUserDto } from './dto/find-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AdminGuard } from 'src/middleware/guards/admin.guard';
import { AuthGuard } from 'src/middleware/guards/auth.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { getMulterConfig } from 'src/config/multer.config';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get('/find-all')
  @UseGuards(AdminGuard)
  findAll(@Query() findUserDto: FindUserDto) {
    return this.usersService.findAll(findUserDto)
  }

  @Get("/profile/:id")
  @UseGuards(AuthGuard)
  profile(@Param('id') id: string) {
    return this.usersService.profile(id);
  }


  @Patch("/update-profile/:id")
  @UseGuards(AuthGuard)
  @UseInterceptors(FileFieldsInterceptor(
    [
      { name: 'image', maxCount: 1 },
    ],
    getMulterConfig('./uploads/profile-image')
  ))
  updateProfile(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @UploadedFiles() file: { image?: any }) {
    return this.usersService.updateProfile(id, updateUserDto, file);
  }

  @Delete("/:id")
  @UseGuards(AdminGuard)
  remove(@Param("id") id: string){
    return this.usersService.remove(id);
  }

}
