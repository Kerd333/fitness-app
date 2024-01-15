import { AddSessionDto } from "../../dtos/training/add-session.dto";
import { TrainingRepository } from "../../repositories/training.repository";




export class AddSessionUseCase {
    constructor(
        private readonly trainingRepository: TrainingRepository
    ){}

    execute = async(addSessionDto: AddSessionDto):Promise<AddSessionDto> => {
        const session = await this.trainingRepository.addSession(addSessionDto)
        return session
    }
}