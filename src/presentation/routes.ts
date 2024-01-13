import { Router } from "express";
import { AuthRoutes } from "./auth/routes";
import { PrismaClient } from "@prisma/client";

// Definición de las rutas de la aplicación

export class AppRoutes {
    constructor(
        private readonly prisma: PrismaClient
    ) {}

    get routes(): Router {
        const router = Router();
        const authRoutes = new AuthRoutes(this.prisma)
        router.use('/api/auth/', authRoutes.routes)
        return router
    }
}