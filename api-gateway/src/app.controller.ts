import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { RegisterDto } from '../../shared/dtos/user/register.dto';
import { LoginDto } from '../../shared/dtos/user/login.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('auth/register')
  async registerUser(@Body() registerDto: RegisterDto) {
    // Delegamos al service, pasándole el body completo
    return await this.appService.registerUser(registerDto);
  }

  @Post('auth/login')
  async loginUser(@Body()loginDto: LoginDto){

    return await this.appService.loginUser(loginDto);

  }
}
