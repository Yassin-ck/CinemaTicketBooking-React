import { createTheme } from "@mui/material/styles";

export const Muitheme = createTheme({
  palette: {
    primary: {
      light: "#16db65",
      main: "#020202",
      dark: "black",
      contrastText: "#fefe"
    },
    secondary: {
      light: "#7E899B",
      main: "#1F2D5A",
      dark: "#1F2D5A",
      contrastText: "#000",
    },
    text: {
      primary: "#0077b6",
      secondary: "#fff",
    },
  },
});