import React, {useState} from 'react';
import '../RightPane/RightPane.css';
// import { MuiTextField } from './MuiTextField';
import LogInButton from '../Buttons/LogInButton';
import ima from '../../images/rs.png';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import img from '../../images/username.png'
import email from '../../images/email.png'
import password from '../../images/password.png'
import { Link, useNavigate } from 'react-router-dom';
import SignUpButton from '../Buttons/SignUpButton';
import  {IconButton}  from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import SignUpValidation from '../Validation/SignUpValidation';
import axios from 'axios';



export const RightPaneSignUp = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
   
    };

    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        confirmpassword: ''
    })

    const [errors, setErrors] = useState({

    })

    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
    }
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = SignUpValidation(values);
        setErrors(validationErrors);

        if(errors.username === "" && errors.email === "" && errors.password === ""){
            axios.post("http://localhost:3500/register", values)
            .then(res => {
                navigate('/');
            })
            .catch(err => console.log(err));
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
                <img src={ima} id='RS' alt="rs" style={{top:"30px"}}/>
            </div>

            <div id="LogText" style={{top: "150px"}}>
                Create an account 
            </div>
            <form onSubmit={handleSubmit}>
            <SignUpButton/>  
            <TextField id="standard-basic" label="Name" type='text' name='username' variant="standard" 
            helperText={errors.username && <span className='text-danger'>{errors.username}</span>}
            onChange={handleInput}
            style={{
                position: 'absolute',
                width: '489px',
                height: '55px',
                left: '188px',
                top: '229px',
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
                    <img src={img} alt="rs" style={{ height: "15px", width: "auto" }}/>
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

        <TextField id="standard-basic" label="Email" type='email' name='email' variant="standard" 
            helperText={errors.email && <span className='text-danger'>{errors.email}</span>}
            onChange={handleInput}
            style={{
                position: 'absolute',
                width: '489px',
                height: '55px',
                left: '188px',
                top: '309px',
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
                    <img src={email} alt="rs" style={{ height: "15px", width: "auto" }}/>
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


            <TextField id="standard-basic" label="Password" name='password' type={showPassword ? "text" : "password"} variant="standard" 
            helperText={errors.password && <span className='text-danger'>{errors.password}</span>}
            onChange={handleInput}
            style={{
                position: 'absolute',
                width: '489px',
                height: '55px',
                left: '188px',
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

<TextField id="standard-basic" label="Confirm Password" type={showConfirmPassword ? "text" : "password"}  variant="standard" 
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
                            onClick={handleClickShowConfirmPassword}
                            edge="end"
                        > 
                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                       </IconButton> 
                    </InputAdornment>
                ),
                }}
                InputLabelProps={{
                style: {
                    position: 'absolute',
                    left: '10.23%',
                    width: "90%",
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
                Already have an account?
            </div>

            <Link to="/" className='NoAccount' style={{ color: "#FF2442", left: "350px", textDecoration: "underline" }}>
  Login
  
  
        </Link>
          
            
            

            


            

        </div>
        </div>
    )
}