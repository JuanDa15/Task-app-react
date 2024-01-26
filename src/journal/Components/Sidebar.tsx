import { Box, Divider, Drawer, List, Toolbar, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { type JournalStore, type AppStore, type AuthStore } from '../../store/appStore'
import SidebarItem from './SidebarItem'

interface Props {
  drawerWidth: number
}

export default function Sidebar ({
  drawerWidth
}: Props): JSX.Element {
  const { displayName } = useSelector<AppStore, AuthStore>(state => state.auth)
  const { notes } = useSelector<AppStore, JournalStore>(state => state.journal)
  return (
    <Box
      component='aside'
      sx={{
        width: { sm: `${drawerWidth}px` },
        flexShrink: { sm: 0 }
      }}
    >
      <Drawer
        variant='permanent'
        open={true}
        sx={{
          display: { xs: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth + 'px',
            borderRight: '1px solid primary.main'
          }
        }}
      >
        <Toolbar>
          <Typography variant='h6' noWrap display={((displayName?.length ?? 0) > 0) ? '' : 'none'}>
            {displayName}
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          {
            notes.map((note) =>
              <SidebarItem key={note.id} note={note}/>
            )
          }
        </List>
      </Drawer>
    </Box>
  )
}
