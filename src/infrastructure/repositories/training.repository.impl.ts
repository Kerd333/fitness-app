import { AddExerciseDto, AddSessionDto, DeleteExerciseDto, EditExerciseDto, ExerciseEntity, GetUserSessionsDto, SessionEntity, TrainingDatasource, TrainingRepository } from "../../domain";



export class TrainingRepositoryImpl implements TrainingRepository {

    constructor(
        private readonly trainingDatasource: TrainingDatasource
    ){}

    getUserSessions(getUserSessionsDto: GetUserSessionsDto): Promise<SessionEntity[]> {
        return this.trainingDatasource.getUserSessions(getUserSessionsDto)
    }

    addSession(addSessionDto: AddSessionDto): Promise<SessionEntity> {
        return this.trainingDatasource.addSession(addSessionDto)
    }

    addExercise(addExerciseDto: AddExerciseDto): Promise<ExerciseEntity> {
        return this.trainingDatasource.addExercise(addExerciseDto)
    }

    editExercise(editExerciseDto: EditExerciseDto): Promise<ExerciseEntity> {
        return this.trainingDatasource.editExercise(editExerciseDto)
    }

    deleteExercise(deleteExerciseDto: DeleteExerciseDto): Promise<boolean> {
        return this.trainingDatasource.deleteExercise(deleteExerciseDto)
    }
}