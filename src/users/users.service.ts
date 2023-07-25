import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './users.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt'
import { ErrorsList } from 'src/common/constants/errors';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity> 
    ){}

    async getAllUsers(){
        return await this.userRepository.find();
    }

    async hashPassword(password: string): Promise<string>{
        return bcrypt.hash(password, 10)
    }

    async findUserByEmail({email}): Promise<CreateUserDTO> {

        return await this.userRepository.findOne({where: {email: email}})
    }

    async createUser(user: CreateUserDTO): Promise<CreateUserDTO> {

 
        user.password = await this.hashPassword(user.password)


        return await this.userRepository.save(user);
    }
}
