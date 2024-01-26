export class ExerciseEntity {
    constructor (
        public name: string,
        public repList: number[],
        public weight: number,
        public id?: number,
        public sessionId?: number
    ) {}
}