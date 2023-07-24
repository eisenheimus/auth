import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';

@Controller('users')
export class UsersController {

constructor(
    private readonly usersService: UsersService
){}

    @Get()
    getUsers() {
        return this.usersService.getUsers()

    }

    @Post('create-user')
    async createUser(@Body() dto: CreateUserDTO){
        return await this.usersService.createUser(dto)
    }
}
