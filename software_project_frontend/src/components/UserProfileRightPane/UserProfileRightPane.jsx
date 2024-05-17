import React, { useState, useEffect } from "react";
import "./UserProfileRightPane.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CustomButton from "../Buttons/CustomButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import refreshAccessToken from "../../services/AuthService";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export const UserProfileRightPane = () => {
  const [profileData, setProfileData] = useState("");

  useEffect(() => {
    async function getProfileData() {
      try {
        await refreshAccessToken();

        const response = await axios.get("http://localhost:3500/user", {
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        });
        setProfileData(response.data);
        console.log("profile data : ", response.data);
      } catch (error) {
        console.log("error fetching data : ", error);
      }
    }
    getProfileData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevProfileData) => ({
      ...prevProfileData,
      [name]: value,
    }));
  };

  const handleCancel = (event) => {};

  const navigate = useNavigate();

  const handleSave = async (e) => {
    try {
      await refreshAccessToken();
      await axios.post("http://localhost:3500/user", profileData, {
        headers: {
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
      });
      navigate("/Dashboard");
      console.log("new profile data :", profileData);
    } catch (error) {
      console.log("error editing the profile : ", error);
    }
  };

  return (
    <div id="rightpane">
      <div>
        <Button
          sx={{
            m: 2,
            width: "100px",
            height: "50px",
            color: "black",
            fontWeight: "bold",
            marginLeft: "10vh",
          }}
          startIcon={<ArrowBackIcon />}
          onClick={() => window.history.back()}
        >
          Dashboard
        </Button>

        {/*   <button className="notificationButton">
          <i className="fas fa-bell"></i>
        </button> */}
      </div>

      <h2 id="edit-text">Edit the Profile</h2>

      <div id="rightpane-form">
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div className="label1-userprofile-left">
            <span className="label1-userprofile-left">First Name</span>
            <div id="space1">
              <TextField
                id="outlined-basic"
                // label="First Name"
                variant="outlined"
                name="firstName"
                value={profileData.firstName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="label1-userprofile-left">
            <span className="label2">Last Name</span>
            <div id="space2">
              <TextField
                id="outlined-basic"
                //label="Last Name"
                variant="outlined"
                name="lastName"
                value={profileData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "row" }}>
          <span className="label1-userprofile-left">Email</span>
          <div id="space3">
            <TextField
              id="outlined-basic"
              //label="Email"
              variant="outlined"
              style={{ width: "70vh" }}
              name="email"
              value={profileData.email}
              onChange={handleChange}
            />
          </div>
        </div>

        {/*  <div>
            <span className='label1'>Address</span>
            <div id='space3'>
                <TextField id="outlined-basic" label="Address" variant="outlined" style={{width: "140vh"}}/>
            </div>
        </div> */}

        {/* <div style={{ display: "flex", flexDirection: "row" }}> */}
        {/*   <div>
                <span className='label1'>Contact No.</span>
                <div id='space1'>
                    <TextField id="outlined-basic" label="Contact No." variant="outlined"/>
                </div>
            </div> */}
        <div
          style={{ display: "flex", flexDirection: "row" }}
          className="label1-userprofile-left"
        >
          <span className="label3">Designation</span>
          <div id="space2">
            <TextField
              id="outlined-basic"
              name="designation"
              variant="outlined"
              value={profileData.designation}
              onChange={handleChange}
            />
          </div>
        </div>

        <div
          style={{ display: "flex", flexDirection: "row" }}
          className="label1-userprofile-left"
        >
          <span className="label3">Password</span>
          <div id="space2">
            <TextField
              id="outlined-basic"
              name="password"
              variant="outlined"
              type="password"
              value={profileData.password}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* </div> */}

        {/*      <div style={{ display: 'flex', flexDirection: 'row' }}>
            <span className='label1'>Educational Background</span>
            <div id='space3' style={{Height: "50vh"}}>
                 <TextField id="outlined-basic" label="Educational Background" variant="outlined" style={{width: "140vh", height: "50vh"}}/> 
                <TextField
                    id="outlined-multiline-static"
                    label="Educational Background"
                    multiline
                    rows={3} // Adjust the number of rows as needed
                    
                    variant="outlined"
                    fullWidth
                    style={{width: "140vh"}}
/>

            </div>
        </div> */}

        <div className="userprofile-buttons">
          <CustomButton
            className="label1-userprofile-left"
            text="Cancel"
            onClick={handleCancel}
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
      </div>
    </div>
  );
};
