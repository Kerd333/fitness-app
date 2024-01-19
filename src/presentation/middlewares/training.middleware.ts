import { NextFunction, Request, Response } from "express";
import { ApiError, UserEntity } from "../../domain";
import { Handler, JwtAdapter } from "../../config";


// Implementación dummy. Asumo que está la cookie

export class TrainingMiddleware {

    static validateLogin = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { JWT } = req.cookies
            if(!JWT) throw ApiError.unauthorized('You have to login to do this!')
            console.log(JWT)
            const payload = await JwtAdapter.validateToken<UserEntity>(JWT);
            if (!payload) throw ApiError.unauthorized('You need to login again!');
            req.body.user = payload
            next()
        } catch (error) {
            Handler.error(error, res)
        }
    }

}