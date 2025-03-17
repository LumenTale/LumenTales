import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#0066FF',
      light: '#3385FF',
      dark: '#0052CC',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#6699FF',
      light: '#85ADFF',
      dark: '#527ACC',
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#FF4D4D',
    },
    warning: {
      main: '#FFAD33',
    },
    info: {
      main: '#33B5FF',
    },
    success: {
      main: '#4CAF50',
    },
    background: {
      default: '#F8F9FA',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Merriweather", serif',
      fontWeight: 700,
    },
    h2: {
      fontFamily: '"Merriweather", serif',
      fontWeight: 700,
    },
    h3: {
      fontFamily: '"Merriweather", serif',
      fontWeight: 700,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
          borderRadius: 12,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: 12,
        },
      },
    },
  },
}); 