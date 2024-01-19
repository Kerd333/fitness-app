import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { TrainingController } from "./controllers";
import { TrainingDatasourceImpl, TrainingRepositoryImpl } from "../../infrastructure";
import { TrainingMiddleware } from "../middlewares/training.middleware";

// Todas estas rutas deben estar protegidas para evitar que las acceda alguien sin logearse

export class TrainingRoutes {
    constructor (
        private readonly prisma: PrismaClient
    ) {}

    get routes(): Router {
        const router = Router();
        const trainingDatasource = new TrainingDatasourceImpl(this.prisma);
        const trainingRepository = new TrainingRepositoryImpl(trainingDatasource);
        const trainingController = new TrainingController(trainingRepository);

        router.post('/sessions/', TrainingMiddleware.validateLogin, trainingController.addSession)
        router.post('/exercises/', TrainingMiddleware.validateLogin, trainingController.addExercise)

        return router
    }
}
