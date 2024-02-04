import { uploadFile } from '../../src/helpers/upload-file'

describe('Test in upload file', () => {
  test('Should upload file correctly', async () => {
    const imgUrl = 'https://images.unsplash.com/photo-1481349518771-20055b2a7b24?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cmFuZG9tfGVufDB8fDB8fHww';
    const resp = await fetch(imgUrl);
    const blob = await resp.blob();
    const file = new File([blob], 'test.jpg', { type: blob.type });
    const url = await uploadFile(file)
    expect(typeof url.url).toBe('string')
  })

  // test('should return null', async () => {
  //   const file = new File([], 'test.jpg');
  //   const url = await uploadFile(file)
  //   expect(url).toThrow('Error uploading file')
  // })
})