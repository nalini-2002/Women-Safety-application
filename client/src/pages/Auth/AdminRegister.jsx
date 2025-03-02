import React, { useEffect, useState } from 'react';
import { Container, Grid, Paper, TextField, Button, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { api } from '../../context/api';

const AdminRegister = () => {
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

    const validateEmail = (email) => {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(email);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { uname, email, phone, password, emergencyNo, emergencyMail, pincode } = formData;

        // Validations
        if (!uname.trim()) return toast.error('Name is required');
        if (!email.trim() || !validateEmail(email)) return toast.error('Invalid Email Format');
        if (!phone.trim()) return toast.error('Phone Number is required');
        if (!password.trim()) return toast.error('Password is required');
        if (!emergencyNo.trim()) return toast.error('Emergency Number is required');
        if (phone === emergencyNo) return toast.error('Emergency and Personal Phone must be different');
        if (!emergencyMail.trim() || !validateEmail(emergencyMail)) return toast.error('Invalid Emergency Email');
        if (email === emergencyMail) return toast.error('Emergency and Personal Email must be different');
        if (!pincode.trim()) return toast.error('PinCode is required');

        try {
            const res = await axios.post(`${api}api/v1/users/register`, { ...formData, role: 1 });
            if (res.status === 201) {
                toast.success('Registered Successfully');
                navigate('/login');
            } else if (res.status === 400) {
                toast.error('Email Already Exists! Please Login');
            }
        } catch (err) {
            toast.error("Error While Registering");
            console.error(err);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
                <Typography variant="h4" gutterBottom align="center">
                    Admin Registration
                </Typography>
                <Grid container spacing={2}>
                    {[
                        { label: "Full Name", name: "uname", type: "text" },
                        { label: "Email Address", name: "email", type: "email" },
                        { label: "Phone Number", name: "phone", type: "number" },
                        { label: "Password", name: "password", type: "password" },
                        { label: "Emergency Number", name: "emergencyNo", type: "number" },
                        { label: "Emergency Email", name: "emergencyMail", type: "email" },
                        { label: "Pincode", name: "pincode", type: "number" }
                    ].map((field, index) => (
                        <Grid item xs={12} key={index}>
                            <TextField
                                fullWidth
                                type={field.type}
                                label={field.label}
                                name={field.name}
                                value={formData[field.name]}
                                onChange={handleChange}
                                variant="outlined"
                                required
                            />
                        </Grid>
                    ))}
                    <Grid item xs={12}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                        >
                            Register
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            fullWidth
                            variant="outlined"
                            component={Link}
                            to="/login"
                        >
                            Already have an account? Login
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}

export default AdminRegister;
