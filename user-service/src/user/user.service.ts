import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository : Repository<User>
  ){}
  async create(createUserDto: CreateUserDto) {

    const passwordHash = await bcrypt.hash(createUserDto.password,10)

    const playloadUser ={
    firstName: createUserDto.firstName,
    lastName: createUserDto.lastName,
    email: createUserDto.email,
    phone: createUserDto.phone,       // opcional
    password: passwordHash, 
    }
    const createUser = await this.userRepository.create(playloadUser)
    const save = await this.userRepository.save(createUser)
    const { password, ...userWithoutPassword } = save;
    return userWithoutPassword;
    } catch (error) {
    // 5. Capturar error de email duplicado (Postgres code 23505)
    if (error.code === '23505') {
      throw new BadRequestException('El email ya está en uso');
    }
    // Para otros errores, relanzamos
    throw error;
  }

  

  async findAll() {
    return await this.userRepository.find();
  }

    async findOne(id: number) {
    const searchUser = await this.userRepository.findOne({where:{id}})
    if(!searchUser){
      throw new NotFoundException(`Usuario con el ID: ${id} no encontrado`)
    }

    return searchUser;
  }
  async findByEmail(email: string){
    const searchEmail = await this.userRepository.findOne({where:{email}})
    if(!searchEmail){
      throw new NotFoundException('Usuario no existe')
    }
    
    return searchEmail
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const searchUser = await this.userRepository.findOne({where:{id}})
    if(!searchUser){
      throw new NotFoundException(`Usuario con el ID: ${id} no encontrado`)
    }
    Object.assign(searchUser, updateUserDto);
    if (updateUserDto.password) {
   const hash = await bcrypt.hash(updateUserDto.password, 10);
   searchUser.password = hash;
    
}
const updatedUser = await this.userRepository.save(searchUser)
    return updatedUser;  

     
    
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
