import React, { ReactElement } from 'react';

// TYPES
import { DefaultPageProps, ExtendedAlbum } from '../../types';

// COMPONENTS
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '../../Components/Card';
import Typography from '@material-ui/core/Typography';

// NEXT JS
import { useRouter } from 'next/router';

export interface AlbumsPageProps extends DefaultPageProps {
  albums: Array<ExtendedAlbum>;
  searchText: string;
}

function AlbumsPage({ albums, searchText, user }: AlbumsPageProps): ReactElement {
  const [albumsDisplay, setAlbumsDisplay] = React.useState<Array<ExtendedAlbum>>([]);
  const router = useRouter();
  React.useEffect(() => {
    if (!user && !localStorage.getItem('@simple-ads/email')) {
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
        {albumsDisplay.length >= 1 && user ? (
          albumsDisplay.map((album, index) => {
            return (
              <Grid key={index} item xs={12} sm={6} md={4} lg={3} xl={2}>
                <Card {...album} />
              </Grid>
            );
          })
        ) : (
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
