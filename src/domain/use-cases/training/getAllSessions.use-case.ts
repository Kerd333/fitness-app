import { SessionEntity } from "../../entities/session.entity";
import { TrainingRepository } from "../../repositories/training.repository";


export class GetAllSessionsUseCase {
    constructor (
        private readonly trainingRepository: TrainingRepository
    ) {}
    execute = async ():Promise<SessionEntity[]> => {
        const sessions = this.trainingRepository.getAllSessions()
        return sessions
    }
}