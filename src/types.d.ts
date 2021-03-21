export interface Album {
  userId: number;
  id: number;
  title: string;
}
export type Albums = Array<Album>;

export interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}
export type Photos = Array<Photo>;

export interface ExtendedAlbum extends Album {
  thumbnailUrl: string;
  photos: Photos;
}

export interface DefaultPageProps {
  user: null | string;
  token: null | string;
  setUser: (value: null | string) => void;
}
