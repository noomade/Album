import React from "react";

//MATERIAL-UI
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles, Theme } from "@material-ui/core/styles";

//FINAL-FORM
import { Form } from "react-final-form";

//COMPONENTS
import Field from "../Components/Field";

//NEXTJS
import { useRouter } from "next/router";

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  field: {
    margin: theme.spacing(3, 0, 2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignIn() {
  const classes = useStyles();
  const router = useRouter();
  return (
    <Container component="main" maxWidth="xs">
      <Form
        onSubmit={(values) => {
          localStorage.setItem("@simples-ads/email", values.email);
          router.push("/albums");
        }}
        render={({ handleSubmit, submitting }) => {
          return (
            <form onSubmit={handleSubmit} className={classes.paper}>
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
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={submitting}
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
