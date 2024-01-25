import { ExerciseEntity } from "./exercise.entity";

export class SessionEntity {
    constructor (
        public category: string,
        public exercises: ExerciseEntity[],
        public date?: Date,
        public id?: number,
    ){}
}