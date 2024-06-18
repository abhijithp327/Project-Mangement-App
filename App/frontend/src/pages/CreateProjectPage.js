import React, { useState } from 'react';
import { Container, TextField, Button, Typography, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar'; // Replace with your Navbar component
import { createProject } from '../services/project'; // Import your API function

const CreateProjectPage = () => {
    const [project, setProject] = useState({
        pro_name: '',
        pro_title: '',
        pro_description: '',
    });

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validate = () => {
        let tempErrors = {};
        if (!project.pro_name) tempErrors.pro_name = "Project name is required";
        if (!project.pro_title) tempErrors.pro_title = "Project title is required";
        if (!project.pro_description) tempErrors.pro_description = "Project description is required";
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setProject((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validate()) return;
    
        setLoading(true);
        try {
            const token = localStorage.getItem('token'); // Fetch token from localStorage
            const response = await createProject(project, token);
            setLoading(false);
            toast.success(response.message);
            setTimeout(() => {
                navigate('/'); // Redirect to home page after project creation
            }, 2000);
        } catch (error) {
            setLoading(false);
            console.error('Project creation failed:', error);
            const errorMessage = error.response?.data?.message || 'Project creation failed. Please try again.';
            toast.error(errorMessage);
        }
    };
    


    return (
        <>
            <Navbar isLoggedIn={true} userName={'Your Name'} onLogout={() => {}} /> {/* Replace with actual props */}
            <Container maxWidth="sm" sx={{ mt: 4 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Create a New Project
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        name="pro_name"
                        label="Project Name"
                        value={project.pro_name}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                        error={!!errors.pro_name}
                        helperText={errors.pro_name}
                    />
                    <TextField
                        name="pro_title"
                        label="Project Title"
                        value={project.pro_title}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                        error={!!errors.pro_title}
                        helperText={errors.pro_title}
                    />
                    <TextField
                        name="pro_description"
                        label="Project Description"
                        value={project.pro_description}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        multiline
                        rows={4}
                        required
                        error={!!errors.pro_description}
                        helperText={errors.pro_description}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        disabled={loading}
                        sx={{ mt: 2 }}
                    >
                        {loading ? <CircularProgress size={24} /> : 'Create Project'}
                    </Button>
                </form>
                <ToastContainer />
            </Container>
        </>
    );
};

export default CreateProjectPage;
