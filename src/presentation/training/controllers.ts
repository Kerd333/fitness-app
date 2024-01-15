import { Request, Response } from "express";
import { Handler } from "../../config";
import { AddSessionDto, AddSessionUseCase, TrainingRepository } from "../../domain";


export class TrainingController {
    constructor(
        private readonly trainingRepository: TrainingRepository
    ){}

    addSession = async(req: Request, res: Response) => {
        try {
            const { category, exercises = [], date = new Date() } = req.body
            const owner = req.body.user.name
            // Puede tirar error por suministrar datos incorrectos
            const addSessionDto = AddSessionDto.create({category, exercises, date, owner});
            const addSessionUseCase = new AddSessionUseCase(this.trainingRepository)
            const session = await addSessionUseCase.execute(addSessionDto);
            res.json(session)
        } catch (error) {
            Handler.error(error, res)
        }
    }
}