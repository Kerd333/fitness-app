import { PrismaClient } from "@prisma/client";
import { AddExerciseDto, AddSessionDto, ApiError, DeleteExerciseDto, EditExerciseDto, EditSessionDto, ExerciseEntity, GetUserSessionsDto, SessionEntity, TrainingDatasource } from "../../domain";
import { ExerciseMapper } from "../mappers/exercise.mapper";
import { SessionMapper } from "../mappers/session.mapper";
import { Session } from "inspector";

// TODO: Replace 400 with 404 where applicable

export class TrainingDatasourceImpl implements TrainingDatasource {

    constructor(
        private readonly prisma: PrismaClient
    ){}

    getUserSessions = async (getUserSessionsDto: GetUserSessionsDto): Promise<SessionEntity[]> => {
        
        const { loggedUserId } = getUserSessionsDto;

        const sessions = await this.prisma.trainSession.findMany({
            where: {
                userId: loggedUserId
            },
            include: {
                exercises: true
            }
        })

        return sessions.map((session) => SessionMapper.toSessionEntity(session))
    }

    getAllSessions = async (): Promise<SessionEntity[]> => {
        const sessions = await this.prisma.trainSession.findMany({
            include: {
                exercises: true
            }
        })

        return sessions.map((session) => SessionMapper.toSessionEntity(session))
    }

    getSessionById = async (sessionId: number): Promise<SessionEntity> => {
        const session = await this.prisma.trainSession.findFirst({
            where: {
                id: sessionId
            },
            include: {
                exercises: true
            }
        })

        if (!session) throw ApiError.notFound('Session doesn\'t exist')

        return SessionMapper.toSessionEntity(session)
    }

    getExerciseById = async (exerciseId: number): Promise<ExerciseEntity> => {
        const exercise = await this.prisma.exercise.findFirst({
            where: {
                id: exerciseId
            }
        })

        if (!exercise) throw ApiError.notFound('Exercise doesn\'t exist')

        return ExerciseMapper.toExerciseEntity(exercise)
    }

    addSession = async (addSessionDto: AddSessionDto): Promise<SessionEntity> => {

        const { category, exercises, date, loggedUserId } = addSessionDto;

        const newSession = await this.prisma.trainSession.create({
            data: {
                    category,
                    date,
                    user: {
                        connect: {id: loggedUserId}
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
        const { name, reps, weight, sessionId, loggedUserId } = addExerciseDto;

        // Revisa en la DB si existe una sesion con el id sessionId.

        const trainSession = await this.prisma.trainSession.findFirst({
            where: {
                id: sessionId
            }
        })

        if (!trainSession) throw ApiError.notFound('Session doesn\'t exist!')

        // Revisa si el usuario de la sesión es el mismo que el usuario logeado.

        if (trainSession.userId != loggedUserId) throw ApiError.unauthorized('You cannot edit this session!')

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

    editSession = async (editSessionDto: EditSessionDto): Promise<SessionEntity> => {
        
        const { category, date, sessionId, loggedUserId } = editSessionDto;

        // Revisa si el id proporcionado es correcto

        const sessionToEdit = await this.prisma.trainSession.findFirst({
            where: {
                id: sessionId
            }
        })

        if (!sessionToEdit) throw ApiError.notFound('Session doesn\'t exist!')

        // Verifica si el usuario logeado es el mismo de la sesión

        if (sessionToEdit.userId != loggedUserId) throw ApiError.unauthorized('You cannot edit this exercise')

        const editedSession = await this.prisma.trainSession.update({
            where: {
                id: sessionId
            },
            data: {
                category,
                date
            },
            include: {
                exercises: true
            }
        })

        return SessionMapper.toSessionEntity(editedSession)
    }

    editExercise = async (editExerciseDto: EditExerciseDto): Promise<ExerciseEntity> => {
        const { name, reps, weight, exerciseId, loggedUserId } = editExerciseDto;

        // Revisa si el id proporcionado es correcto

        const exercise = await this.prisma.exercise.findFirst({
            where: {
                id: exerciseId
            }
        })

        if (!exercise) throw ApiError.notFound('Exercise doesn\'t exist!')

        // Verifica si el usuario logeado es el mismo del ejercicio

        const trainSession = await this.prisma.trainSession.findFirst({
            where: {
                id: exercise.sessionId
            }
        })

        if (!trainSession) throw new Error('Exercise has a reference to a non existent train session')

        if (trainSession.userId != loggedUserId) throw ApiError.unauthorized('You cannot edit this exercise')

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

    deleteSession = async (sessionId: number, loggedUserId: number): Promise<boolean> => {
        
        // Revisa si el id proporcionado es correcto

        const sessionToDelete = await this.prisma.trainSession.findFirst({
            where: {
                id: sessionId
            }
        })

        if (!sessionToDelete) throw ApiError.notFound('Session doesn\'t exist!')

        // Revisa si el usuario de la sesión es el mismo que el usuario logeado.

        if (sessionToDelete.userId != loggedUserId) throw ApiError.unauthorized('You cannot edit this session!')

        const deleteSession = await this.prisma.trainSession.delete({
            where: {
                id: sessionId
            }
        })
        
        return true
    }

    deleteExercise = async (deleteExerciseDto: DeleteExerciseDto): Promise<boolean> => {
        const { exerciseId, loggedUserId } = deleteExerciseDto;

        // Revisa si el id proporcionado es correcto

        const exerciseToDelete = await this.prisma.exercise.findFirst({
            where: {
                id: exerciseId
            }
        })

        if (!exerciseToDelete) throw ApiError.notFound('Exercise doesn\'t exist!');

        // Verifica si el usuario logeado es el mismo del ejercicio

        const trainSession = await this.prisma.trainSession.findFirst({
            where: {
                id: exerciseToDelete.sessionId
            }
        })

        if (!trainSession) throw new Error('Exercise has a reference to a non existent train session')

        if (trainSession.userId != loggedUserId) throw ApiError.unauthorized('You cannot edit this exercise')

        const deleteExercise = await this.prisma.exercise.delete({
            where: {
                id: exerciseId
            }
        })

        return true
    }
}