import { Google } from '@mui/icons-material'
import { Button, Grid, Link, TextField, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import AuthLayout from '../layout/AuthLayout'

export default function LoginPage (): JSX.Element {
  return (
    <AuthLayout
      pageTitle='Login'
    >
      <form>
          <Grid
            container
            gap={2}
          >
            <Grid item xs={12}>
              <TextField
                label='Email'
                type='email'
                variant='filled'
                fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label='Password'
                type='password'
                variant='filled'
                fullWidth />
            </Grid>

            <Grid
              container
              spacing={2}
              sx={{ mb: 2 }}
              justifyContent='center'
              alignItems='center'
            >
              <Grid
                item
                xs={12} md={6} lg={4}
              >
                <Button variant='contained' fullWidth >
                  Login
                </Button>
              </Grid>
              <Grid
                item
                xs={12} md={6} lg={4}
              >
                <Button variant='outlined' fullWidth >
                  <Google />
                  <Typography sx={{ ml: 1 }} >
                    Google
                  </Typography>
                </Button>
              </Grid>
            </Grid>

            <Grid container direction='row' justifyContent='end'>
              <Link
                component={ RouterLink }
                color='inherit'
                to='/auth/register'
              >
                  Crear una cuenta
              </Link>
            </Grid>
          </Grid>
        </form>
    </AuthLayout>
  )
}
