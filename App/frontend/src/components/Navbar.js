import React from 'react';
import { AppBar, Toolbar, Typography, Button, Avatar, Menu, MenuItem, IconButton } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { logout } from '../services/auth'; 

const Navbar = ({ isLoggedIn, userName, onLogout }) => {

    const navigate = useNavigate();
    const location = useLocation();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleLogout = () => {
        logout(); // Call logout function to clear token
        onLogout(); // Notify parent component about logout
        navigate('/login'); // Redirect to login page after logout
    };

    const handleAvatarClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleProfileClick = () => {
        navigate('/profile'); // Navigate to the profile page
        handleClose(); // Close the menu
    };

    const handleHomeClick = () => {
        navigate('/'); // Navigate to the home page
        handleClose(); // Close the menu
    };

    const getInitials = (name) => {
        const initials = name.split(' ').map(word => word[0]).join('');
        return initials.toUpperCase();
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Project Management System
                </Typography>
                {isLoggedIn && (
                    <>
                        <IconButton onClick={handleAvatarClick}>
                            <Avatar sx={{ bgcolor: 'secondary.main' }}>
                                {userName ? getInitials(userName) : 'U'}
                            </Avatar>
                        </IconButton>
                        <Typography variant="body1" sx={{ mr: 2 }}>
                            {userName}
                        </Typography>
                    </>
                )}
                {location.pathname !== '/' && ( // Only show Home button if not on the home page
                    <Button color="inherit" onClick={handleHomeClick}>
                        Home
                    </Button>
                )}
                {isLoggedIn ? (
                    <>
                        <Button color="inherit" onClick={handleLogout}>
                            Logout
                        </Button>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </Menu>
                    </>
                ) : (
                    <Button color="inherit" onClick={() => navigate('/login')}>
                        Login
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
