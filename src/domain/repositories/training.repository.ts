import { AddSessionDto } from "../dtos/training/add-session.dto";



export abstract class TrainingRepository {

    abstract addSession(addSessionDto: AddSessionDto): Promise<AddSessionDto>

}