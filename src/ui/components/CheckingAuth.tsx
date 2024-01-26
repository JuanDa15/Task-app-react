import { CircularProgress, Grid } from '@mui/material'

export default function CheckingAuth (): JSX.Element {
  return (
    <Grid
      container
      direction='column'
      alignItems='center'
      justifyContent='center'
      spacing={0}
      sx={{ minHeight: '100vh', backgroundColor: 'primary.main', padding: 4 }}
    >
      <Grid
        container
        direction='row'
        justifyContent='center'
      >
        <CircularProgress color='warning' />
      </Grid>
    </Grid>
  )
}
