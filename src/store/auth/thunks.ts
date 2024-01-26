import { type AnyAction, type Dispatch } from '@reduxjs/toolkit'
import { checkingCredentials, login, logout } from './authSlice'
import { registerUserWithEmail, signInWithEmail, signInWithGoogle, signOutFirebase } from '../../firebase/auth-providers'
import { setLoading } from '../ui/uiSlice'
import { clearJournalStore } from '../journal/journalSlice'

export const startGoogleSignIn = () => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(setLoading({ loading: true }))
    dispatch(checkingCredentials())
    const { ok, ...others }: any = await signInWithGoogle()

    if (ok === false) dispatch(logout(others))
    if (ok === true) dispatch(login(others))
    dispatch(setLoading({ loading: false }))
  }
}

export const registerWithEmail = (email: string, password: string, displayName: string) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(setLoading({ loading: true }))
    dispatch(checkingCredentials())

    const { ok, ...others } = await registerUserWithEmail(email, password, displayName)

    if (ok === false) dispatch(logout(others))
    if (ok === true) dispatch(login(others))

    dispatch(setLoading({ loading: false }))
  }
}

export const loginWithEmailPassword = (email: string, password: string) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(setLoading({ loading: true }))
    dispatch(checkingCredentials())

    const { ok, ...others } = await signInWithEmail(email, password)

    if (ok === false) dispatch(logout(others))
    if (ok === true) dispatch(login(others))

    dispatch(setLoading({ loading: false }))
  }
}

export const logoutUser = () => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(setLoading({ loading: true }))
    const { ok, ...others } = await signOutFirebase()

    if (ok === true) {
      dispatch(clearJournalStore())
      dispatch(logout({
        errorMessage: null
      }))
    } else {
      dispatch(logout({
        errorMessage: others.errorMessage
      }))
    }
    dispatch(setLoading({ loading: false }))
  }
}
