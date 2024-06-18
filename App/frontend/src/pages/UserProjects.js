import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardContent, Typography, CircularProgress, Alert, Button, CardActions, Box } from '@mui/material';
import {jwtDecode} from 'jwt-decode';
import { getSingleUser } from '../services/project';
import Navbar from '../components/Navbar';

const UserProjects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('User token not found');
            setLoading(false);
            return;
        }

        try {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.id;

            setIsLoggedIn(true);
            setUserName(decodedToken.name);

            const fetchUserProjects = async () => {
                try {
                    const response = await getSingleUser(token);
                    if (Array.isArray(response.result)) {
                        setProjects(response.result);
                    } else {
                        setError('Unexpected response format');
                    }
                } catch (error) {
                    setError('Failed to fetch user projects. Please try again later.');
                } finally {
                    setLoading(false);
                }
            };

            fetchUserProjects();
        } catch (error) {
            setError('Invalid token');
            setLoading(false);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setUserName('');
        window.location.href = '/login';
    };

    return (
        <>
            <Navbar isLoggedIn={isLoggedIn} userName={userName} onLogout={handleLogout} />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    My Projects
                </Typography>
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
                                        <Button size="small" color="primary" onClick={() => window.location.href = `/projects/${project.id}`}>
                                            View
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                        <Grid item xs={12} sm={6} md={4}>
                            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', backgroundColor: '#f5f5f5' }}>
                                <CardContent>
                                    <Typography variant="h6" component="div" gutterBottom>
                                        Create a New Project
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Start a new project and add it to your collection.
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{ mt: 'auto', justifyContent: 'center' }}>
                                    <Button size="small" color="primary" onClick={() => window.location.href = '/create'}>
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

export default UserProjects;
