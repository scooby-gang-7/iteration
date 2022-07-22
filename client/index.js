import React from 'react';
import ReactDOM from 'react-dom/client';

import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material';
import { CalendarPicker, LocalizationProvider, bgBG } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import bgLocale from 'date-fns/locale/bg';
import App from './App.jsx';



let theme = createTheme({
  typography:{
    spacing: 2,
    h1:{fontSize: '2rem',},
     h2:{fontSize:'1.5rem',},
     h3:{fontSize: '1.25rem',},
     h4:{fontSize: '1.125rem',},
     h5:{fontSize: '1rem',},
  },
  card: {
    m: 2,
    p: 2,
  },
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#309FC0',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: '#D4E5F2',
      // dark: will be calculated from palette.secondary.main,
    },
    // Provide every color token (light, main, dark, and contrastText) when using
    // custom colors for props in Material UI's components.
    // Then you will be able to use it like this: `<Button color="custom">`
    custom: {
      light: '#154d60',
      main: '#154d60',
      dark: '#154d60',
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



theme = responsiveFontSizes(theme);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <LocalizationProvider
    dateAdapter={AdapterDateFns}
    >

  <App />
  </LocalizationProvider>
  </ThemeProvider>
);
