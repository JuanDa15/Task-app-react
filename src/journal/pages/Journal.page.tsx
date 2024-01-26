import { IconButton } from '@mui/material'
import JournalLayout from '../layout/JournalLayout'
import NoteView from '../views/Note.view'
import { Add } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { startNewNote } from '../../store/journal/thunks'
import { type AnyAction } from '@reduxjs/toolkit'
import { type AppStore, type JournalStore } from '../../store/appStore'
import NothingSelectedView from '../views/NothingSelected.view'

export default function JournalPage (): JSX.Element {
  const dispatch = useDispatch()
  const { isSaving, activeNote } = useSelector<AppStore, JournalStore>(state => state.journal)
  const handleClick = (): void => {
    dispatch(startNewNote() as unknown as AnyAction)
  }

  return (
    <JournalLayout>
      {
        activeNote !== null
          ? <NoteView />
          : <NothingSelectedView />
      }

      <IconButton
        disabled={isSaving}
        onClick={handleClick}
        size='large'
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': { backgroundColor: 'error.main', opacity: 0.8 },
          position: 'fixed',
          right: 50,
          bottom: 50,
          ':disabled': {
            opacity: 0.5
          }
        }}
      >
        <Add />
      </IconButton>
    </JournalLayout>
  )
}
