import { JwtAdapter, SignToken } from "../../../config";
import { LoginUserDto } from "../../dtos/auth/login-user.dto";
import { UserEntity } from "../../entities/user.entity";
import { AuthRepository } from "../../repositories/auth.repository";

//Esta interfaz está aqui temporalmente, creo que es mejor solo retornar el token.
interface UserToken {
    token: string|null,
    user: UserEntity
}

export class LoginUseCase {
    constructor (
        private readonly authRepository: AuthRepository,
        private readonly signToken: SignToken = JwtAdapter.generateToken
    ) {
    }
    execute = async(loginUserDto: LoginUserDto): Promise<UserToken> => {
        const user = await this.authRepository.login(loginUserDto!);
        const token = await this.signToken(user);
        if (!token) throw new Error('Error generating token!')
        return {
            token,
            user
        }
    }
}