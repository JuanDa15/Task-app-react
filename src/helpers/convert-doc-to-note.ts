import { type DocumentData, type QueryDocumentSnapshot } from 'firebase/firestore/lite'
import { type Note } from '../journal/interfaces/note'
import { convertTimestampToDate } from './convert-timestamp-to-date'

export function convertDocToNote(
  doc: QueryDocumentSnapshot<DocumentData, DocumentData>
): Note {
  const cast = doc.data()
  const note: Note = {
    id: doc.id,
    content: cast.content,
    createdAt: convertTimestampToDate(cast.createdAt).toUTCString(),
    updatedAt: convertTimestampToDate(cast.updatedAt).toUTCString(),
    images: cast.images,
    title: cast.title
  }
  return note
}
