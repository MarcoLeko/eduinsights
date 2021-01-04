import { createMuiTheme } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";

const muiGradientBackground =
  "linear-gradient(90deg, rgba(75,225,255,1) 35%, rgba(62,175,255,1) 100%)";

const getMaterialUiTheme = (theme) => {
  const mainPrimaryColor = "rgb(75,225,255)";
  const mainSecondaryColor = theme === "dark" ? grey[200] : grey[600];

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
      h5: {
        fontWeight: 600,
        fontSize: 18,
        padding: "6px 0px",
      },
      h3: {
        fontWeight: 700,
        fontSize: 26,
        padding: "10px 0px",
      },
      h4: {
        fontWeight: 600,
        fontSize: 22,
        padding: "8px 0px",
      },
    },
  });
};

export { getMaterialUiTheme, muiGradientBackground };
