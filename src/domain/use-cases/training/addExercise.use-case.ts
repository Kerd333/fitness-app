import { AddExerciseDto } from "../../dtos/training/add-exercise.dto";
import { ExerciseEntity } from "../../entities/exercise.entity";
import { TrainingRepository } from "../../repositories/training.repository";




export class AddExerciseUseCase {
    constructor(
        private readonly trainingRepository: TrainingRepository
    ){}

    execute = async(addExerciseDto: AddExerciseDto):Promise<ExerciseEntity> => {
        const exercise = await this.trainingRepository.addExercise(addExerciseDto)
        return exercise
    }
}