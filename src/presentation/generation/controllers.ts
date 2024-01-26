import { Request, Response } from "express";
import { GenerationRepository, GenerateSessionUseCase, ApiError } from "../../domain";
import { Handler, Validators } from "../../config";


export class GenerationController {

    constructor (
        private readonly generationRepository: GenerationRepository
    ) {}

    generateSession = async (req: Request, res: Response) => {
        try {
            const loggedUserId = req.body.user.id
            const category = req.params.category

            // TODO: Hace falta crear un DTO para este endpoint por la validación?

            if (!Validators.trainingCategory(category)) throw ApiError.badRequest('Invalid category')

            const generateSessionUseCase = new GenerateSessionUseCase(this.generationRepository);
            const generateSession = await generateSessionUseCase.execute(loggedUserId, category)

            res.json(generateSession)
        } catch (error) {
            Handler.error(error, res)
        }
    }

}