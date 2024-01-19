export class ExerciseEntity {
    constructor (
        public id: number,
        public name: string,
        public reps: string,
        public weight: number,
        public sessionId: number
    ) {}
}