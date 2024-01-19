import { PrismaClient } from "@prisma/client";
import { AddExerciseDto, AddSessionDto, ApiError, TrainingDatasource } from "../../domain";



export class TrainingDatasourceImpl implements TrainingDatasource {

    constructor(
        private readonly prisma: PrismaClient
    ){}

    addSession = async (addSessionDto: AddSessionDto): Promise<AddSessionDto> => {

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

        return addSessionDto
    }

    addExercise = async (addExerciseDto: AddExerciseDto): Promise<AddExerciseDto> => {
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

        return addExerciseDto
    }
}