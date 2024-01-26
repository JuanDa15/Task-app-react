import { type NoteImage } from '../journal/interfaces/note'

export async function uploadFile(file: File): Promise<NoteImage> {
  const url = 'https://api.cloudinary.com/v1_1/dqc8muufg/upload'

  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', 'react-journal')

  try {
    const resp = await fetch(url, {
      method: 'POST',
      body: formData
    })
    if (!resp.ok) throw new Error('Error uploading file')

    const cloudinaryResp = await resp.json()
    return {
      url: cloudinaryResp.secure_url,
      id: cloudinaryResp.public_id,
      width: cloudinaryResp.width,
      height: cloudinaryResp.height
    }
  } catch (error) {
    throw new Error('Error uploading file')
  }
}
