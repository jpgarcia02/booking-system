import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';

@Module({
  imports: [HttpModule],           // Necesario para usar HttpService
  controllers: [ReservationsController],
  providers: [ReservationsService],
})
export class ReservationsModule {}
