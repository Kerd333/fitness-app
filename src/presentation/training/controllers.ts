import { Request, Response } from "express";
import { Handler } from "../../config";
import { AddExerciseDto, AddExerciseUseCase, AddSessionDto, AddSessionUseCase, DeleteExerciseDto, DeleteExerciseUseCase, EditExerciseDto, EditExerciseUseCase, GetSessionsDto, GetSessionsUseCase, TrainingRepository } from "../../domain";


export class TrainingController {
    constructor(
        private readonly trainingRepository: TrainingRepository
    ){}

    getSessions = async(req: Request, res: Response) => {
        try {
            const loggedUserId = req.body.user.id;

            const getSessionsDto = GetSessionsDto.create({loggedUserId})
            const getSessionsUseCase = new GetSessionsUseCase(this.trainingRepository);
            const sessions = await getSessionsUseCase.execute(getSessionsDto);
            res.json(sessions)
        } catch (error) {
            Handler.error(error, res)
        }
    }

    addSession = async(req: Request, res: Response) => {
        try {
            const { category, exercises = [], date = new Date(), user } = req.body;
            const loggedUserId = user.id
            // Puede tirar error por suministrar datos incorrectos
            const addSessionDto = AddSessionDto.create({category, exercises, date, loggedUserId});
            const addSessionUseCase = new AddSessionUseCase(this.trainingRepository);
            const session = await addSessionUseCase.execute(addSessionDto);
            res.json(session)
        } catch (error) {
            Handler.error(error, res)
        }
    }

    addExercise = async(req: Request, res: Response) => {
        try {
            const { name, repList, weight = 0, user } = req.body;
            const loggedUserId = user.id
            const sessionId = parseInt(req.params.sessionId)
            // Puede tirar error por suministrar datos incorrectos
            const addExerciseDto = AddExerciseDto.create({name, repList, weight, sessionId, loggedUserId});
            // Puede tirar error si el sessionId es incorrecto, o si el sessionId no corresponde
            // al usuario logeado
            const addExerciseUseCase = new AddExerciseUseCase(this.trainingRepository);
            const exercise = await addExerciseUseCase.execute(addExerciseDto);
            res.json(exercise)
        } catch (error) {
            Handler.error(error, res)
        }
    }

    editExercise = async(req: Request, res: Response) => {
        try {
            const { name, repList, weight, user } = req.body;
            const loggedUserId = user.id;
            const exerciseId = parseInt(req.params.exerciseId)
            // Puede tirar error por suministrar datos incorrectos
            const editExerciseDto = EditExerciseDto.create({name, repList, weight, exerciseId, loggedUserId});
            // Puede tirar error si el exerciseId es incorrecto, o si su sesión no existe o no corresponde
            // al usuario logeado
            const editExerciseUseCase = new EditExerciseUseCase(this.trainingRepository);
            const exercise = await editExerciseUseCase.execute(editExerciseDto);
            res.json(exercise)
        } catch (error) {
            Handler.error(error, res)
        }
    }

    deleteExercise = async(req: Request, res: Response) => {
        try {
            const { user } = req.body;
            const loggedUserId = user.id;
            const exerciseId = parseInt(req.params.exerciseId)
            // Puede tirar error por suministrar datos incorrectos
            const deleteExerciseDto = DeleteExerciseDto.create({exerciseId, loggedUserId});
            // Puede tirar error si el exerciseId es incorrecto, o si su sesión no existe o no corresponde
            // al usuario logeado
            const deleteExerciseUseCase = new DeleteExerciseUseCase(this.trainingRepository);
            const deleted = await deleteExerciseUseCase.execute(deleteExerciseDto);
            res.json({message: 'Exercise deleted successfully!'})
        } catch (error) {
            Handler.error(error, res)
        }
    }
}