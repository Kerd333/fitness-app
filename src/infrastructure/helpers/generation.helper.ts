import { ProcessedExerciseEntity } from "../../domain";
import { SessionInDb, SessionMapper } from "../mappers/session.mapper";

export class GenerationHelper {
    static processLatestSessions(latestSessions: SessionInDb[]):ProcessedExerciseEntity[] {

        const processedLatestSessions : ProcessedExerciseEntity[] = []

        // TODO: Los nombres de este codigo estan muy confusos! Hay que mejorarlo!

        for (let session of latestSessions) {
            const { exercises } = SessionMapper.toSessionEntity(session)
            for (let exerciseToProcess of exercises) {
                const { name, repList, weight } = exerciseToProcess
                const numberOfReps = repList.reduce(
                    (acc, current) => acc + current
                )
                const numberOfSets = repList.length
                // Busca en processedLatestSessions si ya se empezó a procesar los datos de 
                // este tipo de ejercicio.
                const processedExerciseData = processedLatestSessions.find(
                    (exerciseData) => exerciseData.name == name
                )
                // Si no se ha empezado a procesar, se empieza a procesar.
                if (!processedExerciseData) {
                    processedLatestSessions.push({ 
                        name, 
                        totalReps: numberOfReps,
                        totalSets: numberOfSets,
                        weight
                    })
                // Si ya se empezó a procesar, se sigue procesando
                } else {
                    // Si el ejercicio a procesar tiene menor peso que el registrado en
                    // processedLatestSessions se ignora, pues va a tener una cantidad alta de
                    // repeticiones. De igual forma si el ejercicio a procesar tiene mayor peso
                    // se ignora pues va a tener una cantidad muy baja de repeticiones.
                    // ¿Se puede mejorar esto?
                    if (processedExerciseData.weight == weight) {
                        processedExerciseData.totalReps += numberOfReps;
                        processedExerciseData.totalSets += numberOfSets;
                    }
                }
            }
        }
        return processedLatestSessions
    }
}