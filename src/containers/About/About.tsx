import React from 'react';

// COMPONENTS
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Link } from '../../components';

// HELPERS
import { capitalize } from '../../helpers/utils';
import theme from '../../helpers/theme';

// PACKAGE
import packageJSON from '../../../package.json';

function About() {
  return (
    <Container component="main">
      <Grid container justify="center" alignContent="center" direction="column" spacing={2}>
        <Grid item xs={12} id="#album">
          <Typography component="h2" variant="h3" align="center">
            About the {capitalize(packageJSON.name)} project
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography component="h3" variant="h5" align="center">
            It's a simple app that uses&nbsp;
            <Link href="https://jsonplaceholder.typicode.com" target="_blank">
              jsonplaceholder.typicode.com
            </Link>
            &nbsp;as the API REST provider.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography component="h4" variant="h6" align="center">
            It also implements an authentication method.&nbsp;
            <b style={{ color: theme.palette.error.main }}>It does NOT provide any security at all</b>, neither does it
            use an API for login, it simply stores provided input email into localStorage, saved with the storage
            key&nbsp;
            <code>AlbumEmail</code>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography component="h5" variant="body1" align="left">
            It uses the following dependencies:
          </Typography>
          <List>
            {Object.keys(packageJSON.dependencies).map((dependencie: string) => {
              // @ts-ignore-next-line
              const label = `${dependencie} using version @${packageJSON.dependencies[dependencie]}`;
              return (
                <ListItem component={Typography} key={dependencie} variant="body2" align="center">
                  {label}
                </ListItem>
              );
            })}
          </List>
        </Grid>
        <Grid item xs={12}>
          <Typography component="h5" variant="body1" align="left">
            There's also a few scripts you can run after the installation:
          </Typography>
          <List>
            {Object.keys(packageJSON.scripts).map((script: string) => {
              // @ts-ignore-next-line
              const label = `"yarn ${script}" that runs "yarn ${packageJSON.scripts[script]}"`;
              return (
                <ListItem component={Typography} key={script} variant="body2" align="left">
                  {label}
                </ListItem>
              );
            })}
          </List>
          <Typography component="h6" variant="body1" align="left">
            To learn more about the scripts and what they do, check out my&nbsp;
            <Link href="https://github.com/noomade/Album" target="_blank">
              GitHub project
            </Link>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography component="h5" variant="body1" align="left">
            I used some developer dependencies on this project:
          </Typography>
          <List>
            {Object.keys(packageJSON.devDependencies).map((devDep: string) => {
              // @ts-ignore-next-line
              const label = `${devDep} using version @${packageJSON.devDependencies[devDep]}`;
              return (
                <ListItem component={Typography} key={devDep} variant="body2" align="left">
                  {label}
                </ListItem>
              );
            })}
          </List>
        </Grid>
      </Grid>
    </Container>
  );
}

export default About;
