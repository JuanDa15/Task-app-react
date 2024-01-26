import { ImageList, ImageListItem } from '@mui/material'
import { useSelector } from 'react-redux'
import { type AppStore, type JournalStore } from '../../store/appStore'
import { getRandomNumber } from '../../helpers/random-number'

interface Props {
  images: string[]
}
export default function ImageGallery ({ images }: Props): JSX.Element {
  const { activeNote } = useSelector<AppStore, JournalStore>(state => state.journal)

  return (
    <ImageList
      sx={{ width: 800, height: 500 }}
      variant='standard'
      cols={4}
      rowHeight={164}
    >
      {activeNote.images.map((img) => (
        <ImageListItem
          key={img.id}
        >
          <img
            {...srcset(img.url, img.width, img.height)}
            alt={img.id}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  )
}

function srcset (image: string, width: number, height: number): Record<string, string> {
  return {
    src: `${image}?w=${width}&h=${height}&fit=crop&auto=format`,
    srcSet: `${image}?w=${width}&h=${height
    }&fit=crop&auto=format&dpr=2 2x`
  }
}
