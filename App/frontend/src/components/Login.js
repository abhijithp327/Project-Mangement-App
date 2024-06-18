import { Button, CircularProgress, Container, TextField, Typography, Link, Box } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { login } from "../services/auth";
import Navbar from "../components/Navbar"; // Adjust the path if needed

const Login = () => {
    const [credentials, setCredentials] = useState({ usr_email: '', usr_password: '' });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    // Validation rules
    const validate = () => {
        let tempErrors = {};
        if (!credentials.usr_email) tempErrors.usr_email = "Email is required";
        if (!/\S+@\S+\.\S+/.test(credentials.usr_email)) tempErrors.usr_email = "Email is not valid";
        if (!credentials.usr_password) tempErrors.usr_password = "Password is required";
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCredentials((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validate()) return;
        setLoading(true);
        try {
            const response = await login(credentials);
            console.log("login", response.message);
            setLoading(false);
            toast.success(response.message);
            setTimeout(() => {
                navigate('/'); // Redirect to home page after 2 seconds
            }, 1000);
        } catch (error) {
            setLoading(false);
            console.error('Login failed:', error);
            const errorMessage = error.response.message || 'Login failed. Please try again.';
            toast.error(errorMessage);
        }
    };

    return (
        <>
            <Navbar isLoggedIn={false} userName={''} onLogout={() => {}} /> {/* Adjusted to show appropriate nav state */}
            <Container maxWidth="sm" sx={{ mt: 4 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Login
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        name="usr_email"
                        label="Email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={credentials.usr_email}
                        onChange={handleChange}
                        error={!!errors.usr_email}
                        helperText={errors.usr_email}
                    />
                    <TextField
                        name="usr_password"
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={credentials.usr_password}
                        onChange={handleChange}
                        error={!!errors.usr_password}
                        helperText={errors.usr_password}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        disabled={loading}
                        sx={{ mt: 2 }}
                    >
                        {loading ? <CircularProgress size={24} /> : "Login"}
                    </Button>
                    <Box textAlign="center" mt={2}>
                        <Link href="/register" variant="body2">
                            Don't have an account? Register here
                        </Link>
                    </Box>
                </form>
                <ToastContainer />
            </Container>
        </>
    );
};

export default Login;
