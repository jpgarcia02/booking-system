import { Body, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios'
import { firstValueFrom } from 'rxjs';
import { LoginDto } from '../../shared/dtos/user/login.dto';
import { RegisterDto } from '../../shared/dtos/user/register.dto';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  async registerUser(registerDto:RegisterDto){
    const url = 'http://localhost:3010/auth/register'
    const response = await firstValueFrom(this.httpService.post(url,registerDto))
    return response.data
  }

  async loginUser(loginDto:LoginDto){
    const url = 'http://localhost:3010/auth/login'
    const response = await firstValueFrom(this.httpService.post(url,loginDto))
    return response.data
  }
}
