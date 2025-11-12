type Gig = {
  id: string;
  title: string;
  artist: string;
  date: Date;
  description: string;
  genre: string;
  city: string;
  isCancelled: boolean;
  venue: string;
  latitude: number;
  longitude: number;
  attendees: Profile[];
  isGoing: boolean;
  isOrganiser: boolean;
  organiserId: string;
  organiserDisplayName: string;
  hostImage?: string;
};

type Profile = {
  id: string;
  displayName: string;
  bio?: string;
  imageUrl?: string;
  following?: boolean;
  followersCount?: number;
  followingCount?: number;
};

type User = {
  id: string;
  email: string;
  displayName: string;
  imageUrl?: string;
};

type Image = {
  id: string;
  url: string;
};

type LocationIqSuggestion = {
  place_id: string;
  display_name: string;
  lat: string;
  lon: string;
  address: LocationIqAddress;
  boundingbox: string[];
  display_place: string;
  displayAddress: string;
};

type LocationIqAddress = {
  name?: string;
  house_number?: string;
  road?: string;
  suburb?: string;
  city?: string;
  town?: string;
  village?: string;
  county?: string;
  state?: string;
  postcode?: string;
  country?: string;
  country_code?: string;
};

type ChatComment = {
  id: string;
  createdAt: Date;
  body: string;
  userId: string;
  displayName: string;
  imageUrl?: string;
};


type PagedList<T, TCursor> = {
   items: T[];
   nextCursor: TCursor;
}