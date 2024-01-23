import { PrismaClient } from "@prisma/client";
import { AddExerciseDto, AddSessionDto, ApiError, EditExerciseDto, ExerciseEntity, GetSessionsDto, SessionEntity, TrainingDatasource } from "../../domain";
import { ExerciseMapper } from "../mappers/exercise.mapper";
import { SessionMapper } from "../mappers/session.mapper";

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

    editExercise = async (editExerciseDto: EditExerciseDto): Promise<ExerciseEntity> => {
        const { name, reps, weight, exerciseId, userId } = editExerciseDto;

        // Revisa si el id proporcionado es correcto

        const exercise = await this.prisma.exercise.findFirst({
            where: {
                id: exerciseId
            }
        })

        if (!exercise) throw ApiError.badRequest('Incorrect exercise id');

        // Verifica si el usuario logeado es el mismo del ejercicio

        const trainSession = await this.prisma.trainSession.findFirst({
            where: {
                id: exercise.sessionId
            }
        })

        if (!trainSession) throw new Error('Exercise has a reference to a non existent train session')

        if (trainSession.userId != userId) throw ApiError.unauthorized('You cannot edit this exercise')

        const editedExercise = await this.prisma.exercise.update({
            where: {
                id: exerciseId
            },
            data: {
                name,
                reps,
                weight
            }
        })

        return ExerciseMapper.toExerciseEntity(editedExercise)
    }
}