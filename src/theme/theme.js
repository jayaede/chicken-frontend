import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#2e7d32" }, // chicken shop green
    secondary: { main: "#ff9800" }
  },
  shape: {
    borderRadius: 10
  },
  typography: {
    fontFamily: "Inter, Roboto, Arial"
  }
});

export default theme;
