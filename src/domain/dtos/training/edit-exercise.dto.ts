import { ApiError } from "../../errors/api.error";

export class EditExerciseDto {
    private constructor (
        public name: string | undefined,
        public reps: string | undefined,
        public weight: number | undefined,
        public exerciseId: number,
        public loggedUserId: number
    ) {}
    static create(object: { [ key:string ] : any }): EditExerciseDto {
        const { name, repList, weight, exerciseId, loggedUserId } = object;
        let reps;

        if (repList instanceof Array) {
            reps = repList.join(',')
        }

        if (!exerciseId) throw ApiError.badRequest('ID is missing!')
        if (!name && !reps && !weight) throw ApiError.badRequest('No changes submitted!')

        return new EditExerciseDto(name, reps, weight, exerciseId, loggedUserId)
    }
}