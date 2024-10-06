import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useTheme } from '@emotion/react';
import { Box, Link } from '@mui/material';
function Navbar() {
  const theme = useTheme();

  return (
    // <AppBar position="static" color="transparent">

    <Container maxWidth="lg">
      <Toolbar
        disableGutters
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            component="span"
            sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
          >
            <img
              src="https://res.cloudinary.com/divpwvus4/image/upload/v1714224110/Ai%20Dee/onsu4h1ryd7cybhcfj4q.png"
              width={45}
              height={45}
            />
          </Box>
          <Typography
            href="/"
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              fontSize: 25,
              textDecoration: 'none',
            }}
          >
            AiDee
          </Typography>
        </Box>
        <Box>
          <Link
            href="/account"
            sx={{
              mr: 2,
              fontWeight: 600,
              fontSize: 20,
              cursor: 'pointer',
            }}
          >
            Account
          </Link>
        </Box>
      </Toolbar>
    </Container>
    // </AppBar>
  );
}

export default Navbar;
