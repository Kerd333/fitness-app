

export class GetUserSessionsDto {
    private constructor (
        public loggedUserId: number
    ){}

    static create(object: {[key:string]: any}):GetUserSessionsDto {
        const { loggedUserId } = object;

        return new GetUserSessionsDto(loggedUserId)
    }
}