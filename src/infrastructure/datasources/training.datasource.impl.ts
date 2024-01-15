import { PrismaClient } from "@prisma/client";
import { AddSessionDto, TrainingDatasource } from "../../domain";



export class TrainingDatasourceImpl implements TrainingDatasource {

    constructor(
        private readonly prisma: PrismaClient
    ){}

    addSession = async (addSessionDto: AddSessionDto): Promise<AddSessionDto> => {

        const { category, exercises, date, owner } = addSessionDto

        const updatedOwner = await this.prisma.user.update({
            where: {
                name: owner
            },
            data: {
                trainSessions: {
                    create: {
                        category,
                        date
                    }
                }
            }
        })

        return addSessionDto
    }

}