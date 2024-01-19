import { AddExerciseDto, AddSessionDto, TrainingDatasource, TrainingRepository } from "../../domain";



export class TrainingRepositoryImpl implements TrainingRepository {

    constructor(
        private readonly trainingDatasource: TrainingDatasource
    ){}

    addSession(addSessionDto: AddSessionDto): Promise<AddSessionDto> {
        return this.trainingDatasource.addSession(addSessionDto)
    }

    addExercise(addExerciseDto: AddExerciseDto): Promise<AddExerciseDto> {
        return this.trainingDatasource.addExercise(addExerciseDto)
    }
}