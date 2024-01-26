import { SessionEntity } from "../../entities/session.entity";
import { GenerationRepository } from "../../repositories/generation.repository";



export class GenerateSessionUseCase {
    constructor (
        private readonly generationRepository: GenerationRepository
    ) {}
    execute = async (loggedUserId: number, category: string): Promise<SessionEntity> => {
        const generatedSession = await this.generationRepository.generateSession(loggedUserId, category);
        return generatedSession
    }
}