export interface Extensions {
}

export interface Occurence {
    key: number;
    datasetKey: string;
    publishingOrgKey: string;
    publishingCountry: string;
    protocol: string;
    lastCrawled: Date;
    lastParsed: Date;
    crawlId: number;
    extensions: Extensions;
    basisOfRecord: string;
    individualCount: number;
    taxonKey: number;
    kingdomKey: number;
    phylumKey: number;
    classKey: number;
    orderKey: number;
    familyKey: number;
    genusKey: number;
    speciesKey: number;
    scientificName: string;
    kingdom: string;
    phylum: string;
    order: string;
    family: string;
    genus: string;
    species: string;
    genericName: string;
    specificEpithet: string;
    infraspecificEpithet: string;
    taxonRank: string;
    decimalLongitude: number;
    decimalLatitude: number;
    coordinateUncertaintyInMeters: number;
    year: number;
    month: number;
    day: number;
    eventDate: Date;
    issues: string[];
    lastInterpreted: Date;
    references: string;
    license: string;
    identifiers: any[];
    facts: any[];
    relations: any[];
    geodeticDatum: string;
    class: string;
    countryCode: string;
    country: string;
    locationAccordingTo: string;
    identifier: string;
    recordedBy: string;
    vernacularName: string;
    locationID: string;
    locality: string;
    gbifID: string;
    occurrenceID: string;
    behavior: string;
    identifiedBy: string;
    taxonID: string;
}

export interface Example {
    occurence: Occurence;
}