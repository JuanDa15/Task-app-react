import { Box, Toolbar } from '@mui/material'
import { type PropsWithChildren } from 'react'
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'

const drawerWidth = 240

export default function JournalLayout ({
  children
}: PropsWithChildren): JSX.Element {
  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar drawerWidth={drawerWidth}/>
      <Sidebar drawerWidth={drawerWidth} />
      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        { children }
      </Box>
    </Box>
  )
}
