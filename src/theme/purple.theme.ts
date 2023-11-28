import { createTheme } from '@mui/material'
import { grey } from '@mui/material/colors'

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
    text: {
      primary: '#fff',
      secondary: '#CFD8DC',
      disabled: grey[500]
    },
    error: {
      main: '#C62828'
    }
  }
})
