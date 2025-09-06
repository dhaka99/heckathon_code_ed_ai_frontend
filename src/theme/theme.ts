import { createTheme } from "@mui/material/styles";
import "@fontsource/poppins/latin-400.css";
import "@fontsource/poppins/latin-500.css";
import "@fontsource/poppins/latin-600.css";
import "@fontsource/poppins/latin-700.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1890DC",   // bright blue
      light: "#4AA9E5",
      dark: "#0F6FAF",
      "100": "#E6F5FC",
      "200": "#B3E1F6",
      "300": "#80CCF1",
      "400": "#4AA9E5",
      "500": "#1890DC",
      "600": "#0F6FAF",
      "700": "#0B527E",
      "800": "#063554",
    },
    secondary: {
      main: "#0F4575",   // deep navy blue
      light: "#31699B",
      dark: "#072A4A",
      "100": "#E6EFF6",
      "200": "#B3CBE0",
      "300": "#80A7CA",
      "400": "#4D83B4",
      "500": "#31699B",
      "600": "#0F4575",
      "700": "#072A4A",
      "800": "#04182A",
    },
    neutral: {
      main: "#FFFFFF",   // white
      "100": "#FFFFFF",
      "200": "#F7F7F7",
      "300": "#E1E1E1",
      "400": "#CFCFCF",
      "500": "#A0A0A0",
      "600": "#707070",
      "700": "#404040",
      "800": "#1A1A1A",
    },
    
    success: {
      main: "#49B847",
      "50": "rgba(73, 184, 71, 0.5)",
      "100": "#F3FEF3",
      "200": "#CFFCCF",
      "300": "#5CE45A",
      "400": "#49B847",
      "500": "#378E35",
      "600": "#256624",
      "700": "#154114",
      "800": "#062006",
    },
    warning: {
      main: "#FFAD0D",
      "50": "rgba(255, 173, 13, 0.5)",
      "100": "#FFF7F1",
      "200": "#FFE0C6",
      "300": "#FFAD0D",
      "400": "#CD8A00",
      "500": "#9C6800",
      "600": "#6E4800",
      "700": "#432A00",
      "800": "#1C0F00",
    },
    error: {
      main: "#F64C4C",
      "50": "rgba(246, 76, 76, 0.5)",
      "100": "#FEF2F2",
      "200": "#FBCCCC",
      "300": "#F89494",
      "400": "#F64C4C",
      "500": "#C71F1F",
      "600": "#891212",
      "700": "#4F0606",
      "800": "#2B0202",
    },
    info: {
      main: "#3B82F6",
      "100": "#FBFBFF",
      "200": "#EDF0FE",
      "300": "#C4D1FC",
      "400": "#8AA9F9",
      "500": "#3B82F6",
      "600": "#1E5FBD",
      "700": "#113E80",
      "800": "#052048",
    },
    
  },
  typography: {
    fontFamily: "'Poppins', Roboto",

    h1: {
      fontSize: "2.25rem",
      fontWeight: 400,
      lineHeight: 1.5,
    },
    h1Medium: {
      fontSize: "2.25rem",
      fontWeight: 500,
      lineHeight: 1.5,
      fontFamily: "'Poppins', Roboto",
    },
    h1Bold: {
      fontSize: "2.25rem",
      fontWeight: 700,
      lineHeight: 1.5,
      fontFamily: "'Poppins', Roboto",
    },

    h2: {
      fontSize: "1.5rem",
      fontWeight: 400,
      lineHeight: 1.5,
      fontFamily: "'Poppins', Roboto",
    },
    h2Medium: {
      fontSize: "1.5rem",
      fontWeight: 500,
      lineHeight: 1.5,
      fontFamily: "'Poppins', Roboto",
    },
    h2Bold: {
      fontSize: "1.5rem",
      fontWeight: 700,
      lineHeight: 1.5,
      fontFamily: "'Poppins', Roboto",
    },

    h3: {
      fontSize: "1.25rem",
      fontWeight: 400,
      lineHeight: 1.5,
      fontFamily: "'Poppins', Roboto",
    },
    h3Medium: {
      fontSize: "1.25rem",
      fontWeight: 500,
      lineHeight: 1.5,
      fontFamily: "'Poppins', Roboto",
    },
    h3Bold: {
      fontSize: "1.25rem",
      fontWeight: 700,
      lineHeight: 1.5,
      fontFamily: "'Poppins', Roboto",
    },

    body1: {
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: 1.5,
      fontFamily: "'Poppins', Roboto",
    },
    body1Medium: {
      fontSize: "1rem",
      fontWeight: 500,
      lineHeight: 1.5,
      fontFamily: "'Poppins', Roboto",
    },
    body1SemiBold: {
      fontSize: "1rem",
      fontWeight: 600,
      lineHeight: 1.5,
      fontFamily: "'Poppins', Roboto",
    },
    body1Bold: {
      fontSize: "1rem",
      fontWeight: 700,
      lineHeight: 1.5,
      fontFamily: "'Poppins', Roboto",
    },

    body2: {
      fontSize: "0.875rem",
      fontWeight: 400,
      lineHeight: 1.5,
      fontFamily: "'Poppins', Roboto",
    },
    body2Medium: {
      fontSize: "0.875rem",
      fontWeight: 500,
      lineHeight: 1.5,
      fontFamily: "'Poppins', Roboto",
    },
    body2SemiBold: {
      fontSize: "0.875rem",
      fontWeight: 600,
      lineHeight: 1.5,
      fontFamily: "'Poppins', Roboto",
    },
    body2Bold: {
      fontSize: "0.875rem",
      fontWeight: 700,
      lineHeight: 1.5,
      fontFamily: "'Poppins', Roboto",
    },

    caption1: {
      fontSize: "12px",
      fontWeight: 400,
      lineHeight: 1.5,
      fontFamily: "'Poppins', Roboto",
    },
    caption1Medium: {
      fontSize: "12px",
      fontWeight: 500,
      lineHeight: 1.5,
      fontFamily: "'Poppins', Roboto",
    },
    caption1Bold: {
      fontSize: "12px",
      fontWeight: 700,
      lineHeight: 1.5,
      fontFamily: "'Poppins', Roboto",
    },

    caption2: {
      fontSize: "12px",
      fontWeight: 400,
      lineHeight: 1.5,
      fontFamily: "'Poppins', Roboto",
      fontStyle: "italic",
    },

    caption2Bold: {
      fontSize: "12px",
      fontWeight: 700,
      lineHeight: 1.5,
      fontFamily: "'Poppins', Roboto",
      fontStyle: "italic",
    },

    supportingText: {
      fontSize: "10px",
      fontWeight: 400,
      lineHeight: 1.5,
      fontFamily: "'Poppins', Roboto",
    },
    supportingTextMedium: {
      fontSize: "10px",
      fontWeight: 500,
      lineHeight: 1.5,
      fontFamily: "'Poppins', Roboto",
    },
    supportingTextBold: {
      fontSize: "10px",
      fontWeight: 700,
      lineHeight: 1.5,
      fontFamily: "'Poppins', Roboto",
    },
  },

  components: {
    MuiButton: {},
    MuiCssBaseline: {
      styleOverrides: (theme) => ({
        "::-webkit-scrollbar": {
          width: "6px",
          height: "6px",
        },
        "::-webkit-scrollbar-track": {
          borderRadius: "12px",
          background: "transparent",
          transition: "all 0.3s ease-in-out",
        },
        "::-webkit-scrollbar-thumb": {
          borderRadius: "12px",
          background: "transparent",
          transition: "all 0.3s ease-in-out",
        },

        "*:hover::-webkit-scrollbar-track": {
          background: theme.palette.primary[200],
        },
        "*:hover::-webkit-scrollbar-thumb": {
          background: theme.palette.primary.main,
        },
      }),
    },
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1Bold: "h1",
          h1Medium: "h1",
          h2Bold: "h2",
          h2Medium: "h2",
          h3Medium: "h3",
          h3Bold: "h3",
          body1Medium: "p",
          body1Bold: "p",
          body2Medium: "p",
          body2Bold: "p",
          caption1: "p",
          caption1Medium: "p",
          caption1Bold: "p",
          caption2: "p",
          caption2Bold: "p",
          supportingText: "p",
          supportingTextMedium: "p",
          supportingTextBold: "p",
          body1SemiBold: "p",
          body2SemiBold: "p",
        },
      },
    },
  },
});

export default theme;
