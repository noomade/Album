import React, { ReactElement } from 'react';

// NEXT JS
import type { AppProps } from 'next/app';
import Head from 'next/head';

// COMPONENTS
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { TopBar } from '../containers';

// MATERIAL THEME
import theme from '../helpers/theme';

function SimpleAds(props: AppProps): ReactElement {
  const [searchText, setSearchText] = React.useState<string>('');

  const { Component, pageProps } = props;

  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      // @ts-ignore-next-line
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
        <TopBar searchText={searchText} onSearchChange={handleSearchTextChange} />
        <Component searchText={searchText} {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default SimpleAds;
