import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  transitions: {
    transitions: {
      duration: {
        shortest: 150,
        shorter: 200,
        short: 250,
        // most basic recommended timing
        standard: 20000,
        // this is to be used in complex animations
        complex: 375,
        // recommended when something is entering screen
        enteringScreen: 225,
        // recommended when something is leaving screen
        leavingScreen: 195,
      },
    },
  },
  layout: {
    mainContentMaxWidth: "1440px",
    mainLoginMaxWidth: "1024px",
  },
  palette: {
    primary: {
      light: "#26B0F9",
      main: "#fdc114",
      dark: "#172F3C",
      contrastText: "#FFFFFF",
    },
    secondary: {
      light: "#5d8ea9",
      main: "#5E7480",
      dark: "#1D1D1D",
      contrastText: "#000000",
      selected: "#FDC114",
    },
    background: {
      default: "#ffffff",
      main: "#D6C7C7",
    },
    error: {
      light: "#E54F5D",
      main: "#CD3F4C",
      dark: "#3C1F21",
      contrastText: "#FFFFFF",
    },
    action: {
      hover: "#f5f5f5",
      selected: "#f5f5f5",
      main: "#D6C7C7",
    },
    colors: {
      buttonBorderColor: "#5e7480",
    },
    borders: {
      default: "1px solid #e6e6e6",
    },
    reaction: {
      activeElementBorderColor: "#94E8D1",
      activeElementBackground: "#E6E6E6",
      badges: {
        bestseller: "#8CE0C9",
        sale: "#E54F5D",
      },
      borderColor: "#CCCCCC",
      buttonBorderRadius: 2,
      // grey scale
      black: "#000000",
      black95: "#0d0d0d",
      black90: "#1a1a1a",
      black85: "#262626",
      black80: "#333333",
      black75: "#404040",
      black70: "#4d4d4d",
      black65: "#595959",
      black60: "#666666",
      black55: "#737373",
      black50: "#808080",
      black45: "#8c8c8c",
      black40: "#999999",
      black35: "#a6a6a6",
      black30: "#b3b3b3",
      black25: "#bfbfbf",
      black20: "#cccccc",
      black15: "#d9d9d9",
      black10: "#e6e6e6",
      black05: "#f5f5f5",
      black02: "#fafafa",

      white: "#ffffff",
      // medium colors
      reactionBlue: "#fdc114",
      reactionBlue100: "#ecf8fe",
      reactionBlue200: "#d6e5ed",
      reactionBlue300: "#26b0f9",
      reactionBlue400: "#067ebe",
      reactionBlue500: "#285268",
      reactionBlue600: "#172f3c",
      coolGrey: "#5e7480",
      coolGrey100: "#e3ebf0",
      coolGrey200: "#d5d5d5",
      coolGrey300: "#5d8ea9",
      coolGrey400: "#3c5d6f",
      coolGrey500: "#3c3c3c",
      coolGrey600: "#1d1d1d",
      // dark colors
      forestGreen: "#158562",
      forestGreen100: "#dcfaf1",
      forestGreen200: "#b4ddc1",
      forestGreen300: "#0db781",
      forestGreen400: "#066144",
      forestGreen500: "#285749",
      forestGreen600: "#1e4035",
      darkBlue: "#23566d",
      darkBlue100: "#d9ebf3",
      darkBlue200: "#c4d3da",
      darkBlue300: "#135471",
      darkBlue400: "#103a4d",
      darkBlue500: "#333f45",
      darkBlue600: "#242c30",
      // support colors
      yellow: "#3fc95f",
      yellow100: "#fcf3dc",
      yellow200: "#e9e1cb",
      yellow300: "#fdda79",
      yellow400: "#fbc120",
      yellow500: "#a2832d",
      yellow600: "#7a6322",
      red: "#cd3f4c",
      red100: "#ffeeef",
      red200: "#f0e8e9",
      red300: "#e54f5d",
      red400: "#bc1d2b",

      red500: "#E16452",
      red600: "#3c1f21",
      story: "#EAE7FF",
      blog1: "#CADFFF",
      blog2: "#CAFFD9",
      blog3: "#FFE0CA",
      gradient: "linear-gradient(#000000, 31.77%, rgba(0, 0, 0, 0), 100%)",
      pageLoading: {
        innerColor: "#fdc114",
        outerColor: "rgba(9.80392156862745%,59.99999999999995%,86.66666666666667%,0.122)",
      },
      teal: "#8ce0c9",
      teal100: "#edfdf8",
      teal200: "#d9ece6",
      teal300: "#a3f2dc",
      teal400: "#55e4be",
      teal500: "#447467",
      teal600: "#34584f",
    },
  },
  borderRadii: {
    default: 2,
  },
  boxShadow: {
    depth0: "none",
    depth1: "0 0 1rem -0.5rem #808080",
    depth2: "0 0 1rem #808080",
  },
  typography: {
    // fontFamily: "Ostrich Sans Black",
    fontFamily: "Lato, Montserrat, Helvetica Neue, Helvetica, sans-serif",
    fontSize: 18,
    fontWeightLight: 400,
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    fontWeightBold: 700,

    subtitle2: {
      fontSize: "14px",
      color: "#737373",
    },
    h1: {
      fontSize: "42px",
      fontFamily: "Ostrich Sans Black",
      color: "Black",
      fontWeight: 400,
      lineHeight: "50px",
    },
    h2: {
      fontSize: "42px",
      color: "#FDC114",
      fontWeight: 400,
      lineHeight: "50px",
    },
    h3: {
      fontSize: "36px",
      color: "#000000",
      lineHeight: "43px",
      fontFamily: "Ostrich Sans Black",
      fontWeight: 900,
      fontStyle: "normal",
    },

    h4: {
      fontSize: "24px",
      color: "#333333",
      fontWeight: 400,

      fontFamily: "Lato",
      fontStyle: "normal",

      lineHeight: "29px",
    },
    h5: {
      fontSize: "16px",
      color: "#000000",
      fontFamily: "Lato",
      fontStyle: "normal",
      fontWeight: 400,
      weight: 100,
      lineHeight: "19px",
      cursor: "pointer",
    },
    h6: {
      fontSize: "20px",
      color: "#333333",
      fontFamily: "Lato",
      fontWeight: 500,

      lineHeight: "24px",
      fontStyle: "normal",
    },
    body2: {
      fontSize: "14px",
      fontWeight: 400,
      color: "#595959",
    },
    subtitle1: {
      fontSize: "34px",
      color: "#333333",
      fontStyle: "Bold",
      weight: 100,
      fontFamily: "Lato",
      lineHeight: "41px",
    },
    body1: {
      fontSize: "30px",
      color: "#333333",

      fontStyle: "Black",
      lineHeight: "100%",
      fontFamily: "Ostrich Sans Black",
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1200,
        xl: 1920,
      },
    },
  },
});

export default theme;
