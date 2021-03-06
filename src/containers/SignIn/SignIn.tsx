import React, { ReactElement } from 'react';

// COMPONENTS
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Form } from 'react-final-form';
import { Field } from '../../components';

// NEXTJS
import { useRouter } from 'next/router';

// HELPERS
import { composeValidators, email, required } from '../../components/Field/validation';

// MIDDLEWARE
import { retrieve, save, SupportedStorageKeys } from '../../middleware/LocalStorage';

type SignInFormValues = {
  email: string;
  password: string;
};

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  field: {
    margin: theme.spacing(3, 0, 2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignIn(): ReactElement {
  const classes = useStyles();
  const router = useRouter();
  React.useEffect(() => {
    if (retrieve(SupportedStorageKeys.AlbumEmail) || retrieve(SupportedStorageKeys.AlbumToken)) {
      save(SupportedStorageKeys.AlbumEmail, retrieve(SupportedStorageKeys.AlbumEmail));
      // TODO: validate token
      router.push('/albums');
    }
  }, []);
  return (
    <Container component="main" maxWidth="xs">
      <Form
        onSubmit={(values: SignInFormValues) => {
          if (typeof localStorage !== undefined) {
            save(SupportedStorageKeys.AlbumEmail, values.email);
            // TODO: async call in redux
            router.push('/albums');
          }
        }}
        subscription={{
          hasValidationErrors: true,
          submitting: true,
        }}
        initialValues={{ email: '', password: '' }}
        render={({ handleSubmit, submitting, hasValidationErrors }) => {
          return (
            <form onSubmit={handleSubmit} className={classes.paper} noValidate>
              <Typography component="h1" variant="h5">
                Seus Albums
              </Typography>
              <div className={classes.form}>
                <Field
                  className={classes.field}
                  name="email"
                  label="Email"
                  required
                  autoComplete="email"
                  margin="normal"
                  validate={composeValidators(required, email)}
                />
                <Field
                  className={classes.field}
                  name="password"
                  label="Senha"
                  required
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  margin="normal"
                  validate={required}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={submitting || hasValidationErrors}
                  fullWidth
                  className={classes.submit}
                >
                  Entrar
                </Button>
              </div>
            </form>
          );
        }}
      />
    </Container>
  );
}

export default SignIn;
