import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/auth'; // Ensure this is pointing to your correct service file
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, CircularProgress, Container, TextField, Typography, Box, Link } from '@mui/material';
import Navbar from '../components/Navbar'; // Adjust the path if necessary

const Register = () => {
  const [user, setUser] = useState({
    usr_name: '',
    usr_email: '',
    usr_password: '',
    usr_phone: '',
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Validation rules
  const validate = () => {
    let tempErrors = {};
    if (!user.usr_name) tempErrors.usr_name = "Name is required";
    if (!user.usr_email) {
      tempErrors.usr_email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(user.usr_email)) {
      tempErrors.usr_email = "Email is not valid";
    }
    if (!user.usr_password) {
      tempErrors.usr_password = "Password is required";
    } else if (user.usr_password.length < 6) {
      tempErrors.usr_password = "Password should be at least 6 characters long";
    }
    if (!user.usr_phone) {
      tempErrors.usr_phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(user.usr_phone)) {
      tempErrors.usr_phone = "Phone number must be 10 digits";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const response = await register(user);
      setLoading(false);
      toast.success(response.data.message);
      setTimeout(() => {
        navigate('/login'); // Redirect to login page after 2 seconds
      }, 2000);
    } catch (error) {
      setLoading(false);
      console.error('Registration failed:', error);
      const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <Navbar isLoggedIn={false} userName={''} onLogout={() => {}} />
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Register
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            name="usr_name"
            label="Name"
            value={user.usr_name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            error={!!errors.usr_name}
            helperText={errors.usr_name}
          />
          <TextField
            name="usr_email"
            label="Email"
            value={user.usr_email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            error={!!errors.usr_email}
            helperText={errors.usr_email}
          />
          <TextField
            name="usr_password"
            label="Password"
            type="password"
            value={user.usr_password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            error={!!errors.usr_password}
            helperText={errors.usr_password}
          />
          <TextField
            name="usr_phone"
            label="Phone"
            value={user.usr_phone}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            error={!!errors.usr_phone}
            helperText={errors.usr_phone}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            sx={{ mt: 2 }}
          >
            {loading ? <CircularProgress size={24} /> : 'Register'}
          </Button>
          <Box textAlign="center" mt={2}>
            <Link href="/login" variant="body2">
              Already have an account? Login here
            </Link>
          </Box>
        </form>
        <ToastContainer />
      </Container>
    </>
  );
};

export default Register;
