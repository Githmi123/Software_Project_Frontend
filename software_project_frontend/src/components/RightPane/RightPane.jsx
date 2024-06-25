import React, { useState } from "react";
import "./RightPane.css";
import LogInButton from "../Buttons/LogInButton";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Icon, IconButton, CircularProgress } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import rapidscore from "../../images/rs.png";
import username from "../../images/username.png";
import password from "../../images/password.png";
import LoginValidation from "../Validation/LoginValidation";
import Cookies from "js-cookie";
import refreshAccessToken from "../../services/AuthService";
import { useSnackbar } from "notistack";
import logo from '../../images/logo.png';


export const RightPane = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {enqueueSnackbar} = useSnackbar();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: [event.target.value],
    }));
  };



  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = "http://localhost:3500";


  const submit = async () => {
    setLoading(true);
          
            const payload = {
              userName: values.username[0],
              passWord: values.password[0],
            };
            await axios
              .post("http://localhost:3500/auth", payload)
      
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
    const errors = LoginValidation(values);
    setErrors(errors);
    if(!(errors.email === "" &&
        errors.password === ""
      ))
      {
        try {
     
          await submit();
          
    
          
        } catch (error) {
          
          console.log("you are here");
          console.error("Login error:", error);
          setErrors({ message: "Failed to log in. Please try again." });
          if(error.response && error.response.status === 401){
            const newAccessToken = await refreshAccessToken(); 
            console.log("New access token: ", newAccessToken);
  
            if(newAccessToken){
              try {
            
                await submit();
              } catch (error) {
                console.error("Error fetching data:", error);
                if (error.response && error.response.status === 401) {
                  enqueueSnackbar('Unauthorized access. Please log in again.', { variant: 'error' });
                }
              }
            }
          }
          else{
            console.error("Error fetching data:", error);
          }
        }
        finally{
          setLoading(false);
        }
      }
    
  };

  return (


    <div data-testid="right-pane" className="RightPane">
      <img src={logo} alt="Logo" id='Logo-in-right-pane'></img>
      <img src={rapidscore} id="RS" alt="rs" />

      <div className="LogText">Log into your account</div>

      <form
        className="div"
        encType="application/json"
        type="submit"
        action=""
        onSubmit={handleSubmit}
      >
  
        <TextField
          id="userName"
          placeholder="Email"
          name="username"
          type="email"
          variant="standard"
          onChange={handleInput}
          helperText={errors.username && <span className="text-danger">{errors.username}</span>}
          className="textfield-login"
       
        />
        
        <TextField
          id="standard-adornment-password"
          placeholder="Password"
          type={showPassword ? "text" : "password"}
          name="password"
          onChange={handleInput}
          variant="standard"
          helperText={errors.password && <span className="text-danger">{errors.password}</span>}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibiity"
                onClick={handleClickShowPassword}
              >
                
                {showPassword ? <VisibilityOff/> : <Visibility/>}
              </IconButton>
            </InputAdornment>
            ),
        
          }}
          
          className="textfield-login"
       
        />

        <div
          style={{ display: "flex", justifyContent: "center", margin: "5% " }}
        >
          <LogInButton />
        </div>
      </form>

      <div className="NoAccount">
        Don't have an account?
        <Link
          to="/SignUp"
          className="NoAccount"
          style={{ color: "#FF2442", textDecoration: "underline" }}
        >
          {" "}
          Sign Up
        </Link>
      </div>

      {loading && (
        <div style={{display: "flex", justifyContent:"center"}}><CircularProgress/></div>
      )}
    </div>

  );
};
