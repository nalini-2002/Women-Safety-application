import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, Paper, Container, Grid, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuth } from '../../context/auth';
import axios from 'axios';
import toast from 'react-hot-toast';
import { api } from '../../context/api';
import loginImage from '../../images/login.png';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [auth, setAuth] = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const validateEmail = (email) => {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email.trim() || !validateEmail(email)) {
            toast.error('Invalid Email Format');
            return;
        }
        if (!password.trim()) {
            toast.error('Password is required');
            return;
        }

        try {
            const res = await axios.post(api + 'api/v1/users/login', { email, password });
            if (res.status === 200) {
                toast.success('Login Successfully');
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                });
                localStorage.setItem('auth', JSON.stringify(res.data));
                navigate('/');
            }
        } catch (err) {
            toast.error('Invalid Email or Password');
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={10} sx={{ p: 4, borderRadius: 4, mt: 6, textAlign: 'center' }}>
                <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
                    Welcome Back
                </Typography>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                    We are happy to have you back
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                    <img src={loginImage} alt="Login" width={150} />
                </Box>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Email Address"
                        variant="outlined"
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        variant="outlined"
                        margin="normal"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        size="large"
                        sx={{ mt: 3, borderRadius: 2 }}
                    >
                        Login
                    </Button>
                </form>
                <Typography variant="body2" sx={{ mt: 2 }}>
                    Don't have an account? <Link to="/register" style={{ textDecoration: 'none', color: 'blueviolet' }}>Register</Link>
                </Typography>
            </Paper>
        </Container>
    );
};

export default Login;