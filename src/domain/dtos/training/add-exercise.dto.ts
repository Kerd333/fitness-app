import { ApiError } from "../../errors/api.error"


export class AddExerciseDto {
    private constructor(
        public name: string,
        public reps: number[],
        public weight: number,
        public sessionId: number,
        public userId: number
    ) {}

    static create(object: {[key:string]: any}):AddExerciseDto {
        const { name, reps, weight, sessionId, userId } = object

        if (!name) throw ApiError.badRequest('Missing exercise name!');
        if (!sessionId) throw ApiError.badRequest('Missing session id!');
        if (!reps) throw ApiError.badRequest('Missing reps!');
        
        return new AddExerciseDto(name, reps, weight, sessionId, userId)
    }
}