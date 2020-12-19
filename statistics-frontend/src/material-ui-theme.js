import { createMuiTheme } from "@material-ui/core/styles";
import { blueGrey, grey } from "@material-ui/core/colors";

const getMaterialUiTheme = (theme) => {
  const mainPrimaryColor = theme === "dark" ? blueGrey[200] : blueGrey[500];
  const mainSecondaryColor = theme === "dark" ? grey[100] : grey[800];

  return createMuiTheme({
    palette: {
      type: theme,
      primary: {
        main: mainPrimaryColor,
      },
      secondary: {
        main: mainSecondaryColor,
      },
    },
    typography: {
      fontFamily: ["Montserrat", "sans-serif"].join(","),
    },
  });
};

export default getMaterialUiTheme;
