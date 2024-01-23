import { DeleteExerciseDto } from "../../dtos/training/delete-exercise.dto";
import { TrainingRepository } from "../../repositories/training.repository";


export class DeleteExerciseUseCase {
    constructor(
        private readonly trainingRepository: TrainingRepository
    ) {}

    execute = async (deleteExerciseDto: DeleteExerciseDto):Promise<boolean> => {
        const deleted = await this.trainingRepository.deleteExercise(deleteExerciseDto);
        return deleted
    }
}