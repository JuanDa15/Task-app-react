import { Grid, Typography } from '@mui/material'
import { type PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {
  pageTitle: string
}

export default function AuthLayout ({
  children,
  pageTitle
}: Props): JSX.Element {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        minHeight: '100vh',
        backgroundColor: 'primary.main',
        padding: 4
      }}
    >
      <Grid
        item
        xs={3}
        sx={{
          backgroundColor: 'white',
          padding: 3,
          borderRadius: 2,
          width: { md: 450 }
        }}
      >
        <Typography variant='h3' sx={{
          mb: 1,
          textAlign: 'center'
        }}>
          {pageTitle}
        </Typography>

        { children }
      </Grid>
    </Grid>
  )
}
