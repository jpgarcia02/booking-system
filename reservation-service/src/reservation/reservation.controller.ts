import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Headers, BadRequestException, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';


@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  @HttpCode(201)
  async createReservation(
  @Headers('X-User-Id') userIdHeader: string,
  @Body() createDto: CreateReservationDto
) {
  const userId = Number(userIdHeader);
  if (isNaN(userId)) throw new BadRequestException('UserId inválido');
  return this.reservationService.create(createDto, userId);
}

  @Get()
  async findAll(
     @Headers('X-User-Id') userIdHeader: string,
  ) {
    const userId = Number(userIdHeader);
  if (isNaN(userId)) throw new BadRequestException('UserId inválido');
  return await  this.reservationService.findAll(userId);
  }

  @Get(':id')
  async findOne(
    @Param('id',ParseIntPipe) id: number,
    @Headers('X-User-Id') userIdHeader: string,) {
    const userId = Number(userIdHeader);
  if (isNaN(userId)) throw new BadRequestException('UserId inválido');
  return await this.reservationService.findOne(id,userId);
  }

  @Patch(':id')
  async update(
    @Param('id',ParseIntPipe) id: number, 
    @Body() updateReservationDto: UpdateReservationDto,
     @Headers('X-User-Id') userIdHeader: string,

  ) {
    const userId = Number(userIdHeader);
  if (isNaN(userId)) throw new BadRequestException('UserId inválido');
    return await this.reservationService.update(id, updateReservationDto,userId);
  }

  @Delete(':id')
  async remove(
    @Param('id',ParseIntPipe) id: number,
    @Headers('X-User-Id') userIdHeader: string,
  ) {
    const userId = Number(userIdHeader);
    if (isNaN(userId)) throw new BadRequestException('UserId inválido');
    return await this.reservationService.remove(id,userId);
  }
}
