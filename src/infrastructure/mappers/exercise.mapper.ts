import { ExerciseEntity } from "../../domain";


export interface ExerciseInDb {
    id: number,
    name: string,
    reps: string,
    weight: number,
    sessionId: number
}

export class ExerciseMapper {
    static toExerciseEntity(exerciseInDb: ExerciseInDb):ExerciseEntity {
        const { id, name, reps, weight, sessionId } = exerciseInDb;
        const repList = reps.split(",").map((stringAmount) => parseInt(stringAmount))
        return {
            id,
            name,
            repList,
            weight,
            sessionId
        }
    }
}