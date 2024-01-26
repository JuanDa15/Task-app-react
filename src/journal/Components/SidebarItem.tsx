import { TurnedInNot } from '@mui/icons-material'
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { type Note } from '../interfaces/note'
import { useDispatch } from 'react-redux'
import { setActiveNote } from '../../store/journal/journalSlice'

interface Props {
  note: Note
}

export default function SidebarItem ({ note }: Props): JSX.Element {
  const dispatch = useDispatch()

  const handleClick = (note: Note): void => {
    dispatch(setActiveNote(note))
  }

  return (
    <ListItem disablePadding onClick={ () => { handleClick(note) }}>
      <ListItemButton>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container sx={{
          width: '151px',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          color: 'white'
        }}>
          <ListItemText primary={note.title}/>
          <ListItemText secondary={note.content} />
        </Grid>
      </ListItemButton>
    </ListItem>
  )
}
