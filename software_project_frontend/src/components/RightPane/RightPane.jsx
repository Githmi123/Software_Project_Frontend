import React, {useState} from 'react';
import './RightPane.css';
// import { MuiTextField } from './MuiTextField';
import LogInButton from '../Buttons/LogInButton';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { Link } from 'react-router-dom';
import axios from 'axios';
import  {IconButton}  from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import rapidscore from '../../images/rs.png';
import username from '../../images/username.png'
import password from '../../images/password.png'
import LoginValidation from '../Validation/LoginValidation';

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
            {/* <MuiTextField/> */}
                <img src={rapidscore} id='RS' alt="rs"/>
           

            <div id="LogText">
                Log into your account 
            </div>
            <form onSubmit={handleSubmit}> 
            <LogInButton/>
            <TextField id="standard-basic" label="Username" name='username' variant="standard" onChange={handleInput} 
            helperText={errors.username && <span className='text-danger'>{errors.username}</span>}
            style={{
                position: 'absolute',
                width: '489px',
                height: '55px',
                left: '188px',
                backgroundColor: 'transparent',
                top: '389px',
                color: '#000000',
                }} InputProps={{ style: {
                    boxSizing: 'border-box',
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    borderBottom: '4px solid #5932EA',
                    borderRadius: '8px',
                
                }, startAdornment: (
                    <InputAdornment position="start" style={{
                    position: 'absolute',
                    left: '4.38%',
                    right: '92.9%',
                    top: '0.5%',
                    bottom: '34.55%',
                    background: '#000000',
                    height: "0%"
                    }}>
                    <img src={username} alt="username" style={{ height: "15px", width: "auto" }}/>
                    </InputAdornment>
                ),
                }}
                InputLabelProps={{
                style: {
                    position: 'absolute',
                    left: '8.23%',
                    right: '70.56%',
                    top: '5%',
                    bottom: '27.27%',
                    fontFamily: 'Roboto',
                    fontStyle: 'normal',
                    fontWeight: 800,
                    fontSize: '20px',
                    lineHeight: '23px',
                    display: 'flex',
                    alignItems: 'center',
                    color: '#000000',
                },
                }}
      />

            <TextField id="standard-basic" label="Password" type={showPassword ? "text" : "password"} name='password' onChange={handleInput} variant="standard" 
            helperText={errors.password && <span className='text-danger'>{errors.password}</span>}
            style={{
                position: 'absolute',
                width: '489px',
                height: '55px',
                left: '188px',
                top: '469px',
                color: '#000000',
                }} InputProps={{ style: {
                    boxSizing: 'border-box',
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    borderBottom: '4px solid #5932EA',
                    borderRadius: '8px',
                    // Add other styles as needed
                }, startAdornment: (
                    <InputAdornment position="start" style={{
                    position: 'absolute',
                    left: '4.38%',
                    right: '92.9%',
                    top: '0.5%',
                    bottom: '34.55%',
                    background: '#000000',
                    height: "0%"
                    }}>
                    <img src={password} alt="rs" style={{ height: "15px", width: "auto" }}/>
                    <IconButton style={{left: "400px"}}
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                        > 
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                       </IconButton> 
                    </InputAdornment>
                ),
                }}
                InputLabelProps={{
                style: {
                    position: 'absolute',
                    left: '10.23%',
                    right: '70.56%',
                    top: '5%',
                    bottom: '27.27%',
                    fontFamily: 'Roboto',
                    fontStyle: 'normal',
                    fontWeight: 800,
                    fontSize: '20px',
                    lineHeight: '23px',
                    display: 'flex',
                    alignItems: 'center',
                    color: '#000000',
                },
                }}
      />
      
      </form>

              
            
            <div className='NoAccount'>
            
                Don't have an account?
            </div>
          
            <Link to="/SignUp" className='NoAccount' style={{ color: "#FF2442", left: "350px", textDecoration: "underline" }}>
  Sign Up
  
        </Link>
            

            


            

        </div>
  
        </div>
    )
}






// import React from 'react';
// import './RightPane.css';
// import LogInButton from '../Buttons/LogInButton';
// import TextField from '@mui/material/TextField';
// import InputAdornment from '@mui/material/InputAdornment';
// import { Link } from 'react-router-dom';

// import ima from '../../images/rs.png';
// import img from '../../images/username.png';
// import passwordImg from '../../images/password.png';

// export const RightPane = () => {
//     return (
//         <div className="RightPaneContainer">
//             <div className="RightPane">
//                 <img src={ima} alt="rs" id="RS" />

//                 <div id="LogText">Log into your account</div>

//                 <TextField
//                     id="standard-basic"
//                     label="Username"
//                     variant="standard"
//                     InputProps={{
//                         startAdornment: (
//                             <InputAdornment position="start">
//                                 <img src={img} alt="username" />
//                             </InputAdornment>
//                         ),
//                     }}
//                 />

//                 <TextField
//                     id="standard-basic"
//                     label="Password"
//                     type="password"
//                     variant="standard"
//                     InputProps={{
//                         startAdornment: (
//                             <InputAdornment position="start">
//                                 <img src={passwordImg} alt="password" />
//                             </InputAdornment>
//                         ),
//                     }}
//                 />

//                 <LogInButton />

//                 <div className="NoAccount">Don't have an account?</div>

//                 <Link to="/SignUp" className="NoAccount">
//                     Sign Up
//                 </Link>
//             </div>
//         </div>
//     );
// };


