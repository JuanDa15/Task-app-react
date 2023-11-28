import { Link as RouterLink } from 'react-router-dom'
import AuthLayout from '../layout/AuthLayout'
import { Button, Grid, TextField, Link } from '@mui/material'

export default function RegisterPage (): JSX.Element {
  return (
    <AuthLayout pageTitle='Register'>
      <form>
        <Grid container gap={2}>
          <Grid item xs={12}>
            <TextField
              label='Name'
              type='text'
              fullWidth
              variant='filled'
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='Email'
              type='email'
              fullWidth
              variant='filled'
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='Password'
              type='password'
              fullWidth
              variant='filled'
            />
          </Grid>
          <Grid
            container
            direction='row'
            justifyContent='center'
          >
            <Button
              type='submit'
              variant='contained'
              fullWidth
            >
              Create account
            </Button>
          </Grid>
          <Grid container direction={'row'} justifyContent='end'>
            <Link
              component={RouterLink}
              to='/auth/login'
            >
              Already have an account ?
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  )
}
