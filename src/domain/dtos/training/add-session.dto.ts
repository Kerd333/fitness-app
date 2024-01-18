import { Validators } from "../../../config"
import { ApiError } from "../../errors/api.error"

export class AddSessionDto {
    private constructor(
        public category: string,
        public exercises: string[], // Esto debe ser un array de exercisesDto
        public date: Date,
        public userId: number
    ){}
    static create(object: {[key: string]:any}):AddSessionDto {

        const {category, exercises, date, userId} = object

        if (!category) throw ApiError.badRequest('Missing training category!')
        if (!Validators.trainingCategory(category)) throw ApiError.badRequest('Wrong training category!')

        return new AddSessionDto(category, exercises, date, userId)
    }
}