export interface SongOfTheWeekModal {
  _id?: string;
  title: string;
  category: string;
  album: string;
  date: string;
  image: File | null;
  imageUrl?: string;
}

export interface ArtistOfTheWeekModal {
  _id?: string;
  title: string;
  category: string;
  date: string;
  image: File | null;
  imageUrl?: string;
}

export interface DjsOfTheWeekModal {
  _id?: string;
  title: string;
  category: string;
  releaseTitle: string;
  image: File | null;
  imageUrl?: string;
}
