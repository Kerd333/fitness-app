import { EditSessionDto } from "../../dtos/training/edit-session.dto";
import { SessionEntity } from "../../entities/session.entity";
import { TrainingRepository } from "../../repositories/training.repository";



export class EditSessionUseCase {
    constructor(
        private readonly trainingRepository: TrainingRepository
    ){}
    execute = async (editSessionDto: EditSessionDto):Promise<SessionEntity> => {
        const editedSession = await this.trainingRepository.editSession(editSessionDto)
        return editedSession
    }
}