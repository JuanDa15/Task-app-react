export interface Note {
  id?: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
  images: NoteImage[]
}

export interface NoteDTO {
  title: string
  content: string
  createdAt: Date
  updatedAt: Date
  images: NoteImage[]
}

export interface NoteImage {
  url: string
  id: string
  width: number
  height: number
}
