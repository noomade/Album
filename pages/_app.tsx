import React from "react";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../helpers/theme";

function SimpleAds({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme.dark}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default SimpleAds;
