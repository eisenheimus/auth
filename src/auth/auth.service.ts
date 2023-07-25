import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDTO } from './dto/register.dto';
import { LoginDTO } from './dto/login.dto';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { ErrorsList } from 'src/common/constants/errors';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {

    constructor(private readonly userService: UsersService){}

    async register(dto: RegisterDTO){
        const userExist: CreateUserDTO = await this.userService.findUserByEmail({email: dto.email});

        if(userExist) throw new BadRequestException(ErrorsList.USER_EXIST);

        return await this.userService.createUser(dto);

    }

    async login(dto: LoginDTO): Promise<LoginDTO> {

        const user = await this.userService.findUserByEmail({email: dto.email});

        if(!user) throw new BadRequestException(ErrorsList.USER_NOT_EXIST);

        const isValidPswd = await bcrypt.compare(dto.password, (await user).password);

        if(!isValidPswd) throw new BadRequestException(ErrorsList.WRONG_AUTH_DATA);

        return user;

    }

}
