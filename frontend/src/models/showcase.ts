export interface SongOfTheWeekModal {
  _id: string;
  alternativeTitle: string;
  category: string;
  album: string;
  updatedAt: string;
  createdAt: string;
  image: File | null;
  thumbnailUrl?: string;
  slug: string;
}

export interface ArtistOfTheWeekModal {
  _id: string;
  alternativeTitle: string;
  category: string;
  updatedAt: string;
  createdAt: string;
  image: File | null;
  thumbnailUrl?: string;
  slug: string;
}

export interface DjsOfTheWeekModal {
  _id: string;
  alternativeTitle: string;
  category: string;
  updatedAt: string;
  releaseTitle: string;
  image: File | null;
  thumbnailUrl?: string;
  slug: string;
}

export interface landingCardsModel {
  _id: string;
  title: string;
  articleIds: Array<{
    articleId: string;
    cardTitle: string;
    categoryTitle: string;
    articleData: {
      thumbnailUrl: string;
      slug: string;
    };
  }>;
}
