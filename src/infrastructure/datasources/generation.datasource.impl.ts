import { PrismaClient } from "@prisma/client";
import { GenerationDatasource, SessionEntity } from "../../domain";
import { GenerationHelper } from "../helpers/generation.helper";


export class GenerationDatasourceImpl implements GenerationDatasource {
    
    constructor (
        private readonly prisma: PrismaClient
    ) {}

    generateSession = async (loggedUserId: number, category: string): Promise<SessionEntity> => {

        const latestSessions = await this.prisma.trainSession.findMany({
            where: {
                userId: loggedUserId,
                category
            },
            orderBy: {
                id: 'desc'
            },
            include: {
                exercises: true
            },
            take: 5
        })

        const processedLatestSessions = GenerationHelper.processLatestSessions(latestSessions)

        const newExercises = processedLatestSessions.map(
            (totalExerciseData) => {
                const { name, totalReps, totalSets, weight } = totalExerciseData;

                const averageReps = Math.floor(totalReps/totalSets) + 1

                if (averageReps >= 15) {
                    if (weight < 30) {
                        return { name, repList: [8,8,8,8], weight: weight + 2 }
                    }
                    const newWeight = Math.floor(weight * 1.1)
                    return { name, repList: [8,8,8,8], weight : newWeight}
                } else {
                    const repList = [averageReps + 1, averageReps, averageReps, averageReps - 1]
                    return { name, repList, weight}
                }

            }
        )

        return {category, exercises: newExercises}
    }
    // TODO: Generate deload session
}