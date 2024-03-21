import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';


export default function FormDialog() {
  const [password, setPassword] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [cPasswordError, setCPasswordError] = React.useState(false);
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [emailError, setEmailError] = React.useState(false);
  const [fNameError, setFNameError] = React.useState(false);
  const [unameError, setUnameError] = React.useState(false);
  const [error, setError] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();

  const fNameChange = (e) => {
    const enteredFName = e.target.value;

    setFNameError(
      enteredFName ? false : true,
      enteredFName.trim() === '');
  }

  const uNameChange = (e) => {
    const enteredFName = e.target.value;
    setUnameError(enteredFName);
    setUnameError(enteredFName.trim() === '');

  }

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const emailChange = (e) => {
    const newEmail = e.target.value;
    if (!newEmail.trim()) {
      setEmailError('Email is required');
    } else {
      setEmailError(!validateEmail(newEmail) ? 'Invalid' : false);
    }
  };


  const handlePhoneNumberChange = (event) => {
    const { value } = event.target;
    if (!value.trim()) {
      setError('Phone number is required');
    } else {
      const phoneNumberRegex = /^\d{10}$/;
      setError(!phoneNumberRegex.test(value) ? 'Phone number must be of 10 numbers' : false);
    }
  };


  const handlePasswordChange = (e) => {
    const enteredPassword = e.target.value;
    setPassword(enteredPassword);
  
    if (!enteredPassword.trim()) {
      setPasswordError('Password is required');
    } else {
      const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(enteredPassword);
      const hasNumber = /\d/.test(enteredPassword);
      const hasUpperCase = /[A-Z]/.test(enteredPassword);
      const hasLowerCase = /[a-z]/.test(enteredPassword);
      const isLengthValid = enteredPassword.length >= 8;
      
      if (!(hasSpecialChar && hasNumber && hasUpperCase && hasLowerCase && isLengthValid)) {
        setPasswordError('Password must contain 1 Upper case, 1 Lower case, 1 Number, 1 Special character and must be at least 8 characters');
      } else {
        setPasswordError('');
      }
    }
  };
  


  const handleConfirmPasswordChange = (e) => {
    const enteredConfirmPassword = e.target.value;
    setConfirmPassword(enteredConfirmPassword);
  
    if (!enteredConfirmPassword.trim()) {
      setCPasswordError('Confirm Password is required');
    } else if (enteredConfirmPassword !== password) {
      setCPasswordError('Passwords do not match');
    } else {
      // Clear the error if the confirm password matches the original password
      setCPasswordError('');
    }
  };
  


  const handleSubmit = () => {
    if (validateEmail(email) && password.length > 8) {
      // Perform login logic here
      console.log('Logging in with:', email, password);

    }
  }


  return (
    <React.Fragment>
      <Button variant="contained" onClick={handleClickOpen} style={{marginRight:'15px'}}>
        Add User
      </Button>

      <Dialog

        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const { firstName, lastName, userName, email, phoneNumber } = formJson;

            if (!firstName || !lastName || !userName || !email || !phoneNumber) {
              // If any of the fields are empty, prevent navigation
              setFNameError('First Name required');
              setUnameError('User Name required');
              setEmailError('Email is required');
              setError('Phone number is required');
              setError('Phone number is required');
              setPasswordError('Password is required');
              setCPasswordError('Password is required');
              return;
            }

            if (!validateEmail(email)) {
              // If email is invalid, prevent navigation
              alert('Please enter a valid email.');
              return;
            }

            if (passwordError || cPasswordError || error) {
              // If any of the password or phone number errors exist, prevent navigation
              alert('Please correct errors in the form.');
              return;
            }

            handleClose();
            navigate('/dashboard', { state: { formJson } });
          },
        }}
      >
        <DialogTitle >Add User</DialogTitle>
        <DialogContent >
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="firstName"
            label="First Name"
            type="text"
            style={{ width: '175px', marginRight: '6px' }}
            variant="outlined"
            onChange={fNameChange}
            onClick={fNameChange}
            error={fNameError}
            helperText={fNameError ? 'First Name required' : ''}
          />
          <TextField
            autoFocus
            margin="dense"
            id="lastName"
            name="lastName"
            label="Last Name"
            type="text"
            style={{ width: '175px', marginRight: '6px' }}
            variant="outlined"
          />
          <TextField
            autoFocus
            margin="dense"
            id="userName"
            name="userName"
            label="User Name"
            type="text"
            style={{ width: '175px', marginRight: '6px' }}
            variant="outlined"
            onChange={uNameChange}
            onClick={uNameChange}
            error={unameError}
            helperText={unameError ? 'User Name required' : ''}
          />
          <TextField
            autoFocus
            margin="dense"
            id="phoneNumber"
            name="phoneNumber"
            label="Phone Number"
            style={{ width: '175px', marginRight: '6px' }}
            type="text"
            fullWidth
            variant="outlined"
            onChange={handlePhoneNumberChange}
            onClick={handlePhoneNumberChange}
            error={!!error}
            helperText={error || ''}
          />

          <TextField
            autoFocus
            margin="dense"
            id="email"
            name="email"
            label="Email Address"
            style={{ width: '175px', marginRight: '6px' }}
            type="email"
            fullWidth
            variant="outlined"
            onChange={emailChange}
            onClick={emailChange}
            error={!!emailError}
            helperText={emailError || ''}
          />


          <TextField
            autoFocus
            margin="dense"
            id="password"
            name="password"
            label="password"
            type="password"
            fullWidth
            style={{ width: '175px', marginRight: '6px' }}
            variant="outlined"
            onChange={handlePasswordChange}
            onClick={handlePasswordChange}
            error={!!passwordError}
            helperText={passwordError || ''}
          />


          <TextField
            autoFocus
            margin="dense"
            id="cPassword"
            name="cPassword"
            label="Confirm Password"
            style={{ width: '175px', marginRight: '6px' }}
            type="password"
            fullWidth
            variant="outlined"
            onChange={handleConfirmPasswordChange}
            onClick={handleConfirmPasswordChange}
            error={!!cPasswordError} 
            helperText={cPasswordError || ''}
          />

          {/* // onChange={cPwdValidation}
          // onClick={cPwdValidation}
          // error={cPasswordError}
          // helperText={cPasswordError ? 'Password is required' : ''} */}


        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{ textTransform: 'capitalize' }}>Cancel</Button>
          <Button type="submit" onClick={handleSubmit} style={{ textTransform: 'capitalize' }}>Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
