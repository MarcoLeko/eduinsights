import { createMuiTheme } from "@material-ui/core/styles";
import { blueGrey, grey } from "@material-ui/core/colors";

const getMaterialUiTheme = (theme) => {
  const mainPrimaryColor = theme === "dark" ? blueGrey[200] : blueGrey[500];
  const mainSecondaryColor = theme === "dark" ? grey[100] : grey[800];

  return createMuiTheme({
    // breakpoints are specifically used for card carousel slider
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
        ccSmallest: 320,
        ccXxxs: 370,
        ccXxs: 425,
        ccXs: 512,
        ccSm: 567,
        ccMd: 680,
        ccLg: 901,
        ccXl: 1210,
        ccXxl: 1400,
      },
    },
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
