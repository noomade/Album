import React, { ReactElement } from 'react';

// COMPONENTS
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

// NEXT JS
import { useRouter } from 'next/router';

// MIDDLEWARE
import { removeEntry, SupportedStorageKeys } from '../../middleware/LocalStorage';

// TYPES
import type { DefaultPageProps } from '../../types';


function LogOutPage({ setUser }: DefaultPageProps): ReactElement {
  const router = useRouter();
  React.useEffect(() => {
    removeEntry(SupportedStorageKeys.AlbumEmail);
    removeEntry(SupportedStorageKeys.AlbumToken);
    setUser(null);
    router.push('/');
  }, []);
  return (
    <Container component="main" maxWidth="xs">
      <Typography variant="h5" component="h5" align="center">
        Aguarde, estamos te redirecionando...
      </Typography>
    </Container>
  );
}

export default LogOutPage;
