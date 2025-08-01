import { ConflictException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { instanceToPlain } from 'class-transformer';


@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService : JwtService
    ){}


    async login(loginDto: LoginDto){
        const {email} = loginDto
        const searchUser = await this.userService.findByEmail(email)
        if(!searchUser){
            throw new UnauthorizedException('Credenciales inválidas');
        }
        
        const passwordValid = await bcrypt.compare(loginDto.password,searchUser.password)
        

        if(passwordValid == false){
            throw new UnauthorizedException('Credenciales inválidas');
        }
        const payload = { sub: searchUser.id, email: searchUser.email }
        const token = await this.jwtService.signAsync(payload)
        const { password, ...userDataPassword } = searchUser;
         return {
            access_token: token,
            user : userDataPassword
         }

    }

    async register(registerDto: RegisterDto){
        const {email} = registerDto
        const searchUser = await this.userService.findByEmail(email)
        if(searchUser){
            throw new ConflictException(`El correo electrónico '${email}' ya está registrado.`);
        }
        
            const createUser = await this.userService.create(registerDto)
            const payload = { sub: createUser.id, email: createUser.email }
        const token = await this.jwtService.signAsync(payload)
        
         return {
            access_token: token,
            user : createUser
         }

        

    }

}
