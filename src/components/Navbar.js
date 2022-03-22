import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge, IconButton, Box, Button } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { AuthStatus, useAuth } from '../App';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  let auth = useAuth();
  let navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const UserIsAdmin = (roles) => {
    return roles.some(role => role === "ROLE_ADMIN");
  }

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
      {
        auth.user && UserIsAdmin(auth.user.roles)?<MenuItem onClick={() => {
          handleMenuClose();
          navigate("/admin");
        }}>Admin</MenuItem>:""
      }
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  
  const menuOptions = [<MenuItem
    onClick={() => {
      handleMobileMenuClose();
      logout();
    }}
  >
    Logout
  </MenuItem>];
  if(auth.user && UserIsAdmin(auth.user.roles)) {
    menuOptions.push(<MenuItem onClick={() => {
      handleMobileMenuClose();
      navigate("/admin");
    }}>Admin</MenuItem>);
  }

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
        auth.user?menuOptions:[
        <MenuItem
          onClick={() => {
            handleMobileMenuClose();
            navigate("/signin");
          }}
        >
          Login
        </MenuItem>,
        <MenuItem 
          onClick={() => {
            handleMobileMenuClose();
            navigate("/signup")
          }}
        >
          Signup
        </MenuItem>]
      }
    </Menu>
  );

  const logout = () => {
    auth.signout(() => {
      navigate("/");
    });
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
            <Link to="/">Booknation</Link>
          </Typography>
          <Box>
            <AuthStatus/>
          </Box>
          <Link to="/cart">
            <IconButton aria-label="cart" color="inherit">
              <Badge color="error">
                <ShoppingCartIcon/>
              </Badge>
            </IconButton>
          </Link>
          
          <Box sx={{display: { md:'flex', xs:'none' }}}>
            {
              !auth.user?<>
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