import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth/authSlice'
import { uiSlice } from './ui/uiSlice'
import { journalSlice } from './journal/journalSlice'
import { type Note } from '../journal/interfaces/note'
export type AuthStatus = 'not-authenticated' | 'authenticated' | 'checking'

export interface AppStore {
  auth: AuthStore
  ui: UiStore
  journal: JournalStore
}

export interface UiStore {
  loading: boolean
}

export interface AuthStore {
  status: AuthStatus
  uid: string | null
  email: string | null
  displayName: string | null
  photoURL: string | null
  errorMessage: null | string
}

export interface JournalStore {
  isSaving: boolean
  messageSaved: string
  notes: Note[]
  activeNote: Note
}

const appStore = configureStore({
  reducer: {
    auth: authSlice.reducer,
    ui: uiSlice.reducer,
    journal: journalSlice.reducer
  }
})

export default appStore
