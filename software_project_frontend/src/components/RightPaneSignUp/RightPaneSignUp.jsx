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
import { Link } from 'react-router-dom';
import SignUpButton from '../Buttons/SignUpButton';
import  {IconButton}  from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";



export const RightPaneSignUp = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
   
    };

    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };


    return(
        <div >
        <div className="RightPane" ></div>
            {/* <MuiTextField/> */}
            
        <div className="RightPane1">
           
            <div >
                <img src={ima} id='RS' alt="rs" style={{top:"10vh"}}/>
            </div>

            <div id="LogText" style={{top: "28vh",width:'50vh',left:'-5vh'}}>
                Create an account 
            </div>
            <TextField id="standard-basic" label="Name" variant="standard" style={{
                position: 'absolute',
                width: '60vh',
                height: '7vh',
                left: '45vh',
                top: '36vh',
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
                    height: "0%"
                    }}>
                    <img src={img} alt="rs" style={{ height: "2vh", width: "auto" }}/>
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

<TextField id="standard-basic" label="Email" variant="standard" style={{
                position: 'absolute',
                width: '60vh',
                height: '7vh',
                left: '45vh',
                top: '46vh',
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
                    height: "0%"
                    }}>
                    <img src={email} alt="rs" style={{ height: "2vh", width: "auto" }}/>
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


            <TextField id="standard-basic" label="Password" type={showPassword ? "text" : "password"} variant="standard" style={{
                position: 'absolute',
                width: '60vh',
                height: '7vh',
                left: '45vh',
                top: '56vh',
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
                    height: "0%"
                    }}>
                    <img src={password} alt="rs" style={{height: "2vh", width: "auto" }}/>
                  
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

<TextField id="standard-basic" label="Confirm Password" type={showConfirmPassword ? "text" : "password"}  variant="standard" style={{
                position: 'absolute',
                width: '60vh',
                height: '7vh',
                left: '45vh',
                top: '66vh',
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
                    height: "0%"
                    }}>
                    <img src={password} alt="rs" style={{ height: "2vh", width: "auto" }}/>
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
                    fontSize: '1.4rem',
                    lineHeight: '15vh',
                    display: 'flex',
                    alignItems: 'center',
                    color: '#000000',
                },
                }}
      />

              
            <SignUpButton/>
            <div className='no-account-1' style={{position: 'absolute',width:'50vh',height:'10vh',left:'45vh',top:'83vh',fontFamily: 'Roboto',fontStyle: 'italic',
                fontWeight: 400, fontSize: '1rem', color: '#242D3F'}}>
                Already have an account?
            </div>

            <Link to="/"  style={{position: 'absolute', textDecoration: "underline",width:'50vh',height:'10vh',left:'60vh',top:'83vh',fontFamily: 'Roboto',fontStyle: 'italic',
                fontWeight: 400, fontSize: '1rem', color: '#FF2442'}} >Login </Link>          
        </div>
        </div>
    )
}