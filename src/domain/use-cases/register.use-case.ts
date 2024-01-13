import { JwtAdapter, SignToken } from "../../config";
import { RegisterUserDto } from "../dtos/auth/register-user.dto";
import { UserEntity } from "../entities/user.entity";
import { AuthRepository } from "../repositories/auth.repository";

//Esta interfaz está aqui temporalmente, creo que es mejor solo retornar el token.
interface UserToken {
    token: string|null,
    user: UserEntity
}

export class RegisterUseCase {
    constructor (
        private readonly authRepository: AuthRepository,
        private readonly signToken: SignToken = JwtAdapter.generateToken
    ) {
    }
    execute = async(registerUserDto: RegisterUserDto): Promise<UserToken> => {
        const user = await this.authRepository.register(registerUserDto!);
        const token = await this.signToken(user);
        if (!token) throw new Error('Error generating token!')
        return {
            token,
            user
        }
    }
}