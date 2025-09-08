type Gig = {
    id: string
    title: string
    artist: string
    date: Date
    description: string
    genre: string
    city: string
    isCancelled: boolean
    venue: string
    latitude: number
    longitude: number
}

export type LocationIqSuggestion = {
    place_id: string
    display_name: string
    lat: string
    lon: string
    address: LocationIqAddress,
    boundingbox: string[],
    display_place: string,
    displayAddress: string
}

export type LocationIqAddress = {
    name?: string
    house_number?: string
    road?: string
    suburb?: string
    city?: string
    town?: string
    village?: string
    county?: string
    state?: string
    postcode?: string
    country?: string
    country_code?: string
}