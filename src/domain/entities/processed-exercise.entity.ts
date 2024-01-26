export class ProcessedExerciseEntity {
    constructor (
        public name: string,
        public totalReps: number,
        public totalSets: number,
        public weight: number,
    ) {}
}