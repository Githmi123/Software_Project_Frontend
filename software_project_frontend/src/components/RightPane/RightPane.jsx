import React, {useState} from 'react';
import './RightPane.css';
// import { MuiTextField } from './MuiTextField';
import LogInButton from '../Buttons/LogInButton';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';

import axios from 'axios';
import  {IconButton}  from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import rapidscore from '../../images/rs.png';
import username from '../../images/username.png'
import password from '../../images/password.png'
import LoginValidation from '../Validation/LoginValidation';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PasswordIcon from '@mui/icons-material/Password';


export const RightPane = () => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
   
    };

    const [values, setValues] = useState({
        username: '',
        password: ''
    })

    const [errors, setErrors] = useState({

    })

    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = LoginValidation(values);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            // If there are no errors, proceed with form submission
            console.log('Form submitted');
        } else {
            // If there are errors, focus on the first erroneous field
            const firstErrorField = Object.keys(validationErrors)[0];
            document.getElementsByName(firstErrorField)[0].focus();
        }
    };

    return(
        <div >
        <div className="RightPane"></div>
        <div className="RightPane1" >
            <img src={rapidscore} id='RS' alt="rs"/>
           
            <div id="LogText">
                Log into your account 
            </div>
            <form  encType='application/json' onSubmit={handleSubmit}> 
            {/* <LogInButton/> */}

            <div style={{display: 'flex', flexDirection: 'column', marginLeft:'55vh', marginTop:'15vh'}}>
            <Box className="text-field-input-box">
            <AccountCircleIcon className="text-field-icon" sx={{ color: 'black', mr: 1, my: 0.5 }}  />
            <TextField id="standard-basic" label="Username" name='username' variant="standard" onChange={handleInput} 
            helperText={errors.username && <span className='text-danger'>{errors.username}</span>} />
            </Box>

            <Box className="text-field-input-box" >
            <PasswordIcon sx={{ color: 'black', mr: 1, my: 0.5 }} />
            <TextField id="standard-basic" label="Password" type={showPassword ? "text" : "password"} name='password' onChange={handleInput} variant="standard" 
            helperText={errors.password && <span className='text-danger'>{errors.password}</span>}
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

            </div>

           

        <LogInButton/>
      </form>


            
            <div className='NoAccount'>
            
                Don't have an account?
              
            </div>
            <Link to="/SignUp" className='NoAccount' style={{ color: "#FF2442",marginLeft:'20vh', textDecoration: "underline" }}> Sign Up</Link>
           
            

            


            

        </div>
  
        </div>
    )
}


