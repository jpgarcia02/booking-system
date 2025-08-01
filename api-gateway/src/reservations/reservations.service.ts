import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { AppService } from 'src/app.service';
import {  CreateReservationDto } from '../../../shared/dtos/reservation/create-reservation.dto';
import { UpdateReservationDto } from '../../../shared/dtos/reservation/update-reservation.dto';
import { HttpService } from '@nestjs/axios';


@Injectable()
export class ReservationsService {
    constructor(private readonly appService: AppService,
        private readonly httpService: HttpService
    ) {}

    async create(userId:number,createReservationDto:CreateReservationDto){
        const url = 'http://localhost:3002/reservations'
        const response = await firstValueFrom(this.httpService.post(url,createReservationDto,{headers:{'X-User-Id':userId}}))
        return response.data
      }

      async findAll(userId:number){
        const url = 'http://localhost:3002/reservations'
        const response = await firstValueFrom(this.httpService.get(url,{headers:{'X-User-Id':userId}}))
        return response.data
      }

      async findOne(userId:number,id:number){
        const url = 'http://localhost:3002/reservations/'+id
        const response = await firstValueFrom(this.httpService.get(url,{headers:{'X-User-Id':userId}}))
        return response.data
      }

      async update(userId:number,id:number, updateReservationDto: UpdateReservationDto){
        const url = 'http://localhost:3002/reservations/'+id
        const response = await firstValueFrom(this.httpService.patch(url,updateReservationDto,{headers:{'X-User-Id':userId}}))
        return response.data
      }

      async remove(userId:number,id:number){
        const url = 'http://localhost:3002/reservations/'+id
        const response = await firstValueFrom(this.httpService.delete(url,{headers:{'X-User-Id':userId}}))
        return response.data
      }
}
