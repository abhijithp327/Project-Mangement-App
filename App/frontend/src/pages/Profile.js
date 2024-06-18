import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, CircularProgress, Avatar } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getSingleUser } from '../services/user';
import Navbar from '../components/Navbar';

const Profile = () => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [userName, setUserName] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error('User token not found');
                setLoading(false);
                return;
            }

            try {
                const response = await getSingleUser(token);
                const userData = response.result; // Assuming user data is returned in response.result
                setUser(userData);
            } catch (error) {
                console.error('Failed to fetch user profile:', error);
                toast.error('Failed to fetch user profile');
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <>
            <Navbar isLoggedIn={isLoggedIn} userName={userName} onLogout={() => { }} />

            <Container maxWidth="sm">
                <Box sx={{ textAlign: 'center', mt: 4 }}>
                    <Avatar sx={{ width: 80, height: 80, mb: 2 }}>
                        {user.usr_name ? user.usr_name.charAt(0) : 'U'}
                    </Avatar>
                    <Typography variant="h4">Profile</Typography>
                </Box>
                <Box>
                    <Typography variant="body1"><strong>Name:</strong> {user.usr_name}</Typography>
                    <Typography variant="body1"><strong>Email:</strong> {user.usr_email}</Typography>
                    <Typography variant="body1"><strong>Phone:</strong> {user.usr_phone}</Typography>
                </Box>
                <ToastContainer />
            </Container>
        </>
    );
};

export default Profile;
