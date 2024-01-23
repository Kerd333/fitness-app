

export class GetSessionsDto {
    private constructor (
        public loggedUserId: number
    ){}

    static create(object: {[key:string]: any}):GetSessionsDto {
        const { loggedUserId } = object;

        return new GetSessionsDto(loggedUserId)
    }
}