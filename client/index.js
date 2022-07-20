import React from 'react';
import ReactDOM from 'react-dom/client';

import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material';
import App from './App.jsx';
import ColorThemeWrapper from './ColorThemeWrapper.jsx';

let theme = createTheme({
  typography: {
    h1: { fontSize: 72 },

    h2: { fontSize: 48 },

    h3: { fontSize: 36 },

    h4: { fontSize: 28 },

    h5: { fontSize: 22 },
  },
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#3D0240',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: '#E4DCE7',
      // dark: will be calculated from palette.secondary.main,
    },
    // Provide every color token (light, main, dark, and contrastText) when using
    // custom colors for props in Material UI's components.
    // Then you will be able to use it like this: `<Button color="custom">`
    custom: {
      light: '#E4DCE7',
      main: '#3D0240',
      dark: '#137083',
      contrastText: '#ffffff',
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

theme = responsiveFontSizes(theme);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);
