export interface Species {
    taxonKey: number,
    scientificName: string,
    acceptedTaxonKey: number,
    acceptedScientificName: string,
    numberOfOccurrences: number,
    taxonRank: string,
    taxonomicStatus: string,
    kingdom?: string,
    kingdomKey?: number,
    phylum?: string,
    phylumKey?: number,
    class?: string,
    classKey?: number,
    order?: string,
    orderKey?: number,
    family?: string,
    familyKey?: number,
    genus?: string,
    genusKey?: number,
    species?: string,
    speciesKey?: number
}

export interface Kingdom {
    kingdom: string,
    kingdomKey: number,
    classes: SpeciesClass[]
}

export interface SpeciesClass {
    class: string,
    classKey: number
    orders: Order[]
}

export interface Order {
    order: string,
    orderKey: number
    families: Family[]
}

export interface Family {
    family: string,
    familyKey: number
    geni: Genus[]
}

export interface Genus {
    genus: string,
    genusKey: number
    speciesList: Species[]
}