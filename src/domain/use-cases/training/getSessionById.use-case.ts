import { SessionEntity } from "../../entities/session.entity";
import { TrainingRepository } from "../../repositories/training.repository";


export class GetSessionByIdUseCase {
    constructor(
        private readonly trainingRepository: TrainingRepository
    ) {}
    execute = async (sessionId: number):Promise<SessionEntity> => {
        const session = this.trainingRepository.getSessionById(sessionId)
        return session
    }
}