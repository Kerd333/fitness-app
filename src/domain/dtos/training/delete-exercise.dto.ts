import { ApiError } from "../../errors/api.error";


export class DeleteExerciseDto {
    private constructor(
        public exerciseId: number,
        public loggedUserId: number
    ){}
    static create(object: {[key: string]: any}):DeleteExerciseDto {
        const { exerciseId, loggedUserId } = object;

        if (!exerciseId) throw ApiError.badRequest('Missing exercise ID')

        return new DeleteExerciseDto( exerciseId, loggedUserId )
    }
}