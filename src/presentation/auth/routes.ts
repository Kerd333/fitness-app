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

        return router
    }
}