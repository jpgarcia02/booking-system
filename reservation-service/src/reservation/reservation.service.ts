import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { LessThan, MoreThan, Repository } from 'typeorm';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation) private readonly reservationRepository: Repository<Reservation>
  ){}
   async create(createReservationDto: CreateReservationDto, userId: number) {
    const { startDate, endDate } = createReservationDto;

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start >= end) {
      throw new BadRequestException('La fecha de inicio debe ser menor que la fecha de fin.');
    }

    const existing = await this.reservationRepository.findOne({
      where: {
        userId,
        startDate: LessThan(end),
        endDate: MoreThan(start),
      },
    });

    if (existing) {
      throw new ConflictException('Ya existe una reserva en ese rango de fechas.');
    }

    const newReservation = this.reservationRepository.create({
      ...createReservationDto,
      userId,
      status: 'pending',
    });

    const saved = await this.reservationRepository.save(newReservation);
    return saved;
  }

  async findAll(userId:number) {
    return await this.reservationRepository.find({where:{userId}})
  }

  async findOne(id: number,userId:number) {
    const searchRese = await this.reservationRepository.findOne({where:{id,userId}})
    if(!searchRese){
      throw new NotFoundException('Reservacion no encontrada')
    }
    return searchRese;
  }

  async update(id: number, updateReservationDto: UpdateReservationDto,userId: number) {
     const searchRese = await this.reservationRepository.findOne({where:{id,userId}})
    if(!searchRese){
      throw new NotFoundException('Reservacion no encontrada')
    }
    const updated = {
  ...searchRese,        // partes originales
  ...updateReservationDto, // partes nuevas que sobrescriben si existen
}
  const save = await this.reservationRepository.save(updated)
  return save
  }

  async remove(id: number, userId: number) {
    const searchRese = await this.reservationRepository.findOne({where:{id,userId}})
    if(!searchRese){
      throw new NotFoundException('Reservacion no encontrada')
    
  }
  await this.reservationRepository.remove(searchRese)
  return 'Reservacion eliminada exitosamente'
}
}
