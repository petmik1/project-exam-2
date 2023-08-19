import { createTheme } from '@mui/material'

const primary = '#00679F'
const secondary = '#DAE6EF'
const danger = '#EC6554'
const success = '#459F58'
const text = '#101010'
const white = '#FFFFFF'

const theme = createTheme({
  palette: {
    background: {
      default: primary,
    },
    common: {
      black: text,
    },
    primary: {
      main: primary,
    },
    secondary: {
      main: secondary,
    },
    danger: {
      main: danger,
    },
    success: {
      main: success,
    },
  },

  typography: {
    fontFamily: 'crimson-text',
    h1: {
      fontSize: '2rem',
      fontWeight: '700',
      color: text,
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: '600',
      color: text,
    },
    body1: {
      fontSize: '1.25rem',
      fontWeight: '400',
      color: text,
    },
    body2: {
      fontSize: '1.25rem',
      fontWeight: '400 ',
      color: text,
    },
  },

  components: {
    body: {
      styleOverrides: {
        root: {
          backgroundColor: secondary,

        },
      },
    },
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          color: white,
          backgroundColor: success,
          fontSize: '1.25rem',
          '&:hover': {
            backgroundColor: success,
            opacity: 0.8,
          },
        },
      },
    },

    MuiContainer: {
      styleOverrides: {
        root: {
          height: '100vh',
          backgroundColor: secondary,
          borderRadius: '0',
          '@media (min-width:1200px)': {
            borderRadius: '20px',
          }

        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
          backgroundColor: white,
        },
        notchedOutline: {
          borderColor: primary,
          borderWidth: '3px',
        }, 
        
      },
    },

      }
    }
  )

export default theme
