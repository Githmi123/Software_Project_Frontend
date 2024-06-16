import React, {useState} from 'react';
// import '../RightPane/RightPane.css';
// import { MuiTextField } from './MuiTextField';
import LogInButton from '../Buttons/LogInButton';
import ima from '../../images/rs.png';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import img from '../../images/username.png'
import email from '../../images/email.png'
//import password from '../../images/password.png'
import { Link, useNavigate } from 'react-router-dom';
import SignUpButton from '../Buttons/SignUpButton';
import  {CircularProgress, IconButton}  from "@mui/material";
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
    const [loading, setLoading] = useState(false);

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
                await axios.post("http://localhost:3500/register", values, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                navigate('/Dashboard');
                setLoading(false);
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
        // <div >
        <div className="RightPane" >

        {/* </div> */}
            {/* <MuiTextField/> */}
            
        {/* <div className="RightPane1"> */}
           
            <div >
                <img src={ima} id='RS' alt="rs"/>
            </div>

            <div className="LogText">
                Create An Account 
            </div>

            <form className='div' encType='application/json' onSubmit={handleSubmit}>
             
            <TextField id="firstName" placeholder="First Name" type='text' name='firstName' variant="standard" 
            helperText={errors.firstName && <span className='text-danger'>{errors.firstName}</span>}

            onChange={handleInput}
            style={{
                position: 'relative',
                width: '60vh',
                height: '5vh',
                // left: '45vh',
                // top: '30vh',
                color: '#000000',
                margin: "2%"
                }} 
                // InputProps={{ style: {
                //     boxSizing: 'border-box',
                //     position: 'absolute',
                //     left: 0,
                //     right: 0,
                //     top: 0,
                //     bottom: 0,
                //     borderBottom: '0.5vh solid #5932EA',
                //     borderRadius: '1vh',
                
                // }, startAdornment: (
                //     <InputAdornment position="start" style={{
                //     position: 'absolute',
                //     left: '4.38%',
                //     right: '92.9%',
                //     top: '0.5%',
                //     bottom: '34.55%',
                //     background: '#000000',
                //     height: "0%"
                //     }}>
                //     <img src={img} alt="rs" style={{ height: "2vh", width: "auto" }}/>
                //     </InputAdornment>
                // ),
                // }}
                // InputLabelProps={{
                // style: {
                //     position: 'absolute',
                //     left: '8.23%',
                //     right: '70.56%',
                //     width:'90%',
                //     top: '5%',
                //     bottom: '27.27%',
                //     fontFamily: 'Roboto',
                //     fontStyle: 'normal',
                //     fontWeight: 800,
                //     fontSize: '1.4rem',
                //     lineHeight: '15vh',
                //     display: 'flex',
                //     alignItems: 'center',
                //     color: '#000000',
                // },
                // }}
      />

        <TextField id="lastName" placeholder="Last Name" type='text' name='lastName' variant="standard" 
            helperText={errors.lastName && <span className='text-danger'>{errors.lastName}</span>}
            onChange={handleInput}
            style={{
                position: 'relative',
                width: '60vh',
                height: '5vh',
                // left: '45vh',
                // top: '38vh',
                color: '#000000',
                margin: "2%"
                }} 
                // InputProps={{ style: {
                //     boxSizing: 'border-box',
                //     position: 'absolute',
                //     left: 0,
                //     right: 0,
                //     top: 0,
                //     bottom: 0,
                //     borderBottom: '0.5vh solid #5932EA',
                //     borderRadius: '1vh',
                
                // }, startAdornment: (
                //     <InputAdornment position="start" style={{
                //     position: 'absolute',
                //     left: '4.38%',
                //     right: '92.9%',
                //     top: '0.5%',
                //     bottom: '34.55%',
                //     background: '#000000',
                //     height: "0%"
                //     }}
                //     >
                //     <img src={img} alt="rs" style={{ height: "2vh", width: "auto" }}/>
                //     </InputAdornment>
                // ),
                // }}
                // InputLabelProps={{
                // style: {
                //     position: 'absolute',
                //     left: '8.23%',
                //     width:'90%',
                //     right: '70.56%',
                //     top: '5%',
                //     bottom: '27.27%',
                //     fontFamily: 'Roboto',
                //     fontStyle: 'normal',
                //     fontWeight: 800,
                //     fontSize: '1.4rem',
                //     lineHeight: '15vh',
                //     display: 'flex',
                //     alignItems: 'center',
                //     color: '#000000',
                // },
                // }}
      />

        <TextField id="email" placeholder="Email" type='email' name='email' variant="standard" 
            helperText={errors.email && <span className='text-danger'>{errors.email}</span>}
            onChange={handleInput}
            style={{
                position: 'relative',
                width: '60vh',
                height: '5vh',
                // left: '45vh',
                // top: '46vh',
                color: '#000000',
                margin: "2%"
                }} 
                // InputProps={{ style: {
                //     boxSizing: 'border-box',
                //     position: 'absolute',
                //     left: 0,
                //     right: 0,
                //     top: 0,
                //     bottom: 0,
                //     borderBottom: '0.5vh solid #5932EA',
                //     borderRadius: '1vh',
            
                // }, startAdornment: (
                //     <InputAdornment position="start" style={{
                //     position: 'absolute',
                //     left: '4.38%',
                //     right: '92.9%',
                //     top: '0.5%',
                //     bottom: '34.55%',
                //     background: '#000000',
                //     height: "0%"
                //     }}>
                //     <img src={email} alt="rs" style={{ height: "2vh", width: "auto" }}/>
                //     </InputAdornment>
                // ),
                // }}
                // InputLabelProps={{
                // style: {
                //     position: 'absolute',
                //     left: '10.23%',
                //     right: '70.56%',
                //     top: '5%',
                //     bottom: '27.27%',
                //     fontFamily: 'Roboto',
                //     fontStyle: 'normal',
                //     fontWeight: 800,
                //     fontSize: '1.4rem',
                //     lineHeight: '15vh',
                //     display: 'flex',
                //     alignItems: 'center',
                //     color: '#000000',
                // },
                // }}
      />

            <TextField id="password" placeholder="Password" 
            name='password' 
            type={showPassword ? "text" : "password"} 
            variant="standard" 
            helperText={errors.password && <span className='text-danger'>{errors.password}</span>}
            onChange={handleInput}
            style={{
                position: 'relative',
                width: '60vh',
                height: '5vh',
                // left: '45vh',
                // top: '54vh',
                color: '#000000',
                margin: "2%"
                }} 
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
                // InputLabelProps={{
                // style: {
                //     position: 'absolute',
                //     left: '10.23%',
                //     right: '70.56%',
                //     top: '5%',
                //     bottom: '27.27%',
                //     fontFamily: 'Roboto',
                //     fontStyle: 'normal',
                //     fontWeight: 800,
                //     fontSize: '1.4rem',
                //     lineHeight: '15vh',
                //     display: 'flex',
                //     alignItems: 'center',
                //     color: '#000000',
                // },
                // }}
      />

<TextField  id="ConfirmPassword" name='confirmPassword' placeholder="Confirm Password" type={showConfirmPassword ? "text" : "password"}  variant="standard" 
helperText={errors.confirmPassword && <span className='text-danger'>{errors.confirmPassword}</span>}
onChange={handleInput}
style={{
                position: 'relative',
                width: '60vh',
                height: '5vh',
                // left: '45vh',
                // top: '62vh',
                color: '#000000',
                margin: "2%"
                }} 
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
                //     style: {
                //     boxSizing: 'border-box',
                //     position: 'absolute',
                //     left: 0,
                //     right: 0,
                //     top: 0,
                //     bottom: 0,
                //     borderBottom: '0.5vh solid #5932EA',
                //     borderRadius: '1vh',
             
                // }, 
                // startAdornment: (
                //     <InputAdornment position="start" 
                //     style={{
                //     position: 'absolute',
                //     // left: '4.38%',
                //     // right: '92.9%',
                //     // top: '0.5%',
                //     // bottom: '34.55%',
                //     background: '#000000',
                //     height: "2%"
                //     }}
                //     >
                //     {/* <img src={password} alt="rs" style={{ height: "2vh", width: "auto" }}/> */}
                //     <IconButton style={{left: "400px"}}
                //             aria-label="toggle password visibility"
                //             onClick={handleClickShowConfirmPassword}
                //             edge="end"
                //         > 
                //             {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                //        </IconButton> 
                //     </InputAdornment>
                // ),
                
                // InputLabelProps={{
                // style: {
                //     position: 'absolute',
                //     left: '10.23%',
                //     width: "90%",
                //     right: '70.56%',
                //     top: '5%',
                //     bottom: '27.27%',
                //     fontFamily: 'Roboto',
                //     fontStyle: 'normal',
                //     fontWeight: 800,
                //     fontSize: '1.4rem',
                //     lineHeight: '15vh',
                //     display: 'flex',
                //     alignItems: 'center',
                //     color: '#000000',
                // },
                // }}
      />

<TextField id="designation" placeholder="Designation" type='text' name='designation' variant="standard" 
            helperText={errors.designation && <span className='text-danger'>{errors.designation}</span>}
            onChange={handleInput}
            style={{
                position: 'relative',
                width: '60vh',
                height: '5vh',
                // left: '45vh',
                // top: '70vh',
                color: '#000000',
                margin: "2%"
                }} 
                // InputProps={{ style: {
                //     boxSizing: 'border-box',
                //     position: 'absolute',
                //     left: 0,
                //     right: 0,
                //     top: 0,
                //     bottom: 0,
                //     borderBottom: '0.5vh solid #5932EA',
                //     borderRadius: '1vh',
            
                // }, startAdornment: (
                //     <InputAdornment position="start" style={{
                //     position: 'absolute',
                //     left: '4.38%',
                //     right: '92.9%',
                //     top: '0.5%',
                //     bottom: '34.55%',
                //     background: '#000000',
                //     height: "0%",
                //     width:'10%'
                //     }}>
                //     <img src={img} alt="rs" style={{ height: "2vh", width: "auto" }}/>
                //     </InputAdornment>
                // ),
                // }}
                // InputLabelProps={{
                // style: {
                //     position: 'absolute',
                //     left: '10.23%',
                //     width:'90%',
                //     right: '70.56%',
                //     top: '5%',
                //     bottom: '27.27%',
                //     fontFamily: 'Roboto',
                //     fontStyle: 'normal',
                //     fontWeight: 800,
                //     fontSize: '1.4rem',
                //     lineHeight: '15vh',
                //     display: 'flex',
                //     alignItems: 'center',
                //     color: '#000000',
                // },
                // }}
      /> 
              
              <div style={{ display: 'flex', justifyContent: 'center', margin: "5% " }}>
              <SignUpButton/>
              </div>

              {/* <button type='submit'  style={{marginTop: "50px"}}>Sign Up</button> */}
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
        // </div>
    )
}