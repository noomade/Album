// PAGES
import { Albums } from '../../containers';

// MIDDLEWARE
import api from '../../middleware/api';

// TYPES
import type { Albums as AlbumsType, ExtendedAlbum, Photo, Photos } from '../../types';

export async function getStaticProps() {
  const albums: AlbumsType = await api.fetchAlbums();
  const photos: Photos = await api.fetchPhotos();
  const fullDataStream: Array<ExtendedAlbum> = [];

  albums.forEach((album) => {
    const filteredPhotos: Photos = photos.filter((ph: Photo) => ph.albumId === album.id);
    fullDataStream.push({
      ...album,
      photos: filteredPhotos,
      thumbnailUrl: filteredPhotos[0].thumbnailUrl,
    });
  });
  // 100x5000 = 500k iterations
  // took 6.687ms from start to finish
  return {
    props: {
      albums: fullDataStream,
    },
  };
}

export default Albums;
