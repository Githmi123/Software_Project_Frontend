import React, {useState} from 'react';
import '../RightPane/RightPane.css';
// import { MuiTextField } from './MuiTextField';
import LogInButton from '../Buttons/LogInButton';
import ima from '../../images/rs.png';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import Input from '@mui/material/Input';

import img from '../../images/username.png'
import email from '../../images/email.png'
import password from '../../images/password.png'
import { Link, useNavigate } from 'react-router-dom';
import SignUpButton from '../Buttons/SignUpButton';
import  {IconButton}  from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import SignUpValidation from '../Validation/SignUpValidation';
import axios from 'axios';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PasswordIcon from '@mui/icons-material/Password';
import BadgeIcon from '@mui/icons-material/Badge';

import { styled } from '@mui/material/styles';


import AccountCircle from '@mui/icons-material/AccountCircle';



export const RightPaneSignUp = () => {

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

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
   
    };

    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const [values, setValues] = useState({
        email: '',
        password: '',
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
    const handleSubmit = async (event) => {
        event.preventDefault();
        const validationErrors = SignUpValidation(values);
        setErrors(validationErrors);
        

        if (
            (errors.firstName === "" &&
            errors.lastName === "" &&
            errors.email === "" &&
            errors.password === "" &&
            errors.designation === "" )
        ) {
            try {
                
                await axios.post("http://localhost:3500/register", values, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                navigate('/');
            } catch (err) {
                console.log(err);
            }
        }
        
        // if (Object.keys(validationErrors).length === 0) {
        //     // If there are no errors, proceed with form submission
        //     console.log('Form submitted');
        // } else {
        //     // If there are errors, focus on the first erroneous field
        //     const firstErrorField = Object.keys(validationErrors)[0];
        //     document.getElementsByName(firstErrorField)[0].focus();
        // }
    };
    

    return(
        <div >
        <div className="RightPane" ></div>
            {/* <MuiTextField/> */}
            
        <div className="RightPane1">
           
            <div >
                <img src={ima} id='RS' alt="rs"/>
            </div>

            <div id="LogText" style={{top: "19vh",width:'50vh',left:'-5vh'}}>
                Create An Account 
            </div>

            <form encType='application/json' onSubmit={handleSubmit}>

            <div  style={{display: 'flex', flexDirection: 'column', marginLeft:'55vh', marginTop:'2vh'}}>
            <Box className="text-field-input-box">
            <AccountCircleIcon className="text-field-icon" sx={{ color: 'black', mr: 1, my: 0.5 }}  /> 
            <TextField id="firstName" label="firstName" type='text' name='firstName' variant="standard" 
            helperText={errors.firstName && <span className='text-danger'>{errors.firstName}</span>}
            onChange={handleInput} />
            </Box>
            
            
            <Box className="text-field-input-box">
            <AccountCircleIcon className="text-field-icon" sx={{ color: 'black', mr: 1, my: 0.5 }}  />
            <TextField id="lastName" label="lastName" type='text' name='lastName' variant="standard" 
                helperText={errors.lastName && <span className='text-danger'>{errors.lastName}</span>}
                onChange={handleInput} />
            </Box>
             

            <Box className="text-field-input-box">
            <AlternateEmailIcon sx={{ color: 'black', mr: 1, my: 0.5 }} />
            <TextField id="email" label="email" type='email' name='email' variant="standard" 
            helperText={errors.email && <span className='text-danger'>{errors.email}</span>}
            onChange={handleInput}/>
            </Box>


            <Box className="text-field-input-box" >
            <PasswordIcon sx={{ color: 'black', mr: 1, my: 0.5 }} />
            <TextField id="password" label="password" name='password' type={showPassword ? "text" : "password"} variant="standard" 
            helperText={errors.password && <span className='text-danger'>{errors.password}</span>}
            onChange={handleInput}

            InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }} />
           </Box>


           <Box className="text-field-input-box">
            <PasswordIcon sx={{ color: 'black', mr: 1, my: 0.5 }} />
            <TextField id="standard-basic" label="Confirm Password" type={showConfirmPassword ? "text" : "password"}  variant="standard" 
            helperText={errors.password && <span className='text-danger'>{errors.password}</span>}

            InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}  />
            </Box>

            <Box className="text-field-input-box">
            <BadgeIcon sx={{ color: 'black', mr: 1, my: 0.5 }} />
            <TextField id="designation" label="designation" type='text' name='designation' variant="standard" 
            helperText={errors.designation && <span className='text-danger'>{errors.designation}</span>}

{/*
            onChange={handleInput}
            style={{
                position: 'absolute',
                width: '60vh',
                height: '5vh',
                left: '45vh',
                top: '70vh',
                color: '#000000',
                }} InputProps={{ style: {
                    boxSizing: 'border-box',
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    borderBottom: '0.5vh solid #5932EA',
                    borderRadius: '1vh',
            
                }, startAdornment: (
                    <InputAdornment position="start" style={{
                    position: 'absolute',
                    left: '4.38%',
                    right: '92.9%',
                    top: '0.5%',
                    bottom: '34.55%',
                    background: '#000000',
                    height: "0%",
                    width:'10%'
                    }}>
                    <img src={img} alt="rs" style={{ height: "2vh", width: "auto" }}/>
                    </InputAdornment>
                ),
                }}
                InputLabelProps={{
                style: {
                    position: 'absolute',
                    left: '10.23%',
                    width:'90%',
                    right: '70.56%',
                    top: '5%',
                    bottom: '27.27%',
                    fontFamily: 'Roboto',
                    fontStyle: 'normal',
                    fontWeight: 800,
                    fontSize: '1.4rem',
                    lineHeight: '15vh',
                    display: 'flex',
                    alignItems: 'center',
                    color: '#000000',
                },
                }}
      /> 
      */}

            onChange={handleInput}/> 
            </Box>

            </div>
              

              <SignUpButton/>

              <button type='submit'  style={{marginTop: "50px"}}>Sign Up</button>
            </form>

            
            <div className='no-account-1' style={{position: 'absolute',width:'50vh',height:'10vh',left:'45vh',top:'83vh',fontFamily: 'Roboto',fontStyle: 'italic',
 fontWeight: 400, fontSize: '1rem', color: 'black'}}>

                Already have an account?
            </div>

            <Link to="/"  style={{position: 'absolute', textDecoration: "underline",width:'50vh',height:'10vh',left:'65vh',top:'83vh',fontFamily: 'Roboto',fontStyle: 'italic',
                fontWeight: 400, fontSize: '1rem', color: '#FF2442'}} >Login </Link>          
        </div>
        </div>
    )
}