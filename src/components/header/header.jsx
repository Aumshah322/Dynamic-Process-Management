import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MoreIcon from '@mui/icons-material/MoreVert';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../UserForm/dashboard';
import FDashboard from '../FormMaster/dashboard';
import AuthService from '../../AuthService';

const Header = styled(Toolbar)(({ theme }) => ({
  alignItems: 'flex-start',
  paddingTop: theme.spacing(0.5),
  paddingBottom: theme.spacing(0.5),
  '@media all': {
    minHeight: 20,
  },
}));

export default function HeaderBar() {
  const [arrowAnchorEl, setArrowAnchorEl] = useState(null);
  const [moreAnchorEl, setMoreAnchorEl] = useState(null);
  const navigate = useNavigate();


  const handleArrowClick = (event) => {
    setArrowAnchorEl(event.currentTarget);
  };

  const handleMoreClick = (event) => {
    setMoreAnchorEl(event.currentTarget);
  }

    const handleLogout = () => {
      try {
        localStorage.removeItem('token');
        navigate('/')
      } catch (error) {
        console.error('Error clearing localStorage:', error);
      }
    };

  const handleClose = async () => {
    setArrowAnchorEl(null);
    setMoreAnchorEl(null);

  };

  const handleUserMasterClick = () => {
    handleClose();
    navigate('/dashboard');
  };

  const handleFormMasterClick = () => {
    handleClose();
    navigate('/formMaster');
  };

  const openArrow = Boolean(arrowAnchorEl);
  const openMore = Boolean(moreAnchorEl);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Header>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              alignSelf: 'flex-end',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <IconButton
                size="large"
                aria-label="display more actions"
                color="inherit"
                onClick={handleArrowClick}
              >
                <Typography style={{ fontSize: '20px' }}>Admin Management</Typography>
                <ArrowDropDownIcon />
              </IconButton>
              <Popover
                open={openArrow}
                anchorEl={arrowAnchorEl}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                <MenuList>
                  <MenuItem onClick={handleUserMasterClick}>User Master</MenuItem>
                  <MenuItem onClick={handleFormMasterClick}>Form Master</MenuItem>
                </MenuList>
              </Popover>
            </div>

            <div style={{ marginLeft: 'auto' }}>
              <IconButton
                size="large"
                aria-label="display more actions"
                color="inherit"
                onClick={handleMoreClick}
              >
                <MoreIcon />
              </IconButton>
              <Popover
                open={openMore}
                anchorEl={moreAnchorEl}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                <MenuList>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </MenuList>
              </Popover>
            </div>
          </Typography>
        </Header>
      </AppBar>
    </Box>
  );
}
