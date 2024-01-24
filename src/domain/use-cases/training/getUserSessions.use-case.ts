import { GetUserSessionsDto } from "../../dtos/training/get-user-sessions.dto";
import { SessionEntity } from "../../entities/session.entity";
import { TrainingRepository } from "../../repositories/training.repository";



export class GetUserSessionsUseCase {
    constructor(
        private readonly trainingRepository: TrainingRepository
    ){}

    execute = async (getUserSessionsDto: GetUserSessionsDto):Promise<SessionEntity[]> => {
        const sessions = await this.trainingRepository.getUserSessions(getUserSessionsDto);
        return sessions
    }
}