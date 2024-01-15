import { AddSessionDto } from "../dtos/training/add-session.dto";



export abstract class TrainingDatasource {

    abstract addSession(addSessionDto: AddSessionDto): Promise<AddSessionDto>

}