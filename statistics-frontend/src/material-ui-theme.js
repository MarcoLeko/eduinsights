import { createMuiTheme } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";

const muiGradientBackground =
  "linear-gradient(90deg, rgba(75,225,255,1) 35%, rgba(62,175,255,1) 100%)";

const getMaterialUiTheme = (theme) => {
  const mainPrimaryColor = theme === "dark" ? "#4BE1FFFF" : "#3EAFFFFF";
  const mainSecondaryColor = theme === "dark" ? grey[200] : grey[600];

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
      fontFamily: ["verdana", "sans-serif"].join(","),
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
    overrides: {
      MuiButton: {
        contained: {
          "&$disabled": {
            opacity: 0.5,
          },
        },
      },
      MuiMobileStepper: {
        dots: {
          margin: "auto",
        },
      },
    },
  });
};

export { getMaterialUiTheme, muiGradientBackground };
