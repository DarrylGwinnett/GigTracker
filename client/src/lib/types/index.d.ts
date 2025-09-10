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

type User ={
    id: string
    email: string
    displayName: string
    imageUrl?: string
}

type LocationIqSuggestion = {
    place_id: string
    display_name: string
    lat: string
    lon: string
    address: LocationIqAddress,
    boundingbox: string[],
    display_place: string,
    displayAddress: string
}

type LocationIqAddress = {
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