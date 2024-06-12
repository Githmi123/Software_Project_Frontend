import React, { useState, useEffect } from "react";
// import "./UserProfileRightPane.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CustomButton from "../Buttons/CustomButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import refreshAccessToken from "../../services/AuthService";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
// import { Password } from "@mui/icons-material";

export const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();


  const handleChangeCurrentPassword = (e) => {
    setCurrentPassword(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleChangeConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };

  const save = async() => {
    setLoading(true);
    if(password === confirmPassword){
      console.log("Trying to save password");
      const response = await axios.put("http://localhost:3500/user/password", 
      {
          oldPassword: currentPassword,
          newPassword : password
      });
      console.log("Finished sending request");
      
      navigate("/Dashboard");
      // console.log("new profile data :", profileData);
    }

    else{
      console.log("Please re-enter password correctly");
    }

    setLoading(false);
  }


  const handleSave = async () => {
    try {
      await save();
      
    } catch (error) {
      if(error.response && error.response.status === 401){
        const newAccessToken = await refreshAccessToken();
        console.log("New access token: ", newAccessToken);

        if(newAccessToken){
          try {
            // await refreshAccessToken();
            await save();
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        }
      }
      else{
        console.error("Error fetching data:", error);
      }
    }
  };

  return (
    <div style={{width:"100%"}}>

      <div style={{width:"100%", display:"flex", flexDirection:"column", justifyContent:"left"}}>
        {/* <div > */}
          {/* <div className="label1-userprofile-left"> */}

          <h2
            style={{
              fontSize: "15px",
              marginLeft: "1vw",
              // marginTop: "5vh",
              color: "black",
            }}
          >
            Enter the current password
          </h2>
          <TextField
          hiddenLabel
          id="filled-hidden-label-small"
          variant="filled"
          type="password"
          // defaultValue="Module Code"
        //   placeholder={profileData.firstName}
            name="currentPassword"
            value={currentPassword}
            onChange={handleChangeCurrentPassword}
            style={{width: "80%"}}
            sx={{
              // marginLeft: 5,
              marginTop: 0,
              // marginRight: 5,
              "& input": {
                fontSize: "1rem", // Adjust the font size to decrease the size of the text box
                padding: "8px 12px", // Adjust the padding to match the new font size
              },
            }}
          />

          <h2
            style={{
              fontSize: "15px",
              marginLeft: "1vw",
              marginTop: "5vh",
              color: "black",
            }}
          >
            Enter the new password
          </h2>
          <TextField
          hiddenLabel
          id="filled-hidden-label-small"
          variant="filled"
          type="password"
          // defaultValue="Module Code"
        //   placeholder={profileData.firstName}
            name="password"
            value={password}
            onChange={handleChangePassword}
            style={{width: "80%"}}
            sx={{
              // marginLeft: 5,
              marginTop: 0,
              // marginRight: 5,
              "& input": {
                fontSize: "1rem", // Adjust the font size to decrease the size of the text box
                padding: "8px 12px", // Adjust the padding to match the new font size
              },
            }}
          />



        <h2
            style={{
              fontSize: "15px",
              marginLeft: "1vw",
              marginTop: "5vh",
              color: "black",
            }}
          >
            Re-enter password to confirm
          </h2>
          <TextField
          hiddenLabel
          id="filled-hidden-label-small"
          variant="filled"
          type="password"
          // defaultValue="Module Code"
        //   placeholder={profileData.firstName}
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChangeConfirmPassword}
            style={{width: "80%"}}
            sx={{
              // marginLeft: 5,
              marginTop: 0,
              // marginRight: 5,
              "& input": {
                fontSize: "1rem", // Adjust the font size to decrease the size of the text box
                padding: "8px 12px", // Adjust the padding to match the new font size
              },
            }}
          />

          
          <div style={{display:"flex", justifyContent:"center"}} className="userprofile-buttons2">
          <CustomButton
            className="label1-userprofile-left"
            text="Cancel"
            onClick={() => window.history.back()}
            backgroundColor="white"
            textColor="#7894DB"
          />
          <CustomButton
            className="label1-userprofile-left"
            text="Save"
            onClick={handleSave}
            backgroundColor="#7894DB"
            textColor="white"
          />

          

          {/* <Button variant="contained" style={{margin:"10px", backgroundColor:"white", color:"#7894DB", width : "20vh", textTransform: "capitalize", border: "2px solid #7894DB"}}>Cancel</Button> */}
          {/* <Button variant="contained" style={{margin:"10px", backgroundColor:"#7894DB", width : "20vh", textTransform: "capitalize"}}>Save</Button> */}
        </div>
        {loading && (
        <div style={{display: "flex", justifyContent:"center"}}><CircularProgress/></div>
      )}
      </div>
    </div>
  );
};

       

        
