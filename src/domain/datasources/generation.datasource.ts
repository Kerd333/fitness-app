import { SessionEntity } from "../entities/session.entity";


export abstract class GenerationDatasource {

    abstract generateSession(loggedUserId: number, category: string):Promise<SessionEntity>
    
}