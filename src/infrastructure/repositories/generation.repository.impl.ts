import { GenerationRepository, SessionEntity } from "../../domain";
import { GenerationDatasourceImpl } from "../datasources/generation.datasource.impl";



export class GenerationRepositoryImpl implements GenerationRepository {
    
    constructor (
        private readonly generationDatasource: GenerationDatasourceImpl
    ) {}

    generateSession(loggedUserId: number, category: string): Promise<SessionEntity> {
        return this.generationDatasource.generateSession(loggedUserId, category)
    }
}