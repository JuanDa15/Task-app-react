import { TurnedInNot } from '@mui/icons-material'
import { Box, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'

interface Props {
  drawerWidth: number
}

export default function Sidebar ({
  drawerWidth
}: Props): JSX.Element {
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
          <Typography variant='h6' noWrap >
            Juan David Osorio
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          {
            Array(10).fill(0).map((_, index) =>
              <ListItem key={index} disablePadding >
                <ListItemButton>
                  <ListItemIcon>
                    <TurnedInNot />
                  </ListItemIcon>
                  <Grid container>
                    <ListItemText primary={`Item ${index + 1}`} />
                    <ListItemText secondary={'lorem12 3234334'} />
                  </Grid>
                </ListItemButton>
              </ListItem>
            )
          }
        </List>
      </Drawer>
    </Box>
  )
}
