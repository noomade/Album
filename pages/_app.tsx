import React, { ReactElement } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../helpers/theme';
import TopBar from '../Containers/TopBar';

function SimpleAds(props: AppProps): ReactElement {
  const [searchText, setSearchText] = React.useState<string>('');
  const [user, setUser] = React.useState<null | string>(null);
  React.useEffect(() => {
    const usr = localStorage.getItem('@simple-ads/email');
    setUser(usr);
  }, []);

  const { Component, pageProps } = props;

  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  const handleSearchTextChange = (value: string) => {
    setSearchText(value);
  };
  return (
    <>
      <Head>
        <title>Simple Ads</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <TopBar user={user} searchText={searchText} onSearchChange={handleSearchTextChange} />
        <Component user={user} setUser={setUser} searchText={searchText} {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default SimpleAds;
