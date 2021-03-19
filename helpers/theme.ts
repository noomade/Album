import { createMuiTheme } from "@material-ui/core/styles";

const theme = {
  light: createMuiTheme({ palette: { type: "light" } }),
  dark: createMuiTheme({
    palette: {
      common: { black: "#000", white: "#fff" },
      type: "dark",
      primary: {
        main: "#90caf9",
        light: "rgb(166, 212, 250)",
        dark: "rgb(100, 141, 174)",
        contrastText: "rgba(0, 0, 0, 0.87)",
      },
      secondary: {
        main: "#f48fb1",
        light: "rgb(246, 165, 192)",
        dark: "rgb(170, 100, 123)",
        contrastText: "rgba(0, 0, 0, 0.87)",
      },
      error: {
        light: "#e57373",
        main: "#f44336",
        dark: "#d32f2f",
        contrastText: "#fff",
      },
      warning: {
        light: "#ffb74d",
        main: "#ff9800",
        dark: "#f57c00",
        contrastText: "rgba(0, 0, 0, 0.87)",
      },
      info: {
        light: "#64b5f6",
        main: "#2196f3",
        dark: "#1976d2",
        contrastText: "#fff",
      },
      success: {
        light: "#81c784",
        main: "#4caf50",
        dark: "#388e3c",
        contrastText: "rgba(0, 0, 0, 0.87)",
      },
      text: {
        primary: "#fff",
        secondary: "rgba(255, 255, 255, 0.7)",
        disabled: "rgba(255, 255, 255, 0.5)",
        hint: "rgba(255, 255, 255, 0.5)",
      },
      background: {
        paper: "#424242",
        default: "#121212",
        level2: "#333",
        level1: "#212121",
      },
    },
  }),
};

export default theme;
