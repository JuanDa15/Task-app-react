import { useDispatch, useSelector } from 'react-redux'
import { type AuthStatus, type AppStore, type AuthStore } from '../store/appStore'
import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { firebaseAuth } from '../firebase/config'
import { login, logout } from '../store/auth/authSlice'
import { loadNotes } from '../store/journal/thunks'
import { type AnyAction } from '@reduxjs/toolkit'

export default function useAuthentication(): AuthStatus {
  const dispatch = useDispatch()
  const { status } = useSelector<AppStore, AuthStore>(state => state.auth)

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user === null) return dispatch(logout({}))

      const { displayName, email, photoURL, uid } = user
      dispatch(login({ displayName, email, photoURL, uid }))
      dispatch(loadNotes() as unknown as AnyAction)
    })
  }, [])
  return status
}
