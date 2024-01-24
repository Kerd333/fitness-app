import { ApiError } from "../../errors/api.error"


export class AddExerciseDto {
    private constructor(
        public name: string,
        public reps: string,
        public weight: number,
        public sessionId: number,
        public loggedUserId: number | null
    ) {}

    static create(object: {[key:string]: any}):AddExerciseDto {
        const { name, repList, weight, sessionId, loggedUserId } = object

        if (!name) throw ApiError.badRequest('Missing exercise name!');
        if (!repList) throw ApiError.badRequest('Missing rep list!');
        
        const reps = repList.join(',');

        return new AddExerciseDto(name, reps, weight, sessionId, loggedUserId)
    }
}