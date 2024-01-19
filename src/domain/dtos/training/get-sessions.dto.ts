

export class GetSessionsDto {
    private constructor (
        public userId: number
    ){}

    static create(object: {[key:string]: any}):GetSessionsDto {
        const { userId } = object;

        return new GetSessionsDto(userId)
    }
}