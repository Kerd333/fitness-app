import { AddExerciseDto } from "../dtos/training/add-exercise.dto";
import { AddSessionDto } from "../dtos/training/add-session.dto";
import { DeleteExerciseDto } from "../dtos/training/delete-exercise.dto";
import { EditExerciseDto } from "../dtos/training/edit-exercise.dto";
import { EditSessionDto } from "../dtos/training/edit-session.dto";
import { GetUserSessionsDto } from "../dtos/training/get-user-sessions.dto";
import { ExerciseEntity } from "../entities/exercise.entity";
import { SessionEntity } from "../entities/session.entity";



export abstract class TrainingDatasource {

    abstract getUserSessions(getUserSessionsDto: GetUserSessionsDto): Promise<SessionEntity[]>

    abstract getAllSessions(): Promise<SessionEntity[]>

    abstract getSessionById(sessionId: number): Promise<SessionEntity>

    abstract getExerciseById(exerciseId: number): Promise<ExerciseEntity>

    abstract addSession(addSessionDto: AddSessionDto): Promise<SessionEntity>

    abstract addExercise(addExerciseDto: AddExerciseDto): Promise<ExerciseEntity>

    abstract editSession(editSessionDto: EditSessionDto): Promise<SessionEntity>

    abstract editExercise(editExerciseDto: EditExerciseDto): Promise<ExerciseEntity>

    abstract deleteSession(sessionId: number, loggedUserId: number): Promise<boolean>

    abstract deleteExercise(deleteExerciseDto: DeleteExerciseDto): Promise<boolean>
    
}