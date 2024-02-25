import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { GramsConnect } from '..';
import { GramsDrawer } from './GramsDrawer';

export const GramsNavBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color='secondary'>
        <Toolbar>
          <GramsDrawer />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Grams
          </Typography>
          <GramsConnect />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
