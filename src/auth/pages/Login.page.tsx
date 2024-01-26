import { Google } from '@mui/icons-material'
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import AuthLayout from '../layout/AuthLayout'
import useForm from '../../hooks/useForm'
import { type FormEventHandler } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginWithEmailPassword, startGoogleSignIn } from '../../store/auth/thunks'
import { type AnyAction } from '@reduxjs/toolkit'
import { type AppStore, type AuthStore } from '../../store/appStore'

interface LoginForm {
  email: string
  password: string
}

const formBody = {
  email: '',
  password: ''
}
const formValidations = {
  email: [(value: string) => value.includes('@'), 'Email must contain @'],
  password: [(value: string) => value.length >= 6, 'Password must be at least 6 characters']
}

export default function LoginPage (): JSX.Element {
  const dispatch = useDispatch()

  const {
    status,
    errorMessage
  } = useSelector<AppStore, AuthStore>(state => state.auth)

  const {
    onInputChange,
    email, password, isValid
  } = useForm<LoginForm>(formBody, formValidations)

  const submitHandler: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    dispatch(loginWithEmailPassword(email, password) as unknown as AnyAction)
  }

  const handleGoogleSignIn = (): void => {
    dispatch(startGoogleSignIn() as unknown as AnyAction)
  }

  const isLoading = (): boolean => status === 'checking'

  return (
    <AuthLayout
      pageTitle='Login'
    >
      <form onSubmit={submitHandler}>
          <Grid
            container
            gap={2}
          >
            <Grid item xs={12}>
              <TextField
                onChange={onInputChange}
                value={email}
                name='email'
                label='Email'
                type='email'
                variant='filled'
                fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={onInputChange}
                defaultValue={password}
                name='password'
                label='Password'
                type='password'
                variant='filled'
                fullWidth />
            </Grid>

            <Grid
              container
              direction='row'
              justifyContent='center'
              display={((errorMessage?.length ?? 0) > 0) ? '' : 'none'}
            >
              <Alert severity='error' sx={{ width: '100%' }}>
                {errorMessage}
              </Alert>
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
                <Button
                  type='submit'
                  variant='contained'
                  fullWidth
                  disabled={isLoading() || (isValid === false)}
                >
                  Login
                </Button>
              </Grid>
              <Grid
                item
                xs={12} md={6} lg={4}
              >
                <Button
                  variant='outlined' fullWidth
                  onClick={handleGoogleSignIn}
                  disabled={isLoading()}
                >
                  <Google />
                  <Typography sx={{ ml: 1 }} >
                    Google
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
        <Grid container direction='row' justifyContent='end'>
          <Link
            component={ RouterLink }
            color='inherit'
            to='/auth/register'
          >
              Crear una cuenta
          </Link>
        </Grid>
    </AuthLayout>
  )
}
