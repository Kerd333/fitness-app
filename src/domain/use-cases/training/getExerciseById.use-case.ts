import { ExerciseEntity } from "../../entities/exercise.entity";
import { TrainingRepository } from "../../repositories/training.repository";



export class GetExerciseByIdUseCase {
    constructor(
        private readonly trainingRepository: TrainingRepository
    ){}
    execute = async (exerciseId: number):Promise<ExerciseEntity> => {
        const exercise = await this.trainingRepository.getExerciseById(exerciseId)
        return exercise
    }
}