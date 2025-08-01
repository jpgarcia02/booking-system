import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { ReservationsService } from './reservations.service';
import {  CreateReservationDto } from '../../../shared/dtos/reservation/create-reservation.dto';
import { UpdateReservationDto } from '../../../shared/dtos/reservation/update-reservation.dto';

@UseGuards(JwtAuthGuard)
@Controller('reservations')
export class ReservationsController {
    constructor(
        private readonly reservationsService: ReservationsService
    ){}

    @Post()
    async create(
    @Req() req, // <- request completo
    @Body() createReservationDto: CreateReservationDto, // <- body de la reserva
    ) {
    const userId = req.user.sub; // <- extraes el userId del JWT
    return await this.reservationsService.create(userId, createReservationDto);
    }

    @Get()
    async findAll(
        @Req() req,

    ){
    const userId = req.user.sub; // <- extraes el userId del JWT
    return await this.reservationsService.findAll(userId);
    }

    @Get(':id')
    async findOne(
        @Req() req,
        @Param('id',ParseIntPipe) id : number   

    ){
    const userId = req.user.sub; // <- extraes el userId del JWT
    return await this.reservationsService.findOne(userId,id);
    }

    @Patch(':id')
    async updated(
    @Param('id',ParseIntPipe) id:number,
    @Req() req, // <- request completo
    @Body() updateReservationDto: UpdateReservationDto, // <- body de la reserva
    ) {
    const userId = req.user.sub; // <- extraes el userId del JWT
    return await this.reservationsService.update(userId,id, updateReservationDto);
    }

    @Delete(':id')
    async remove(
    @Param('id',ParseIntPipe) id:number,
    @Req() req, // <- request completo
  
    ) {
    const userId = req.user.sub; // <- extraes el userId del JWT
    return await this.reservationsService.remove(userId,id);
    }



}
