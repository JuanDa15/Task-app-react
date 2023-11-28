import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import { purpleTheme } from '.'
import { type PropsWithChildren } from 'react'

export default function AppTheme ({ children }: PropsWithChildren): JSX.Element {
  return (
    <ThemeProvider theme={purpleTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
