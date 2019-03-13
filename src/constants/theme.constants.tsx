import { createMuiTheme } from "@material-ui/core/styles";
import { blueGrey, orange, teal, cyan } from "@material-ui/core/colors";

export default createMuiTheme({
  palette: {
    primary: {
      main: blueGrey[800],
      contrastText: "#fff"
    },
    secondary: {
      main: orange[500],
      contrastText: "#fff"
    }
  },
  typography: {
    useNextVariants: true
  }
});
