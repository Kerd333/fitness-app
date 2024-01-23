import { PrismaClient } from "@prisma/client";
import { AddExerciseDto, AddSessionDto, ApiError, ExerciseEntity, GetSessionsDto, SessionEntity, TrainingDatasource } from "../../domain";
import { ExerciseMapper } from "../mappers/exercise.mapper";
import { SessionMapper } from "../mappers/session.mapper";

// Falta acomodar los elementos retornados

export class TrainingDatasourceImpl implements TrainingDatasource {

    constructor(
        private readonly prisma: PrismaClient
    ){}

    getSessions = async (getSessionsDto: GetSessionsDto): Promise<SessionEntity[]> => {
        
        const { userId } = getSessionsDto;

        const sessions = await this.prisma.trainSession.findMany({
            where: {
                userId
            },
            include: {
                exercises: true
            }
        })

        return sessions.map((session) => SessionMapper.toSessionEntity(session))
    }

    addSession = async (addSessionDto: AddSessionDto): Promise<SessionEntity> => {

        const { category, exercises, date, userId } = addSessionDto;

        const newSession = await this.prisma.trainSession.create({
            data: {
                    category,
                    date,
                    user: {
                        connect: {id: userId}
                    },
                    exercises: {
                        create: exercises 
                    }
            },
            include: {
                exercises: true,
            }
        })

        return SessionMapper.toSessionEntity(newSession);
    }

    addExercise = async (addExerciseDto: AddExerciseDto): Promise<ExerciseEntity> => {
        const { name, reps, weight, sessionId, userId } = addExerciseDto;

        // Revisa si sessionId no es nulo.

        if (!sessionId) throw ApiError.badRequest('Missing session id!');

        // Revisa en la DB si existe una sesion con el id sessionId.

        const trainSession = await this.prisma.trainSession.findFirst({
            where: {
                id: sessionId
            }
        })

        if (!trainSession) throw ApiError.badRequest('Incorrect session Id!')

        // Revisa si el usuario de la sesión es el mismo que el usuario logeado.

        if (trainSession.userId != userId) throw ApiError.unauthorized('You cannot edit this session!')

        const newExercise = await this.prisma.exercise.create({
            data: {
                name,
                reps,
                weight,
                trainSession: {
                    connect: {id: sessionId}
                } 
            }
        })

        return ExerciseMapper.toExerciseEntity(newExercise)
    }
}