import React from "react";
import { Albums, ExtendedAlbum, Photo, Photos } from "../../types";

function AlbumsPage({ albums }) {
  return (
    <ul>
      {albums.map((post) => (
        <li>{post.title}</li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const albumsRes = await fetch("https://jsonplaceholder.typicode.com/albums");
  const albums: Albums = await albumsRes.json();
  const photosRes = await fetch("https://jsonplaceholder.typicode.com/photos");
  const photos: Photos = await photosRes.json();
  let fullDataStream: Array<ExtendedAlbum> = [];
  for (const album of albums) {
    let filteredPhotos: Photos = photos.filter(
      (ph: Photo) => ph.albumId === album.id
    );
    fullDataStream.push({
      ...album,
      photos: filteredPhotos,
      thumbnailUrl: filteredPhotos[0].thumbnailUrl,
    });
  }
  return {
    props: {
      albums: fullDataStream,
    },
  };
}

export default AlbumsPage;
