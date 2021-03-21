import React, { ReactElement } from 'react';

// TYPES
import type { ExtendedAlbum } from '../../types';

// COMPONENTS
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Card } from '../../components';

// NEXT JS
import { useRouter } from 'next/router';

// MIDDLEWARE
import { retrieve, SupportedStorageKeys } from '../../middleware/LocalStorage';

export interface AlbumsPageProps {
  albums: Array<ExtendedAlbum>;
  searchText: string;
}

function AlbumsPage({ albums, searchText }: AlbumsPageProps): ReactElement {
  const [albumsDisplay, setAlbumsDisplay] = React.useState<Array<ExtendedAlbum>>([]);
  const router = useRouter();
  const [user, setUser] = React.useState<string>('');
  React.useEffect(() => {
    const usr: string = retrieve(SupportedStorageKeys.AlbumEmail);
    if (usr) {
      setUser(usr);
    }
  }, []);
  React.useEffect(() => {
    if (!user && !retrieve(SupportedStorageKeys.AlbumEmail)) {
      router.push('/');
    }
  }, []);
  React.useEffect(() => {
    setAlbumsDisplay(
      albums.filter((album) =>
        searchText ? JSON.stringify(album).toUpperCase().includes(searchText.toUpperCase()) : true
      )
    );
    const container = document.getElementsByTagName('html');
    if (container && container.length) {
      container[0].scrollTo(0, 0);
    }
  }, [searchText]);

  return (
    <Container component="main" maxWidth="xl" id="album-container">
      <Grid container spacing={2} justify="center" alignContent="center">
        {albumsDisplay.length >= 1 && user
          ? albumsDisplay.map((album, index) => {
              return (
                <Grid key={index} item xs={12} sm={6} md={4} lg={3} xl={2}>
                  <Card {...album} />
                </Grid>
              );
            })
          : !searchText && (
              <Grid item xs={12}>
                <Typography variant="h4" component="h4" align="center">
                  <CircularProgress />
                </Typography>
              </Grid>
            )}
        {Boolean(searchText && albumsDisplay.length <= 1) && (
          <Grid item xs={12}>
            <Typography variant="h4" component="h4" align="center">
              Nenhum resultado encontrado
            </Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}

export default AlbumsPage;
