export interface ArticleModel {
  _id?: string | null;
  title: string;
  banner: File | string | null;
  thumbnail: File | string | null;
  desc: string;
  articleContentOne: string;
  articleContentTwo: string;
  articleContentThree: string;
  tags: string[];
  author: string;
  createdAt?: string;
  updatedAt?: string;
  thumbnailUrl?: string | null;
  bannerUrl?: string | null;
  category: string;
  slug?: string;
  songsIframes?: string[];
  videoIframes?: string[];
  alternativeTitle?: string;
  articleContentImage: File | string | null;
  articleContentImageUrl?: string;
  articleContentInstagram: string;
}
