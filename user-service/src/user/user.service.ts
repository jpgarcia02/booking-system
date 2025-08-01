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
  async findByEmail(email: string): Promise<User | null> {
  return this.userRepository.findOne({
    where: { email },
    select: [
      'id',
      'firstName',
      'lastName',
      'email',
      'phone',
      'password',      // 👈 Esto es clave para login
      'createdAt',
      'updatedAt',
      'isActive',
    ],
  });
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

  async remove(id: number) {
    const searchUser = await this.userRepository.findOne({where:{id}})
    if(!searchUser){
      throw new NotFoundException(`Usuario con el ID: ${id} no encontrado`)
    }
    await this.userRepository.remove(searchUser)
    return `Usuario con el ID: #${id} Eliminado`;
  }
}
