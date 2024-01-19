import { ExerciseEntity } from "./exercise.entity";

export class SessionEntity {
    constructor (
        public id: number,
        public category: string,
        public exercises: ExerciseEntity[],
        public date: Date,
    ){}
}