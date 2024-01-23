import { AddExerciseDto } from "../dtos/training/add-exercise.dto";
import { AddSessionDto } from "../dtos/training/add-session.dto";
import { DeleteExerciseDto } from "../dtos/training/delete-exercise.dto";
import { EditExerciseDto } from "../dtos/training/edit-exercise.dto";
import { GetSessionsDto } from "../dtos/training/get-sessions.dto";
import { ExerciseEntity } from "../entities/exercise.entity";
import { SessionEntity } from "../entities/session.entity";



export abstract class TrainingDatasource {

    abstract getSessions(getSessionsDto: GetSessionsDto): Promise<SessionEntity[]>

    abstract addSession(addSessionDto: AddSessionDto): Promise<SessionEntity>

    abstract addExercise(addExerciseDto: AddExerciseDto): Promise<ExerciseEntity>

    abstract editExercise(editExerciseDto: EditExerciseDto): Promise<ExerciseEntity>

    abstract deleteExercise(deleteExerciseDto: DeleteExerciseDto): Promise<boolean>
    
}