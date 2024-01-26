import { Link as RouterLink } from 'react-router-dom'
import AuthLayout from '../layout/AuthLayout'
import { Button, Grid, TextField, Link, Alert } from '@mui/material'
import useForm from '../../hooks/useForm'
import { useMemo, type FormEventHandler } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { registerWithEmail } from '../../store/auth/thunks'
import { type AnyAction } from '@reduxjs/toolkit'
import { type AppStore, type AuthStore } from '../../store/appStore'

const defaultValue = {
  displayName: '',
  email: '',
  password: ''
}

const formValidations = {
  email: [(value: string) => value.includes('@'), 'Email must contain @'],
  displayName: [(value: string) => value.length >= 3, 'Name must be at least 3 characters'],
  password: [(value: string) => value.length >= 6, 'Password must be at least 6 characters']
}

export default function RegisterPage (): JSX.Element {
  const dispatch = useDispatch()
  const { status, errorMessage } = useSelector<AppStore, AuthStore>(state => state.auth)

  const {
    displayName,
    email,
    password,
    onInputChange,
    isValid, displayNameValid, emailValid, passwordValid,
    isTouched, displayNameTouched, emailTouched, passwordTouched
  } = useForm(defaultValue, formValidations)

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    dispatch(registerWithEmail(email, password, displayName) as unknown as AnyAction)
  }

  const isCheckingAuthentication = useMemo(() => status === 'checking', [status])

  return (
    <AuthLayout pageTitle='Register'>
      <form onSubmit={handleSubmit}>
        <Grid container gap={2}>
          <Grid item xs={12}>
            <TextField
              label='Name'
              name='displayName'
              type='text'
              fullWidth
              variant='filled'
              onChange={onInputChange}
              defaultValue={displayName}
              error={displayNameValid !== null && displayNameTouched}
              helperText={displayNameTouched === true ? displayNameValid : ''}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='Email'
              name='email'
              type='email'
              fullWidth
              variant='filled'
              onChange={onInputChange}
              defaultValue={email}
              error={emailValid !== null && emailTouched}
              helperText={emailTouched === true ? emailValid : ''}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='Password'
              name='password'
              type='password'
              fullWidth
              variant='filled'
              onChange={onInputChange}
              defaultValue={password}
              error={passwordValid !== null && passwordTouched}
              helperText={passwordTouched === true ? passwordValid : ''}
            />
          </Grid>
          <Grid
            container
            direction='row'
            justifyContent='center'
            display={errorMessage !== null ? '' : 'none'}
          >
            <Alert severity='error' sx={{ width: '100%' }}>
              {errorMessage}
            </Alert>
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
              disabled={(isValid === false && isTouched === false) || isCheckingAuthentication}
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
