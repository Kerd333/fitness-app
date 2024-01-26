import { SessionEntity } from "../../domain";
import { ExerciseInDb, ExerciseMapper } from "./exercise.mapper";


export interface SessionInDb {
    id: number,
    category: string,
    exercises: ExerciseInDb[],
    date: Date,
}

export class SessionMapper {
    static toSessionEntity(sessionInDb: SessionInDb): SessionEntity {
        const { id, category, exercises, date } = sessionInDb;
        const mappedExercises = exercises.map((exerciseInDb) => ExerciseMapper.toExerciseEntity(exerciseInDb));
        return {
            id,
            category,
            exercises: mappedExercises,
            date
        }
    }
}