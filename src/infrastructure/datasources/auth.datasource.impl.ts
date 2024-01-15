import { PrismaClient } from "@prisma/client";
import { ApiError, AuthDatasource, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";
import { BcryptAdapter } from "../../config/bcrypt";
import { compareFunction, hashFunction } from "../../config/types";
import { UserMapper } from "../mappers/user.mapper";

export class AuthDatasourceImpl implements AuthDatasource {
    constructor(
        private readonly prisma: PrismaClient,
        private readonly hasher: hashFunction = BcryptAdapter.hash,
        private readonly comparer: compareFunction = BcryptAdapter.compare
    ){}

    register = async (registerUserDto: RegisterUserDto):Promise<UserEntity> => {
        
        // crear usuario en db
        const { name, email, password } = registerUserDto;
        // revisa si existe el nombre o email en db

        const existsUser = await this.prisma.user.findFirst({
            where: {
                OR: [
                    {
                        name
                    },
                    {
                        email
                    }
                ]
            }
        })

        if (existsUser && existsUser.name === name) throw ApiError.badRequest('Name unavailable')
        if (existsUser && existsUser.email === email) throw ApiError.badRequest('Email unavailable')

        const hashedPassword = this.hasher(password)

        const user = await this.prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        })  
        return UserMapper.toUserEntity(user)
    }

    login = async (loginUserDto: LoginUserDto):Promise<UserEntity> => {

        const { name, password } = loginUserDto;

        // revisa si existe nombre en db

        const user = await this.prisma.user.findFirst({
            where: {
                name
            }
        })

        if (!user) throw ApiError.badRequest('Incorrect data')

        // si el usuario existe, pero la contraseña no coincide tira error

        if (!this.comparer(password, user.password)) throw ApiError.badRequest('Incorrect data')

        // si el código llega hast acá, el usuario existe y la contraseña coincide

        return UserMapper.toUserEntity(user)
    }
}