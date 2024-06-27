import React, {useState} from 'react';
import LogInButton from '../Buttons/LogInButton';
import ima from '../../images/rs.png';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import img from '../../images/username.png'
import email from '../../images/email.png'
import { Link, useNavigate } from 'react-router-dom';
import SignUpButton from '../Buttons/SignUpButton';
import  {CircularProgress, IconButton}  from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import SignUpValidation from '../Validation/SignUpValidation';
import axios from 'axios';
import '../RightPane/RightPane.css';
import logo from '../../images/logo.png';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PasswordIcon from '@mui/icons-material/Password';
import BadgeIcon from '@mui/icons-material/Badge';

import { styled } from '@mui/material/styles';


import AccountCircle from '@mui/icons-material/AccountCircle';
import { useSnackbar } from 'notistack';



export const RightPaneSignUp = () => {

  axios.defaults.withCredentials = true;
  // axios.defaults.baseURL = "http://localhost:3500";
  

    const StyledTextField = styled(TextField)({
        '& .MuiInput-underline:before': {
          borderBottom: '2px solid #5932EA', 
          borderRadius: '5px', 
          fontWeight: 'bold', 
          width:'45vh'
        },
        '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
          borderBottomColor: 'blue', 
        },
      });
      



    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const baseUrl = process.env.REACT_APP_BASE_URL;

    const {enqueueSnackbar} = useSnackbar();

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
        
    };

    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const [values, setValues] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        firstName:'',
        lastName:'',
        designation:''
    })

    const [errors, setErrors] = useState({

    })

    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: event.target.value}))
        console.log(values);
    }
    
    const navigate = useNavigate();

    const submit = async () => {
      setLoading(true);
            
              const payload = {
                userName: values.username[0],
                passWord: values.password[0],
              };
              await axios
                .post(`${baseUrl}/auth`, payload)
        
                .then((res) => {
                  console.log(res.data);
                  const { accessToken } = res.data;
                  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

                  console.log(accessToken);
        
                  navigate("/Dashboard");
                });
              setLoading(false);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const validationErrors = SignUpValidation(values);
        setErrors(validationErrors);
        

        if (
            (errors.firstName === "" &&
            errors.lastName === "" &&
            errors.email === "" &&
            errors.password === "" &&
            errors.confirmPassword === "" &&
            errors.designation === "" )
        ) {
            try {
                setLoading(true);
                const response = await axios.post(`${baseUrl}/register`, values, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if(response.status === 201){
                  const payload = {
                    userName: values.email,
                    passWord: values.password,
                  };
                  await axios
                    .post(`${baseUrl}/auth`, payload)
            
                    .then((res) => {
                      console.log("Response:",res.data);
                      const { accessToken } = res.data;
                      // axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                      axios.post(`${baseUrl}/auth`, payload, {
                        headers: {
                          'Authorization': `Bearer ${accessToken}`
                        }
                      });
          
                      console.log(accessToken);
                      enqueueSnackbar('New account created', { variant: 'success' });
            
                      navigate("/Dashboard");
                    });
                }
                        
            } catch (error) {
              if (error.response && error.response.status === 409) {
                setLoading(false);
                enqueueSnackbar('An account with this email already exists!', { variant: 'error' });
              } else {
                setLoading(false);
                console.error("Error fetching data:", error);
                enqueueSnackbar('An error occurred while registering', { variant: 'error' });
              }
            }
        }
 
    };
    

    return(
      
        <div className="RightPane" >      
       
                <img src={logo} alt="Logo" id='Logo-in-right-pane'></img>
                <img src={ima} id='RS' alt="rs"/>
         

            <div className="LogText">
                Create An Account 
            </div>

            <form className='div' encType='application/json' onSubmit={handleSubmit}>
             
            <TextField id="firstName" placeholder="First Name" type='text' name='firstName' variant="standard" 
            helperText={errors.firstName && <span className='text-danger'>{errors.firstName}</span>}

            onChange={handleInput}
            className='sign-up-fields'
                
      />

        <TextField id="lastName" placeholder="Last Name" type='text' name='lastName' variant="standard" 
            helperText={errors.lastName && <span className='text-danger'>{errors.lastName}</span>}
            onChange={handleInput}
            className='sign-up-fields'
               
      />

        <TextField id="email" placeholder="Email" type='email' name='email' variant="standard" 
            helperText={errors.email && <span className='text-danger'>{errors.email}</span>}
            onChange={handleInput}
            className='sign-up-fields'
               
      />

            <TextField id="password" placeholder="Password" 
            name='password' 
            type={showPassword ? "text" : "password"} 
            variant="standard" 
            helperText={errors.password && <span className='text-danger'>{errors.password}</span>}
            onChange={handleInput}
            className='sign-up-fields'
            InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              
      />

<TextField  id="ConfirmPassword" name='confirmPassword' placeholder="Confirm Password" type={showConfirmPassword ? "text" : "password"}  variant="standard" 
helperText={errors.confirmPassword && <span className='text-danger'>{errors.confirmPassword}</span>}
onChange={handleInput}
className='sign-up-fields'
                InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowConfirmPassword}
                          edge="end"
                        >
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
              
      />

<TextField id="designation" placeholder="Designation" type='text' name='designation' variant="standard" 
            helperText={errors.designation && <span className='text-danger'>{errors.designation}</span>}
            onChange={handleInput}
            className='sign-up-fields' 
                
      /> 
              
              <div style={{ display: 'flex', justifyContent: 'center', margin: "5% " }}>
              <SignUpButton/>
              </div>

            </form>

            
            <div className='NoAccount'>

                Already have an account?
            

            <Link to="/"  style={{position: 'relative', textDecoration: "underline",width:'50vh',height:'10vh',fontFamily: 'Roboto',fontStyle: 'italic',
                fontWeight: 400, fontSize: '1rem', color: '#FF2442'}} >Login </Link>   
                </div>  
                {loading && (
        <div style={{display: "flex", justifyContent:"center"}}><CircularProgress/></div>
      )}     
        </div>
  
    )
}