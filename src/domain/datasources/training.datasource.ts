import { AddExerciseDto } from "../dtos/training/add-exercise.dto";
import { AddSessionDto } from "../dtos/training/add-session.dto";
import { GetSessionsDto } from "../dtos/training/get-sessions.dto";
import { SessionEntity } from "../entities/session.entity";



export abstract class TrainingDatasource {

    abstract getSessions(getSessionsDto: GetSessionsDto): Promise<SessionEntity[]>

    abstract addSession(addSessionDto: AddSessionDto): Promise<AddSessionDto>

    abstract addExercise(addExerciseDto: AddExerciseDto): Promise<AddExerciseDto>
}