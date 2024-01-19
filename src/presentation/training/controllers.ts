import { Request, Response } from "express";
import { Handler } from "../../config";
import { AddExerciseDto, AddExerciseUseCase, AddSessionDto, AddSessionUseCase, TrainingRepository } from "../../domain";


export class TrainingController {
    constructor(
        private readonly trainingRepository: TrainingRepository
    ){}

    addSession = async(req: Request, res: Response) => {
        try {
            const { category, exercises = [], date = new Date(), user } = req.body;
            const userId = user.id
            // Puede tirar error por suministrar datos incorrectos
            const addSessionDto = AddSessionDto.create({category, exercises, date, userId});
            const addSessionUseCase = new AddSessionUseCase(this.trainingRepository);
            const session = await addSessionUseCase.execute(addSessionDto);
            res.json(session)
        } catch (error) {
            Handler.error(error, res)
        }
    }

    addExercise = async(req: Request, res: Response) => {
        try {
            const { name, reps, weight = 0, sessionId, user } = req.body;
            const userId = user.id
            // Puede tirar error por suministrar datos incorrectos
            const addExerciseDto = AddExerciseDto.create({name, reps, weight, sessionId, userId});
            // Puede tirar error si el sessionId es incorrecto, o si el sessionId no corresponde
            // al usuario logeado
            const addExerciseUseCase = new AddExerciseUseCase(this.trainingRepository);
            const exercise = await addExerciseUseCase.execute(addExerciseDto);
            res.json(exercise)
        } catch (error) {
            Handler.error(error, res)
        }
    }
}