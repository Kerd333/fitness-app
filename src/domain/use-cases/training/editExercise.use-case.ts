import { EditExerciseDto } from "../../dtos/training/edit-exercise.dto";
import { ExerciseEntity } from "../../entities/exercise.entity";
import { TrainingRepository } from "../../repositories/training.repository";


export class EditExerciseUseCase {
    constructor (
        private readonly trainingRepository: TrainingRepository
    ) {}
    execute = async (editExerciseDto: EditExerciseDto):Promise<ExerciseEntity> => {
        const exercise = await this.trainingRepository.editExercise(editExerciseDto)
        return exercise
    }
}