export class ExerciseEntity {
    constructor (
        public id: number,
        public name: string,
        public repList: number[],
        public weight: number,
        public sessionId: number
    ) {}
}