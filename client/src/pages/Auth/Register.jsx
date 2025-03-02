import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Grid, Paper, Typography } from '@mui/material';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { api } from '../../context/api';
import register from '../../images/register.png';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        uname: '',
        email: '',
        phone: '',
        password: '',
        emergencyNo: '',
        emergencyMail: '',
        pincode: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateEmail = (email) => {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { uname, email, phone, password, emergencyNo, emergencyMail, pincode } = formData;

        if (!uname.trim()) return toast.error('Name is required');
        if (!email.trim() || !validateEmail(email)) return toast.error('Valid email is required');
        if (!phone.trim()) return toast.error('Phone Number is required');
        if (!password.trim()) return toast.error('Password is required');
        if (!emergencyNo.trim()) return toast.error('Emergency Number is required');
        if (phone === emergencyNo) return toast.error('Emergency Phone and Personal Phone must be different');
        if (!emergencyMail.trim() || !validateEmail(emergencyMail)) return toast.error('Valid emergency email is required');
        if (email === emergencyMail) return toast.error('Emergency Email and Personal Email must be different');
        if (!pincode.trim()) return toast.error('Pincode is required');

        try {
            const res = await axios.post(`${api}api/v1/users/register`, formData);
            if (res.status === 201) {
                toast.success('Registered Successfully');
                navigate('/login');
            } else {
                toast.error(res.data.message || 'Registration failed');
            }
        } catch (err) {
            toast.error('Error while registering');
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <Container maxWidth="md" sx={{ mt: 5 }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
                <Grid container spacing={3} alignItems="center" justifyContent="center">
                    <Grid item md={6} display="flex" justifyContent="center">
                        <img src={register} alt="Register" width={300} />
                    </Grid>
                    <Grid item md={6}>
                        <Typography variant="h4" fontWeight="bold" gutterBottom>
                            Register
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <TextField fullWidth label="Full Name" name="uname" value={formData.uname} onChange={handleChange} margin="normal" required />
                            <TextField fullWidth label="Email Address" name="email" value={formData.email} onChange={handleChange} margin="normal" required />
                            <TextField fullWidth label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} margin="normal" required />
                            <TextField fullWidth label="Password" name="password" type="password" value={formData.password} onChange={handleChange} margin="normal" required />
                            <TextField fullWidth label="Emergency Number" name="emergencyNo" value={formData.emergencyNo} onChange={handleChange} margin="normal" required />
                            <TextField fullWidth label="Emergency Email" name="emergencyMail" value={formData.emergencyMail} onChange={handleChange} margin="normal" required />
                            <TextField fullWidth label="Pincode" name="pincode" value={formData.pincode} onChange={handleChange} margin="normal" required />
                            <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>Register</Button>
                        </form>
                        <Button component={Link} to="/login" fullWidth variant="outlined" sx={{ mt: 2 }}>Login</Button>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default Register;
