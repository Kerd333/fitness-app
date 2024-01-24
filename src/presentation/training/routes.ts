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

        router.use(TrainingMiddleware.validateLogin)

        router.get('/sessions/', trainingController.getUserSessions)
        router.post('/sessions/', trainingController.addSession)
        router.post('/sessions/:sessionId', trainingController.addExercise)
        router.post('/exercises/:exerciseId', trainingController.editExercise)
        router.delete('/sessions/:sessionId', trainingController.deleteSession)
        router.delete('/exercises/:exerciseId', trainingController.deleteExercise)

        return router
    }
}
