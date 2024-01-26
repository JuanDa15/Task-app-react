import { type AnyAction } from '@reduxjs/toolkit'
import { type Dispatch } from 'react'
import { type AppStore } from '../appStore'
import { type NoteImage, type Note, type NoteDTO } from '../../journal/interfaces/note'
import { addNewNote, deleteNoteById, setActiveNote, setImagesToActiveNote, setNotes, setSaving, updateNote } from './journalSlice'
import { setLoading } from '../ui/uiSlice'
import { createNoteInFirebase, deleteNoteInFirebase, getNotesFromFirebase, updateNoteInFirebase } from '../../firebase/journal-providers'
import { uploadFile } from '../../helpers/upload-file'
import { deleteFile } from '../../helpers/delete-file'

export const startNewNote = () => {
  return async (
    dispatch: Dispatch<AnyAction>,
    getState: () => AppStore
  ) => {
    dispatch(setLoading({ loading: true }))
    dispatch(setSaving())

    const { uid = null } = getState().auth
    if (uid === null) throw new Error('No ID provided')

    const note: NoteDTO = {
      content: 'Este contenido es xd',
      createdAt: new Date(),
      images: [],
      title: 'Tarea ' + Math.floor(Math.random() * 10),
      updatedAt: new Date()
    }

    const uploadedNote = await createNoteInFirebase(uid, note)
    dispatch(addNewNote({ note: uploadedNote }))
    dispatch(setActiveNote(uploadedNote))
    dispatch(setLoading({ loading: false }))
  }
}

export const loadNotes = () => {
  return async (
    dispatch: Dispatch<AnyAction>,
    getState: () => AppStore
  ) => {
    dispatch(setLoading({ loading: true }))
    const { uid = null } = getState().auth
    if (uid === null) throw new Error('No ID provided')

    const notes = await getNotesFromFirebase(uid)

    dispatch(setNotes({ notes: [...notes] }))
    dispatch(setLoading({ loading: false }))
  }
}

export const startNoteUpdate = () => {
  return async (
    dispatch: Dispatch<AnyAction>,
    getState: () => AppStore
  ) => {
    dispatch(setSaving())
    dispatch(setLoading({ loading: true }))

    const { uid = null } = getState().auth
    const { activeNote: note } = getState().journal
    const noteId = note?.id ?? ''

    if (uid === null) throw new Error('No ID provided')
    if (note === null) throw new Error('No note provided')
    if (noteId.length === 0) throw new Error('No ID provided')

    const noteDTO: Partial<NoteDTO> = {
      content: note.content,
      title: note.title,
      updatedAt: new Date(),
      images: [...note.images]
    }

    await updateNoteInFirebase(uid, noteId, noteDTO)

    const updatedNote: Note = {
      ...note,
      updatedAt: (noteDTO.updatedAt ?? new Date()).toUTCString()
    }

    dispatch(updateNote(updatedNote))
    dispatch(setActiveNote(updatedNote))
    dispatch(setLoading({ loading: false }))
  }
}
export const uploadNoteFiles = (files: FileList) => {
  return async (
    dispatch: Dispatch<AnyAction>
  ) => {
    dispatch(setSaving())
    dispatch(setLoading({ loading: true }))

    const promisesArr: Array<Promise<any>> = []
    Array.from(files).forEach(file => {
      promisesArr.push(uploadFile(file))
    })

    const images = await Promise.all(promisesArr).catch(err => {
      console.log(err)
      dispatch(setLoading({ loading: false }))
    })

    dispatch(setImagesToActiveNote(images))
    dispatch(startNoteUpdate() as unknown as AnyAction)

    dispatch(setLoading({ loading: false }))
  }
}

export const deleteNote = () => {
  return async (
    dispatch: Dispatch<AnyAction>,
    getState: () => AppStore
  ) => {
    dispatch(setLoading({ loading: true }))
    dispatch(setSaving())

    const { uid = null } = getState().auth
    const { activeNote: note } = getState().journal
    const noteId = note?.id ?? ''
    if (uid === null) throw new Error('No ID provided')
    if (note === null) throw new Error('No note provided')
    if (noteId.length === 0) throw new Error('No ID provided')

    // const deleteImagesProm: Array<Promise<any>> = []
    // note.images.forEach(image => {
    //   deleteImagesProm.push(deleteFile(image.id))
    // })

    // await Promise.all(deleteImagesProm).catch((err: any) => {
    //   dispatch(setLoading({ loading: false }))
    //   console.log(err)
    // })

    await deleteNoteInFirebase(uid, noteId)
    dispatch(deleteNoteById(noteId))
    dispatch(setLoading(false))
  }
}
