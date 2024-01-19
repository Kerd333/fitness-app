import { AddExerciseDto, AddSessionDto, GetSessionsDto, SessionEntity, TrainingDatasource, TrainingRepository } from "../../domain";



export class TrainingRepositoryImpl implements TrainingRepository {

    constructor(
        private readonly trainingDatasource: TrainingDatasource
    ){}

    getSessions(getSessionsDto: GetSessionsDto): Promise<SessionEntity[]> {
        return this.trainingDatasource.getSessions(getSessionsDto)
    }

    addSession(addSessionDto: AddSessionDto): Promise<AddSessionDto> {
        return this.trainingDatasource.addSession(addSessionDto)
    }

    addExercise(addExerciseDto: AddExerciseDto): Promise<AddExerciseDto> {
        return this.trainingDatasource.addExercise(addExerciseDto)
    }
}