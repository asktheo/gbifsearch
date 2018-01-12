import { Occurence } from "./occurence";

export interface OccurenceResult {
    offset: number,
    limit: number,
    endOfRecords: boolean,
    count: number,
    results : Occurence[] 
}
