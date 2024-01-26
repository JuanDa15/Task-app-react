import { collection, deleteDoc, doc, getDocs, setDoc } from 'firebase/firestore/lite'
import { type Note, type NoteDTO } from '../journal/interfaces/note'
import { firebaseDb } from '../firebase/config'
import { convertDocToNote } from '../helpers/convert-doc-to-note'

export async function createNoteInFirebase(uid: string, note: NoteDTO): Promise<Note> {
  const collectionRef = collection(firebaseDb, `${uid}/journal/notes`)

  const newDoc = doc(collectionRef)
  await setDoc(newDoc, note)

  const uploadedNote: Note = {
    ...note,
    createdAt: note.createdAt.toUTCString(),
    updatedAt: note.updatedAt.toUTCString(),
    id: newDoc.id
  }

  return uploadedNote
}

export async function getNotesFromFirebase(uid: string): Promise<Note[]> {
  const notes: Note[] = []
  const collectionRef = collection(firebaseDb, `${uid}/journal/notes`)
  const docs = await getDocs(collectionRef)

  docs.forEach(doc => {
    notes.push(
      convertDocToNote(doc)
    )
  })

  return notes
}

export async function updateNoteInFirebase(
  uid: string,
  noteID: string,
  note: Partial<NoteDTO>
): Promise<void> {
  const docPath = `${uid}/journal/notes/${noteID}`
  const docRef = doc(firebaseDb, docPath)
  await setDoc(docRef, note, { merge: true })
}

export async function deleteNoteInFirebase(uid: string, noteID: string): Promise<void> {
  const docPath = `${uid}/journal/notes/${noteID}`
  const docRef = doc(firebaseDb, docPath)
  await deleteDoc(docRef)
}
