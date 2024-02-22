import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Paper } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';




const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState(false);
    const navigate = useNavigate();

    //   fetch('http://10.100.112.99:8080/api/test/all')
    //   .then(response => response.json())
    //   .then(data => {
    //     // Handle the API response data
    //     console.log(data);
    //   })
    //   .catch(error => {
    //     // Handle any errors
    //     console.error('Error:', error);
    //   });


    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };



    const handleLogin = () => {
        let emailError = false;
        let passwordError = false;
        let usernameError = false;

        if (!username.trim()) {
            setUsernameError("Username is required");
            usernameError = true;
        } else {
            setUsernameError(false);
        }

        if (!email.trim()) {
            setEmailError(true);
            emailError = true;
        } else {
            setEmailError(false);
        }

        if (!password.trim()) {
            setPasswordError("Password is required");
            passwordError = true;
        } else {
            setPasswordError(false);
        }

        if (emailError) {
            setEmailError('Email is required');
            return;
        }
        if (passwordError) {
            setPasswordError('Password is required');
            return;
        }

        if (!validateEmail(email)) {
            setEmailError('Invalid email');
            return;
        }

        if (password.length < 8) {
            setPasswordError('true');
            return;
        }

        // if (email === 'example@example.com' && password === 'password') {
        //   setAuthenticated(true); // Set authentication state to true
        //   navigate('/dashboard');
        // } else {
        //   // Display authentication error message
        //   setEmailError('Invalid email or password');
        //   setPasswordError('Invalid email or password');
        // }

        // console.log('Logging in with:', email, password);
        // navigate('/dashboard');
    };


    //  navigate('/dashboard', {state: {email,password}});

    const usernameChange = (e) => {
        const username = e.target.value;
        setUsername(username);
        if (!username.trim()) {
            setUsernameError('Username is required');
        }
        else {
            setUsernameError(false);
        }
    }

    const emailChange = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        if (!newEmail.trim()) {
            setEmailError('Email is required');
        } else if (!validateEmail(newEmail)) {
            setEmailError('Invalid email');
        } else {
            setEmailError(false);
        }
    };

    const pwdChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        if (!newPassword.trim()) {
            setPasswordError('Password is required');
        } else if (newPassword.length < 8) {
            setPasswordError('Password must be 8 characters!');
        } else {
            setPasswordError(false);
        }
    };

    const goToLogin = () => { navigate('/') }



    return (
        <Container maxWidth="xs" style={{ marginLeft: 550, marginTop: 100 }}>
            <Paper elevation={10} style={{ padding: 20, height: '30', width: 280, margin: '20px auto' }}>
                <Box sx={{ marginTop: 8, textAlign: 'center' }}>
                    <Typography variant="h5">Sign In</Typography>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Username"
                        type="text"
                        value={username}
                        onChange={usernameChange}
                        onClick={usernameChange}
                        error={!!usernameError}
                        helperText={usernameError || null}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Email Address"
                        type='email'
                        value={email}
                        onChange={emailChange}
                        onClick={emailChange}
                        error={!!emailError}
                        helperText={emailError || null}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        value={password}
                        onChange={pwdChange}
                        onClick={pwdChange}
                        error={!!passwordError}
                        helperText={passwordError || null}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={handleLogin}
                    >
                        Log In
                    </Button>
                    <Link
                        component="button"
                        variant="body2"
                        onClick={goToLogin}>
                        Back to Login
                    </Link>
                    {/* <MyComponent></MyComponent> */}
                </Box>
            </Paper>
        </Container>

    );
};

export default SignUp;

