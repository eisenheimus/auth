import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './users.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity> 
    ){}

    getUsers(){
        return 'qweffffffffffffffffffff'
    }

    async hashPassword(password: string): Promise<string>{
        return bcrypt.hash(password, 10)
    }

    async findUser({email, login}): Promise<CreateUserDTO[]> {
        return await this.userRepository.find({where: [{email}, {login}]})
    }

    async createUser(user: CreateUserDTO): Promise<CreateUserDTO | object> {

        const users: CreateUserDTO []= await this.findUser({email: user.email, login: user.login});


        if(users?.length) return {
            statusCode: 200,
            message:  'такой пользователь уже существует'
        } 
       

        user.password = await this.hashPassword(user.password)
        return await this.userRepository.save(user);
    }
}
