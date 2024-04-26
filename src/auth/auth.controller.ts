import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthDto } from './dto/auth.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { ResendOtp } from './dto/resend-otp.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { AuthGuard } from 'src/middleware/guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/sign-up')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @Get('/verify-email/:email/:otp')
  verifyEmail(@Param() verifyEmailDto: VerifyEmailDto) {
    return this.authService.verifyEmail(verifyEmailDto);
  }

  @Get('/resend-otp/:email')
  resendOtp(@Param() resendOtp: ResendOtp) {
    return this.authService.resendOtp(resendOtp);
  }

  @Post('/sign-in')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() authCredential: AuthDto) {
    return await this.authService.signIn(authCredential);
  }
  
  @Get('/forgot-password/:email')
  forgotPassword(@Param() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto)
  }

  @Post('/update-password')
  @UseGuards(AuthGuard)
  updatePassword(@Body() updatePasswordDto: UpdatePasswordDto) {
    return this.authService.updatePassword(updatePasswordDto);
  }
}
