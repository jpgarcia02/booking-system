import { IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateReservationDto {
  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
