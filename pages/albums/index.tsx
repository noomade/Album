import { Albums, ExtendedAlbum, Photo, Photos } from '../../types';

import AlbumsPage from '../../Containers/Albums';

export async function getStaticProps() {
  const albumsRes = await fetch('https://jsonplaceholder.typicode.com/albums');
  const albums: Albums = await albumsRes.json();
  const photosRes = await fetch('https://jsonplaceholder.typicode.com/photos');
  const photos: Photos = await photosRes.json();
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

export default AlbumsPage;
