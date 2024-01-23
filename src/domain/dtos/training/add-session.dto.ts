import { Validators } from "../../../config"
import { ApiError } from "../../errors/api.error"
import { AddExerciseDto } from "./add-exercise.dto"

export class AddSessionDto {
    private constructor(
        public category: string,
        public exercises: AddExerciseDto[],
        public date: Date,
        public loggedUserId: number
    ){}
    static create(object: {[key: string]:any}):AddSessionDto {

        const {category, exercises, date, loggedUserId} = object

        if (!category) throw ApiError.badRequest('Missing training category!')
        if (!Validators.trainingCategory(category)) throw ApiError.badRequest('Wrong training category!')

        const exerciseDtos = exercises.map((exercise: {[key: string]:any})  => AddExerciseDto.create(exercise))

        return new AddSessionDto(category, exerciseDtos, date, loggedUserId)
    }
}