import { PrismaClient } from "@prisma/client";
import { AddSessionDto, TrainingDatasource } from "../../domain";



export class TrainingDatasourceImpl implements TrainingDatasource {

    constructor(
        private readonly prisma: PrismaClient
    ){}

    addSession = async (addSessionDto: AddSessionDto): Promise<AddSessionDto> => {

        const { category, exercises, date, userId } = addSessionDto

        const newSession = await this.prisma.trainSession.create({
            data: {
                    category,
                    date,
                    user: {
                        connect: {id: userId}
                    }
            }
        })

        return addSessionDto
    }

}