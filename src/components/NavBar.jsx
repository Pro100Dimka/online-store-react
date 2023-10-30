import React, { useContext, useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import { observer } from 'mobx-react-lite';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { Context } from '..';
import { ADMIN_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2'
    }
  }
});
const NavBar = observer(() => {
  const navigate = useNavigate();
  const { user } = useContext(Context);
  const { role } = user.getUser();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const logOut = () => {
    localStorage.removeItem('token');
    user.setUser({});
    user.setIsAuth(false);
    navigate(SHOP_ROUTE);
  };
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              onClick={() => {
                navigate(SHOP_ROUTE);
              }}
              sx={{
                cursor: 'pointer',
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                flexGrow: 1
              }}
            >
              Зайца Магазин
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left'
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' }
                }}
              >
                {user._isAuth ? (
                  [
                    <MenuItem key="admin" onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">Адмін Панель</Typography>
                    </MenuItem>,
                    <MenuItem key="logOut" onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">Вийти</Typography>
                    </MenuItem>
                  ]
                ) : (
                  <MenuItem
                    onClick={() => {
                      handleCloseNavMenu();
                      navigate(REGISTRATION_ROUTE);
                    }}
                  >
                    <Typography textAlign="center">Авторизація</Typography>
                  </MenuItem>
                )}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="button"
              onClick={() => {
                navigate(SHOP_ROUTE);
              }}
              sx={{
                cursor: 'pointer',
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none'
              }}
            >
              Зайца Магазин
            </Typography>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              {role === 'ADMIN' && (
                <Button
                  onClick={() => {
                    navigate(ADMIN_ROUTE);
                    handleCloseNavMenu();
                  }}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Адмін Панель
                </Button>
              )}
              {user._isAuth ? (
                <Button
                  onClick={() => {
                    logOut();
                    handleCloseNavMenu();
                  }}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Вийти
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    handleCloseNavMenu();
                    navigate(LOGIN_ROUTE);
                  }}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Авторизація
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
});

export default NavBar;
