import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Button, Grid, Card, CardContent, CardActions, CircularProgress, Alert, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getAllProjects } from '../services/project';
import Navbar from '../components/Navbar';
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import {jwtDecode} from 'jwt-decode';

const Home = () => {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            setIsLoggedIn(true);
            setUserName(decodedToken.name);
        }
    }, []);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await getAllProjects();
                if (Array.isArray(response.data.result)) {
                    setProjects(response.data.result);
                } else {
                    setError('Unexpected response format');
                }
            } catch (error) {
                setError('Failed to load projects. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    const navigateToPage = (path) => {
        navigate(path);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setUserName('');
        navigate('/login');
    };

    const handleViewProjects = () => {
        if (!isLoggedIn) {
            toast.error('Please login to view your projects');
            navigate('/login');
        } else {
            navigate('/user_projects');
        }
    };

    return (
        <>
            <Navbar isLoggedIn={isLoggedIn} userName={userName} onLogout={handleLogout} />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Paper elevation={3} sx={{ p: 3, mb: 4, textAlign: 'center' }}>
                    <Typography variant="h3" gutterBottom>
                        Welcome to Our Application!
                    </Typography>
                    <Typography variant="body1" color="textSecondary" paragraph>
                        Explore our projects, create your own, or manage your account.
                    </Typography>
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: 2 }}>
                        <Button variant="contained" color="primary" onClick={handleViewProjects}>
                            View Your Projects
                        </Button>
                        {isLoggedIn && (
                            <Button variant="contained" color="secondary" onClick={() => navigateToPage('/create')}>
                                Create a Project
                            </Button>
                        )}
                    </Box>
                </Paper>

                {loading ? (
                    <Box sx={{ textAlign: 'center', mt: 4 }}>
                        <CircularProgress />
                    </Box>
                ) : error ? (
                    <Box sx={{ textAlign: 'center', mt: 4 }}>
                        <Alert severity="error">{error}</Alert>
                    </Box>
                ) : (
                    <Grid container spacing={4}>
                        {projects.map((project) => (
                            <Grid item xs={12} sm={6} md={4} key={project.id}>
                                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                    <CardContent>
                                        <Typography variant="h6" component="div" gutterBottom>
                                            {project.pro_name}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            {project.pro_description}
                                        </Typography>
                                    </CardContent>
                                    <CardActions sx={{ mt: 'auto' }}>
                                        <Button size="small" onClick={() => navigateToPage(`/projects/${project.id}`)}>
                                            Learn More
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                        <Grid item xs={12} sm={6} md={4}>
                            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#f5f5f5' }}>
                                <CardContent>
                                    <Typography variant="h6" component="div" gutterBottom>
                                        Create a Project
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Start your own project and share it with the community.
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{ mt: 'auto' }}>
                                    <Button size="small" onClick={() => navigateToPage('/create')}>
                                        Create Now
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    </Grid>
                )}
            </Container>
        </>
    );
};

export default Home;






