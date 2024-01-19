import { AddExerciseDto } from "../../dtos/training/add-exercise.dto";
import { TrainingRepository } from "../../repositories/training.repository";




export class AddExerciseUseCase {
    constructor(
        private readonly trainingRepository: TrainingRepository
    ){}

    execute = async(addExerciseDto: AddExerciseDto):Promise<AddExerciseDto> => {
        const exercise = await this.trainingRepository.addExercise(addExerciseDto)
        return exercise
    }
}