import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#832729",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#f5eeee",
      contrastText: "#000",
    },
    background: {
      default: "#ffffff",
    },
    text: {
      primary: "#000000",
      secondary: "#ff6600",
    },
  },
  typography: {
    fontFamily: "'Mulish', sans-serif",
  },
});

export default theme;
