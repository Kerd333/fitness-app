export class ApiError extends Error {
    private constructor(
        public readonly statusCode: number,
        public readonly message: string
    ){
        super(message)
    }
    static badRequest(message: string) {
        return new ApiError(400, message)
    } 

    static unauthorized( message: string ) {
        return new ApiError(401, message)
    }

    static forbidden( message: string ) {
        return new ApiError(403, message)
    }

    static notFound( message: string ) {
        return new ApiError(404, message)
    }
}