import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth/auth.controller';
import { UsersController } from './users/users.controller';
import { ReservationsController } from './reservations/reservations.controller';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';
import { ReservationsService } from './reservations/reservations.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController, AuthController, UsersController, ReservationsController],
  providers: [AppService, AuthService, UsersService, ReservationsService],
})
export class AppModule {}
