import { SessionEntity } from "../entities/session.entity";


export abstract class GenerationRepository {

    abstract generateSession(loggedUserId: number, category: string):Promise<SessionEntity>
    
}