import { Response } from "express"
import { ApiError } from "../domain"



export class Handler {
    static error(error: unknown, res: Response) {
        if (error instanceof ApiError) {
            return res.status(error.statusCode).json({error: error.message})
        }
        console.log(error)
        console.log('Bad Error')
        return res.status(500).json({error: 'Internal Server Error'})
    }
}