import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDTO {
    @IsString()
    email: string;

    @IsString()
    name: string;

    @IsString()
    login: string;

    @IsString()
    password: string;

}