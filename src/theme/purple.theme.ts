import { createTheme } from '@mui/material'
import { grey, purple } from '@mui/material/colors'

const primary = '#AB47BC'
const secondary = '#BA68C8'

export const purpleTheme = createTheme({
  palette: {
    primary: {
      main: primary
    },
    secondary: {
      main: secondary
    },
    grey: {
      800: grey[800]
    },
    background: {
      paper: '#263238',
      default: '#37474F'
    },
    action: {
      active: grey[50]
    },
    text: {
      primary: purple[50],
      secondary: purple[100],
      disabled: grey[500]
    },
    error: {
      main: '#C62828'
    }
  },
  components: {
    MuiIcon: {
      styleOverrides: {
        root: {
        }
      }
    }
  }
})
