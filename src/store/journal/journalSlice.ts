import { createSlice } from '@reduxjs/toolkit'
import { type Note } from '../../journal/interfaces/note'
import { type JournalStore } from '../appStore'

export const journalSlice = createSlice({
  name: 'journal',
  initialState: {
    isSaving: false,
    messageSaved: '',
    notes: [],
    activeNote: {
      id: '',
      title: '',
      content: '',
      createdAt: '',
      updatedAt: '',
      images: []
    }
  },
  reducers: {
    addNewNote: (state: JournalStore, { payload }: { payload: { note: Note } }) => {
      state.isSaving = false
      state.notes.push(payload.note)
      state.messageSaved = 'Note added successfully'
    },
    setActiveNote: (state: JournalStore, { payload }: { payload: Note }) => {
      state.activeNote = payload
    },
    setSaving: (state: JournalStore) => {
      state.isSaving = true
      state.messageSaved = ''
    },
    setNotes: (state, { payload }) => {
      state.notes = payload.notes
    },
    updateNote: (state: JournalStore, { payload }: { payload: Note }) => {
      state.messageSaved = 'Note updated successfully'
      state.notes = state.notes.map(note => {
        if (note.id === payload.id) {
          return payload
        }
        return note
      })
      state.isSaving = false
    },
    setImagesToActiveNote: (state: JournalStore, { payload }) => {
      state.activeNote.images = [...state.activeNote.images, ...payload]
      state.isSaving = false
    },
    clearJournalStore: (state: JournalStore) => {
      state.activeNote = {
        id: '',
        title: '',
        content: '',
        createdAt: '',
        updatedAt: '',
        images: []
      }
      state.isSaving = false
      state.messageSaved = ''
      state.notes = []
    },
    deleteNoteById: (state: JournalStore, { payload }) => {
      state.notes = state.notes.filter(note => note.id !== payload)
    }
  }
})

export const { addNewNote, setActiveNote, setNotes, setSaving, updateNote, deleteNoteById, setImagesToActiveNote, clearJournalStore } = journalSlice.actions
