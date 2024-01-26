import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { Middleware } from "../middlewares/middleware";
import { GenerationDatasourceImpl, GenerationRepositoryImpl } from "../../infrastructure";
import { GenerationController } from "./controllers";




export class GenerationRoutes {
    constructor (
        private readonly prisma: PrismaClient
    ) {}
    get routes(): Router {
        const router = Router()
        const generationDatasource = new GenerationDatasourceImpl(this.prisma);
        const generationRepository = new GenerationRepositoryImpl(generationDatasource);
        const generationController = new GenerationController(generationRepository);

        router.use(Middleware.validateLogin)

        router.get('/session/:category', generationController.generateSession)

        return router
    }
}