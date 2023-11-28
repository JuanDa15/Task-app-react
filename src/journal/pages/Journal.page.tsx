import { IconButton } from '@mui/material'
import JournalLayout from '../Layout/JournalLayout'
import NoteView from '../views/Note.view'
import { Add } from '@mui/icons-material'
// importAdd,  NothingSelectedView from '../views/NothingSelected.view'

export default function JournalPage (): JSX.Element {
  return (
    <JournalLayout>
      {/* <NothingSelectedView /> */}
      <NoteView />

      <IconButton
        size='large'
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': { backgroundColor: 'error.main', opacity: 0.8 },
          position: 'fixed',
          right: 50,
          bottom: 50
        }}
      >
        <Add />
      </IconButton>
    </JournalLayout>
  )
}
