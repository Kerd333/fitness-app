import { Router } from "express";
import { AuthController } from "./controllers";
import { PrismaClient } from "@prisma/client";
import { AuthDatasourceImpl, AuthRepositoryImpl } from "../../infrastructure";

// Definición de las rutas de autenticación

export class AuthRoutes {
    constructor (
        private readonly prisma: PrismaClient
    ) {}

    get routes(): Router {
        const router = Router();
        const authDatasource = new AuthDatasourceImpl(this.prisma)
        const authRepository = new AuthRepositoryImpl(authDatasource)
        const authController = new AuthController(authRepository)

        router.post('/register', authController.registerUser)
        router.post('/login', authController.loginUser)


        router.get('/login-test', (req, res) => {
            console.log(req.cookies)
            if (!req.cookies.JWT) return res.json({error: 'Not logged in'})
            res.json(req.cookies.JWT)
        })

        return router
    }
}