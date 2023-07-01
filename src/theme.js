import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

// color design tokens export
export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
        // #8999EE
        // #B9AAED
        // #42A5F5
        // #72AEF4

        grey: {
          100: "#141414",
          200: "#141414",
          300: "#141414",
          400: "#141414",
          500: "#141414",
          600: "#141414",
          700: "#141414",
          800: "#141414",
          900: "#1b1216",
        },
        primary: {
          100: "#d1d9e0",
          200: "#a3b3c0",
          300: "#768ea1",
          400: "#486881",
          500: "#1a4262",
          600: "#15354e",
          700: "#10283b",
          800: "#0a1a27",
          900: "#050d14",
        },

        greenAccent: {
          //purple
          100: "#141414",
          200: "#141414",
          300: "#141414",
          400: "#141414",
          500: "#141414",
          600: "#141414",
          700: "#141414",
          800: "#141414",
          900: "#1b1216",
        },
      }
    : {
        grey: {
          100: "#e7dee2",
          200: "#e7dee2",
          300: "#e7dee2",
          400: "#e7dee2",
          500: "#666666",
          600: "#858585",
          700: "#a3a3a3",
          800: "#c2c2c2",
          900: "#e0e0e0",
        },

        primary: {
          100: "#f1eefb",
          200: "#e3ddf8",
          300: "#d5ccf4",
          400: "#c7bbf1",
          500: "#b9aaed",
          600: "#9488be",
          700: "#6f668e",
          800: "#4a445f",
          900: "#25222f",
        },
        greenAccent: {
          100: "#e7dee2",
          200: "#cebcc5",
          300: "#b69ba9",
          400: "#e7dee2",
          500: "#e7dee2",
          600: "#e7dee2",
          700: "#e7dee2",
          800: "#e7dee2",
          900: "#e7dee2",
        },
        grey: {
          100: "#faf8f9",
          200: "#f5f2f3",
          300: "#f1ebee",
          400: "#ece5e8",
          500: "#e7dee2",
          600: "#b9b2b5",
          700: "#8b8588",
          800: "#5c595a",
          900: "#2e2c2d",
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
              main: colors.grey[200],
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
              main: colors.grey[200],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: "#b9aaed",
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
