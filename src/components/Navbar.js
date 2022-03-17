import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge, IconButton, Box, Button } from '@mui/material';
import { IsLogin } from './AuthRoutes/CheckLogin';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';

const Navbar = ({cartLength}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => {
        handleMenuClose();
        logout();
      }}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {
        IsLogin()?<MenuItem 
          onClick={() => {
            handleMobileMenuClose();
            logout();
          }}
        >
          Logout
        </MenuItem>:[
        <MenuItem onClick={handleMobileMenuClose}>Login</MenuItem>,
        <MenuItem onClick={handleMobileMenuClose}>Signup</MenuItem>].map(elem => elem)
      }
    </Menu>
  );

  const logout = () => {
    localStorage.clear();
    window.location.replace("/");
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { md: 'flex' } }}
          >
            Booknation
          </Typography>
          <IconButton href="/cart" aria-label="cart" color="inherit">
            <Badge color="error" badgeContent={cartLength}>
              <ShoppingCartIcon/>
            </Badge>
          </IconButton>
          <Box sx={{display: { md:'flex', xs:'none' }}}>
            {
                !IsLogin()?<>
                  <Button color="inherit" href="/signin">Login</Button>
                  <Button color="inherit" href="/signup">SignUp</Button>
                </>:<IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            }
          </Box>
          <Box sx={{display: {md:'none',xs:'flex'}}}>
            <IconButton
                size="large"
                edge="end"
                aria-label="account of current mobile user"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
            </IconButton>
          </Box>
          
          
        </Toolbar>
      </Container>
      {renderMenu}
      {renderMobileMenu}
    </AppBar>
  );
};
export default Navbar;