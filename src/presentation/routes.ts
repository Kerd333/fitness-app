import { Router } from "express";
import { AuthRoutes } from "./auth/routes";
import { PrismaClient } from "@prisma/client";
import { TrainingRoutes } from "./training/routes";
import { GenerationRoutes } from "./generation/routes";

// Definición de las rutas de la aplicación

export class AppRoutes {
    constructor(
        private readonly prisma: PrismaClient
    ) {}

    get routes(): Router {

        const router = Router();
        const authRoutes = new AuthRoutes(this.prisma)
        const trainingRoutes = new TrainingRoutes(this.prisma)
        const generationRoutes = new GenerationRoutes(this.prisma)

        router.use('/auth/', authRoutes.routes)
        router.use('/training/', trainingRoutes.routes)
        router.use('/generate/', generationRoutes.routes)
        return router
    }
}