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
import Cookies from 'js-cookie';

// const getAccessToken = () => {
//     return document.cookie.split('; ').find(row => row.startsWith('accessToken=')).split('=')[1];
// };

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

 //     const response = await axios.post("http://localhost:3500/auth", values);
        // const { accessToken } = response.data;
        // const response1 = await axios.post("http://localhost:3500/auth", values,{
        //     headers: {
        //             'Content-Type': 'application/json',
        //             'Authorization': 'Bearer '+accessToken
        //         }, 
        // });
        
    axios.defaults.withCredentials = true;
    axios.defaults.baseURL = 'http://localhost:3500';
    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     try {
    //         // headers: {
    //         //     'Content-Type': 'application/json',
    //         //     'Authorization': 'Bearer '+token
    //         // }, 
    //         const response = await axios.post("http://localhost:3500/auth", values, {
    //             const { accessToken } = response.data;
    //         })
    //         .then(res => {
    //             console.log(res.data)
    //             navigate('/Dashboard')
    //         })
            
    //     } catch (error) {
    //         console.error("Login error:", error);
    //         setErrors({ message: "Failed to log in. Please try again." });


    //     } 
    
    // };

//     axios.defaults.baseURL = 'http://localhost:3500'; // Set your base URL

// const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//         const response = await axios.post("/auth", values);
//         const { accessToken } = response.data;

//         // Set Authorization header for all subsequent requests
//         axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

//         navigate('/Dashboard');
//     } catch (error) {
//         console.error("Login error:", error);
//         setErrors({ message: "Failed to log in. Please try again." });
//     }
// };

// const token = localStorage.getItem('accessToken');
const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        
        //const token = Cookies.get('accessToken');
        
        
       const payload ={"userName": values.userName[0],
                            "passWord": values.passWord[0]
    }
await axios.post("http://localhost:3500/auth", payload
)

.then(res => {
    
    console.log(res.data)
    
    navigate('/Dashboard')
})
    } catch (error) {
        console.log("you are here")
        console.error("Login error:", error);
        setErrors({ message: "Failed to log in. Please try again." });
    }
};




    return(
      
        // <div className="RightPane">
      
        <div className="RightPane" >
            <img src={rapidscore} id='RS' alt="rs"/>
           
            <div id="LogText">
                Log into your account 
            </div>
        
            <form className='div' encType='application/json' type = "submit" action = "" onSubmit={handleSubmit}> 
            {/* <LogInButton/> */}
            <TextField id="userName" label="Username" name='userName' type='email' variant="standard" onChange={handleInput} 
            style={{
                position: 'relative',
                width: '60vh',
                height: '7vh',
                // left: '45vh',
                // top: '48vh',
                color: '#000000',
                }} 
                // InputProps={{ style: {
                //     boxSizing: 'border-box',
                //     position: 'absolute',
                //     left: 0,
                //     right: 0,
                //     top: 0,
                //     bottom: 0,
                //     borderBottom: '0.5vh solid #5932EA',
                //     borderRadius: '1vh'   }, 

                // startAdornment: (
                //     <InputAdornment position="start" style={{
                //     position: 'absolute',
                //     left: '4.38%',
                //     right: '92.9%',
                //     top: '0.5%',
                //     bottom: '34.55%',
                //     background: '#000000',
                //     height: "0%"
                //     }}>
                //     <img src={username} alt="username" style={{ height: "2vh", width: "auto" }}/>
                //     </InputAdornment>
                // ),
                // }}
                // InputLabelProps={{
                // style: {
                //     position: 'absolute',
                //     left: '8.23%',
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

<TextField id="passWord" label="Password" type={showPassword ? "text" : "passWord"} name='passWord' onChange={handleInput} variant="standard" 

            style={{
                position: 'relative',
                width: '60vh',
                height: '7vh',
                // left: '45vh',
                // top: '58vh',
                color: '#000000',
                }} 
                // InputProps={{ style: {
                //     boxSizing: 'border-box',
                //     position: 'absolute',
                //     left: 0,
                //     right: 0,
                //     top: 0,
                //     bottom: 0,
                //     //borderBottom: '0.5vh solid #5932EA',
                //     borderRadius: '1vh',
                //     // Add other styles as needed
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
                //     <img src={password} alt="rs" style={{ height: "15px", width: "auto" }}/>
                //     <IconButton style={{left: "400px"}}
                //             aria-label="toggle password visibility"
                //             onClick={handleClickShowPassword}
                //             edge="end"
                //         > 
                //             {showPassword ? <VisibilityOff /> : <Visibility />}
                //        </IconButton> 
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


<div style={{ display: 'flex', justifyContent: 'center', margin: "5% " }}>
                <LogInButton/>
            </div>

        
      </form>


            
            <div className='NoAccount'>
            
                Don't have an account?
              
            
            <Link to="/SignUp" className='NoAccount' style={{ color: "#FF2442", textDecoration: "underline" }}> Sign Up</Link>
           
            </div>

            


            

        </div>
  
        // </div>
    )
}


