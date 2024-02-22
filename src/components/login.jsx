import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Paper } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';




const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();

  fetch('http://10.100.112.99:8080/api/test/all')
  .then(response => response.json())
  .then(data => {
    // Handle the API response data
    console.log(data);
  })
  .catch(error => {
    // Handle any errors
    console.error('Error:', error);
  });


  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = () => {
    let emailError = false;
    let passwordError = false;
  
    if (!email.trim()) {
      setEmailError(true);
      emailError = true;
    } else {
      setEmailError(false);
    }
  
    if (!password.trim()) {
      setPasswordError('Password is required');
      passwordError = true;
    } else {
      setPasswordError(false);
    }
  
    if (emailError) {
      setEmailError('Email is required');
      return;
    }
    if ( passwordError) {
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
  
    if (email === 'example@example.com' && password === 'password') {
      setAuthenticated(true); // Set authentication state to true
      navigate('/dashboard');
    } else {
      // Display authentication error message
      setEmailError('Invalid email or password');
      setPasswordError('Invalid email or password');
    }

    // console.log('Logging in with:', email, password);
    // navigate('/dashboard');
  };
  

//  navigate('/dashboard', {state: {email,password}});

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

const goToSignUp = () =>{navigate('/signUp')}
  
  

  return (
    <Container maxWidth="xs"style= {{marginLeft: 550, marginTop: 100}}>
      <Paper elevation={10} style={{ padding: 20, height: '6', width: 280, margin: '20px auto' }}>
      <Box sx={{ marginTop: 8, textAlign: 'center' }}>
        <Typography variant="h5">Login</Typography>
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
        <Typography>Don't have an account?
          <Link
            component="button"
            variant="body2"
            onClick={goToSignUp}>
            Sign Up
          </Link></Typography>

        {/* <MyComponent></MyComponent> */}
      </Box>
    </Paper>
    </Container>

  );
};

export default LoginPage;



// import React, { useState } from 'react';
// import { Container, TextField, Button, Typography, Box } from '@mui/material';
// import { useNavigate } from 'react-router-dom';


// const LoginPage = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [emailError, setEmailError]= useState(false);
//   const [pwdError, setPwdError]= useState(false);
//   const navigate= useNavigate();

//   // const handleLogin = () => {
//   //   console.log('Logging in with:', email, password);
//   // };

//   const validateEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const emailChange=(e)=>{
//     const newEmail= e.target.value;
//     setEmail(newEmail);
//     setEmailError(!validateEmail(newEmail));
//   }

//   const pwdChange=(e)=>{
//     setPassword(e.target.value);
//     if(e.target.value.length < 8){
//       setPwdError('Password must be at least 8 characters');
//     }
//     else{
//       setPwdError('');
//     }
//   }
  
//   const navLogin = () => {
//     navigate('/dashboard', {state: {email,password}});
//   };

//   return (
//     <Container maxWidth="xs">
//       <Box sx={{ marginTop: 8, textAlign: 'center' }}>
//         <Typography variant="h4">Login</Typography>
//         <TextField
//           margin="normal"
//           required
//           fullWidth
//           label="Email Address"
//           value={email}
//           onChange={emailChange}
//           error= {emailError}
//           helperText= {emailError? 'Invalid': ''}
//         />
//         <TextField
//           margin="normal"
//           required
//           fullWidth
//           label="Password"
//           type="password"
//           value={password}
//           onChange={pwdChange}
//           error= {!!pwdError}
//           helperText={pwdError? 'Invalid': ''}
//         />
//         <Button
//           type="submit"
//           fullWidth
//           variant="contained"
//           sx={{ mt: 3, mb: 2 }}
//           disabled={emailError && pwdError !== ''}
//           onClick={navLogin}
//         >
//           Log In
//         </Button>
//         {/* <Typography variant="h4">{}{password}</Typography> */}
//       </Box>
//     </Container>
//   );
//   const email1 = 'example@example.com';
// };

// export default LoginPage;


// import React, { useState } from 'react'

// function BasicForm() {
//     const [email, setEmail]= useState("");
//     const [password, setPassword]=useState("");
//     const [newEntry, setNewEntry]= useState([]);

//     const submitForm= (e)=>{
//         e.preventDefault()
//         const entry= {
//             email: email,
//             password: password
//         }
//         setNewEntry([...newEntry,entry])
//         console.log(newEntry.email);
//     }
//   return (
//     <>
//       <form action="" onSubmit={submitForm}>
//         <div>
//             <label htmlFor="email">Email</label>
//             <input type="email" name="email" id="email" autoComplete='off' value={email} onChange={(e)=> setEmail(e.target.value)}/>
//         </div>

//         <div>
//             <label htmlFor="password">Password</label>
//             <input type="password" name="password" id="password" value={password} onChange={(e)=> setPassword(e.target.value)} />
//         </div>
//         <div>
//             <button type='submit'>Login</button>
//         </div>
//       </form>
//       <div>
//         {
//             newEntry.map((currData)=>{
//                 return(
//                     <div> 
//                         <p>{currData.name}</p>
//                         <p>{currData.password}</p>
//                     </div>
//                 )            })
//         }
//       </div>
//     </>
//   )
// }

// export default BasicForm
