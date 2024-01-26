import { Delete, SaveOutlined, UploadFile } from '@mui/icons-material'
import { Alert, Button, Grid, IconButton, Snackbar, TextField, Typography } from '@mui/material'
import ImageGallery from '../components/ImageGallery'
import { type UiStore, type AppStore, type JournalStore } from '../../store/appStore'
import { useDispatch, useSelector } from 'react-redux'
import useForm from '../../hooks/useForm'
import { type ChangeEventHandler, useEffect, useState, useRef } from 'react'
import { setActiveNote } from '../../store/journal/journalSlice'
import { deleteNote, startNoteUpdate, uploadNoteFiles } from '../../store/journal/thunks'
import { type AnyAction } from '@reduxjs/toolkit'

export default function NoteView (): JSX.Element {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [displayNotification, setDisplayNotification] = useState(false)
  const dispatch = useDispatch()
  const { activeNote, messageSaved } = useSelector<AppStore, JournalStore>(state => state.journal)
  const { loading } = useSelector<AppStore, UiStore>(state => state.ui)

  const {
    onInputChange,
    title,
    content,
    formState
  } = useForm(activeNote)

  useEffect(() => {
    dispatch(setActiveNote(formState))
  }, [formState])

  useEffect(() => {
    if (messageSaved.length > 0) {
      setDisplayNotification(true)
      setTimeout(() => {
        setDisplayNotification(false)
      }, 2000)
    }
  }, [messageSaved])

  const handleSave = (): void => {
    dispatch(startNoteUpdate() as unknown as AnyAction)
  }

  const onFileInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const target = event.target as HTMLInputElement
    const files = target.files
    if (files === null || files.length === 0) return
    dispatch(uploadNoteFiles(files) as unknown as AnyAction)
  }

  const handleDelete = (): void => {
    dispatch(deleteNote() as unknown as AnyAction)
  }

  return (
    <Grid
      container
      direction='row'
      justifyContent='space-between'
      sx={{ mb: 1 }}
    >
      <Grid container gap={1} >
        <input
          type='file'
          multiple
          onChange={onFileInputChange}
          hidden
          ref={fileInputRef}
        />
        <IconButton
          color='primary'
          disabled={loading}
          onClick={ () => fileInputRef?.current?.click()}>
          <UploadFile />
        </IconButton>
        <Button variant='outlined' onClick={handleSave} disabled={loading}>
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Guardar
        </Button>
        <Button
          variant='contained'
          color='error'
          onClick={handleDelete}
        >
          <Delete sx={{ fontSize: 30, mr: 1 }}/>
          Eliminar
        </Button>
      </Grid>
      <Grid container sx={{ margin: '1rem 0' }}>
        <Grid item>
          <Typography variant='caption'>
            Last Modified: <b><i>{activeNote?.updatedAt}</i></b>
          </Typography>
        </Grid>
      </Grid>
      <Grid container>
        <TextField
          type='text'
          variant='filled'
          fullWidth
          placeholder='Insert title'
          label='Title'
          name='title'
          onChange={onInputChange}
          value={title}
          sx={{ border: 'none', mb: 1 }}
        />
        <TextField
          type='text'
          variant='filled'
          fullWidth
          multiline
          name='content'
          onChange={onInputChange}
          value={content}
          placeholder='What happens today?'
          sx={{ border: 'none', mb: 1 }}
          minRows={5}
        />
        <ImageGallery images={activeNote?.images ?? []}/>
      </Grid>
      <Snackbar
        open={displayNotification}
        autoHideDuration={3000}
        message={messageSaved}
      >
        <Alert severity='success'>
          {messageSaved}
        </Alert>
      </Snackbar>
    </Grid>
  )
}
