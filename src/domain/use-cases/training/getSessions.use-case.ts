import { GetSessionsDto } from "../../dtos/training/get-sessions.dto";
import { SessionEntity } from "../../entities/session.entity";
import { TrainingRepository } from "../../repositories/training.repository";



export class GetSessionsUseCase {
    constructor(
        private readonly trainingRepository: TrainingRepository
    ){}

    execute = async (getSessionsDto: GetSessionsDto):Promise<SessionEntity[]> => {
        const sessions = await this.trainingRepository.getSessions(getSessionsDto);
        return sessions
    }
}