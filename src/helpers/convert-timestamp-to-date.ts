import { type Timestamp } from 'firebase/firestore/lite'

export function convertTimestampToDate(timestamp: Timestamp): Date {
  const seconds = timestamp.seconds
  const nanoseconds = timestamp.nanoseconds / 1e9
  return new Date(seconds * 1000 + nanoseconds * 1000000)
}
