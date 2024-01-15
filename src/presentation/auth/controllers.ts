import { Request, Response } from "express";
import { ApiError, AuthRepository, LoginUseCase, LoginUserDto, RegisterUseCase, RegisterUserDto } from "../../domain";
import { Handler } from "../../config";

// Definición de los controladores de autenticación

export class AuthController {

    constructor (
        private readonly authRepository: AuthRepository,
    ) {}

    registerUser = async (req: Request, res: Response) => {
        try {
            const { name, email, password } = req.body
            // Puede tirar error por suministrar datos incorrectos
            const registerUserDto = RegisterUserDto.create({name, email, password});
            // Puede tirar error porque los datos suministrados pueden existir en la base de datos
            // o porque falló la generación del JWT
            const registerUseCase = new RegisterUseCase(this.authRepository)
            const user = await registerUseCase.execute(registerUserDto!)
            res.cookie('JWT', user.token, {maxAge: 60*1000})
            res.json(user)
        } catch (error) {
            Handler.error(error, res)
        }
    }
    
    loginUser = async (req: Request, res: Response) => {
        try {
            const { name, password } = req.body
            // Puede tirar error por suministrar datos incorrectos
            const loginUserDto = LoginUserDto.create({name, password});
            // Puede tirar error porque los datos suministrados no coinciden con los de la base
            // de datos o porque falló la generación del JWT
            const loginUseCase = new LoginUseCase(this.authRepository);
            const user = await loginUseCase.execute(loginUserDto!);
            res.cookie('JWT', user.token, {maxAge: 60*1000});
            res.json(user);
        } catch (error) {
            Handler.error(error, res)
        }
    }
}