import { StarOutline } from '@mui/icons-material'
import { Grid, Typography } from '@mui/material'

export default function NothingSelectedView (): JSX.Element {
  return (
    <Grid
      container
      spacing={0}
      direction='column'
      alignItems='center'
      justifyContent='center'
      sx={{
        minHeight: 'calc(100vh - 110px)',
        backgroundColor: 'primary.main',
        borderRadius: 5
      }}
    >
      <Grid item xs={12}>
        <StarOutline sx={{ fontSize: 100, color: 'white' }}/>
      </Grid>
      <Grid item xs={12}>
        <Typography color='white' variant='h5'>
          Select o create a note
        </Typography>
      </Grid>
    </Grid>
  )
}
