import React, { ReactElement } from 'react';

// COMPONENTS
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

// NEXT JS
import { useRouter } from 'next/router';

// TYPES
import { DefaultPageProps } from '../../types';

function LogOutPage({ user, token, setUser }: DefaultPageProps): ReactElement {
  const router = useRouter();
  React.useEffect(() => {
    localStorage.removeItem('@simple-ads/email');
    localStorage.removeItem('@simple-ads/token');
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
