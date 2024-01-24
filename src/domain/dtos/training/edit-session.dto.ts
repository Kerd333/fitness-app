import { ApiError } from "../../errors/api.error";


export class EditSessionDto {
    private constructor(
        public category: string | undefined,
        public date: Date | undefined,
        public sessionId: number,
        public loggedUserId: number
    ){}
    static create(object: {[key: string]: any}): EditSessionDto {

        const { category, date, sessionId, loggedUserId } = object;

        if (!category && !date) throw ApiError.badRequest('No changes submitted!') 

        return new EditSessionDto( category, date, sessionId, loggedUserId)
    }
}