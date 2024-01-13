import { PrismaClient } from "@prisma/client";
import { ApiError, AuthDatasource, RegisterUserDto, UserEntity } from "../../domain";
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

        //TODO: Hash Password

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
}