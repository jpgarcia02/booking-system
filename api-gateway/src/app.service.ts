import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios'
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  async getUsers(){
    const url = 'http://localhost:3001/user'
    const response = await firstValueFrom(this.httpService.get(url))
    return response.data
  }
}
