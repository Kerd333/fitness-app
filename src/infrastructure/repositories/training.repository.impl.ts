import { AddSessionDto, TrainingDatasource, TrainingRepository } from "../../domain";



export class TrainingRepositoryImpl implements TrainingRepository {

    constructor(
        private readonly trainingDatasource: TrainingDatasource
    ){}

    addSession(addSessionDto: AddSessionDto): Promise<AddSessionDto> {
        return this.trainingDatasource.addSession(addSessionDto)
    }

}