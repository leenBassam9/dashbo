import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

// color design tokens export
export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
        grey: {
          100: "#e7dee2",
          200: "#cebcc5",
          300: "#b69ba9",
          400: "#9d798c",
          500: "#85586f",
          600: "#6a4659",
          700: "#503543",
          800: "#35232c",
          900: "#1b1216",
        },
        primary: {
          100: "#e7dee2",
          200: "#cebcc5",
          300: "#b69ba9",
          400: "#9d798c",
          500: "#85586f",
          600: "#6a4659",
          700: "#503543",
          800: "#35232c",
          900: "#1b1216",
        },
        greenAccent: {
          //purple
          100: "#e7dee2",
          200: "#cebcc5",
          300: "#b69ba9",
          400: "#9d798c",
          500: "#85586f",
          600: "#6a4659",
          700: "#503543",
          800: "#35232c",
          900: "#1b1216",
        },
        redAccent: {
          100: "#f8dcdb",
          200: "#f1b9b7",
          300: "#e99592",
          400: "#e2726e",
          500: "#db4f4a",
          600: "#af3f3b",
          700: "#832f2c",
          800: "#58201e",
          900: "#2c100f",
        },
        blueAccent: {
          100: "#d6d5d7",
          200: "#adabb0",
          300: "#858088",
          400: "#5c5661",
          500: "#332c39",
          600: "#29232e",
          700: "#1f1a22",
          800: "#141217",
          900: "#0a090b",
        },
      }
    : {
        grey: {
          100: "#141414",
          200: "#292929",
          300: "#3d3d3d",
          400: "#525252",
          500: "#666666",
          600: "#858585",
          700: "#a3a3a3",
          800: "#c2c2c2",
          900: "#e0e0e0",
        },
        primary: {
          100: "#fefbf9",
          200: "#fcf8f4",
          300: "#fbf4ee",
          400: "#f9f1e9",
          500: "#f8ede3",
          600: "#c6beb6",
          700: "#958e88",
          800: "#635f5b",
          900: "#322f2d",
        },
        greenAccent: {
          100: "#e7dee2",
          200: "#cebcc5",
          300: "#b69ba9",
          400: "#9d798c",
          500: "#85586f",
          600: "#6a4659",
          700: "#503543",
          800: "#35232c",
          900: "#1b1216",
        },

        blueAccent: {
          //purple
          100: "#e7dee2",
          200: "#cebcc5",
          300: "#b69ba9",
          400: "#9d798c",
          500: "#85586f",
          600: "#6a4659",
          700: "#503543",
          800: "#35232c",
          900: "#1b1216",
        },
      }),
});

// mui theme settings
export const themeSettings = (mode) => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              main: colors.primary[500],
            },
            secondary: {
              main: colors.greenAccent[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: colors.primary[500],
            },
          }
        : {
            // palette values for light mode
            primary: {
              main: colors.primary[100],
            },
            secondary: {
              main: colors.greenAccent[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: "#F8EDE3",
            },
          }),
    },
    typography: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};

// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState("dark");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return [theme, colorMode];
};
