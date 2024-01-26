export async function deleteFile(fileId: string): Promise<any> {
  if (fileId.length === 0) throw new Error('No id provided to delete')
  const API_KEY = '863243686962824'
  const API = 'lMgNnqUNi8kjquianP_v9iUTc8Y'
  const CLOUD_NAME = 'dqc8muufg'
  const url = `https://${API_KEY}:${API}@api.cloudinary.com/v1_1/${CLOUD_NAME}/resources/image/upload?public_ids=${fileId}`

  try {
    const resp = await fetch(url, {
      method: 'DELETE'
    })

    if (!resp.ok) throw new Error('Error deleting file')

    return {
      ok: true
    }
  } catch (error) {
    console.log(error)
  }
}
