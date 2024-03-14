import React, {useState} from 'react';
import './RightPane.css';
// import { MuiTextField } from './MuiTextField';
import LogInButton from '../Buttons/LogInButton';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { Link, useNavigate } from 'react-router-dom';
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
        userName: '',
        passWord: '',
    })
    const navigate = useNavigate();

    const [errors, setErrors] = useState({

    })

    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
    }

 
        

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("http://localhost:3500/auth", values);
            navigate('/Dashboard');
        } catch (error) {
            console.error("Login error:", error);
            setErrors({ message: "Failed to log in. Please try again." });


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
            <form type = "submit" action = "" onSubmit={handleSubmit}> 
            {/* <LogInButton/> */}
            <TextField id="standard-basic" label="userName" name='userName' type='email' variant="standard" onChange={handleInput} 
            style={{
                position: 'absolute',
                width: '60vh',
                height: '7vh',
                left: '45vh',
                top: '48vh',
                color: '#000000',
                }} 
                InputProps={{ style: {
                    boxSizing: 'border-box',
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    borderBottom: '0.5vh solid #5932EA',
                    borderRadius: '1vh'   }, 

                startAdornment: (
                    <InputAdornment position="start" style={{
                    position: 'absolute',
                    left: '4.38%',
                    right: '92.9%',
                    top: '0.5%',
                    bottom: '34.55%',
                    background: '#000000',
                    height: "0%"
                    }}>
                    <img src={username} alt="username" style={{ height: "2vh", width: "auto" }}/>
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
                    fontSize: '1.4rem',
                    lineHeight: '15vh',
                    display: 'flex',
                    alignItems: 'center',
                    color: '#000000',
                },
                }}
      />

<TextField id="standard-basic" label="Password" type={showPassword ? "text" : "passWord"} name='passWord' onChange={handleInput} variant="standard" 

            style={{
                position: 'absolute',
                width: '60vh',
                height: '7vh',
                left: '45vh',
                top: '58vh',
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
                    fontSize: '1.4rem',
                    lineHeight: '15vh',
                    display: 'flex',
                    alignItems: 'center',
                    color: '#000000',
                },
                }}
      />

        <LogInButton/>
      </form>


            
            <div className='NoAccount'>
            
                Don't have an account?
              
            </div>
            <Link to="/SignUp" className='NoAccount' style={{ color: "#FF2442",marginLeft:'15vh', textDecoration: "underline" }}> Sign Up</Link>
           
            

            


            

        </div>
  
        </div>
    )
}


