import { TrainingRepository } from "../../repositories/training.repository";


export class DeleteSessionUseCase {
    constructor (
        private readonly trainingRepository: TrainingRepository
    ) {}

    execute = async (sessionId: number, loggedUserId: number):Promise<boolean> => {
        const deleted = await this.trainingRepository.deleteSession(sessionId, loggedUserId)
        return deleted
    }
}