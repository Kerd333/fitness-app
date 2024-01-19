import { AddExerciseDto } from "../dtos/training/add-exercise.dto";
import { AddSessionDto } from "../dtos/training/add-session.dto";



export abstract class TrainingRepository {

    abstract addSession(addSessionDto: AddSessionDto): Promise<AddSessionDto>

    abstract addExercise(addExerciseDto: AddExerciseDto): Promise<AddExerciseDto>
}