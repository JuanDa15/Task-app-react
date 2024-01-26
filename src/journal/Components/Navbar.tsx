import { LogoutOutlined, MenuOutlined } from '@mui/icons-material'
import { AppBar, Grid, IconButton, Toolbar, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../../store/auth/thunks'
import { type AnyAction } from '@reduxjs/toolkit'

interface Props {
  drawerWidth: number
}

export default function Navbar ({
  drawerWidth
}: Props): JSX.Element {
  const dispatch = useDispatch()

  const handleLogout = (): void => {
    dispatch(logoutUser() as unknown as AnyAction)
  }

  return (
    <AppBar
      position='fixed'
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` }
      }}
    >
      <Toolbar>
        <IconButton
          color='inherit'
          edge='start'
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuOutlined />
        </IconButton>
        <Grid container direction='row' justifyContent='space-between'>
          <Typography variant='h6' noWrap>JournalApp</Typography>
          <IconButton color='error' onClick={handleLogout}>
            <LogoutOutlined />
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}
