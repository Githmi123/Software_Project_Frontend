import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./UserProfileLeftPane.css";
import ring from "../../images/ring.png";
import user1 from "../../images/user1.png";
import stars from "../../images/stars.png";
import profileimage from "../../images/profile.png";

import CustomNewButton from "../Buttons/CustomNewButton";

import refreshAccessToken from "../../services/AuthService";
import { Button } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";

export const UserProfileLeftPane = () => {
  const [profile, setProfile] = useState("");
  const [profileImage, setProfileImage] = useState(profileimage);

  const baseUrl = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    async function getUserProfileData() {
      try {
        await refreshAccessToken();

        const response = await axios.get(`${baseUrl}/user`, {
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        });
        setProfile(response.data);
        if (response.data.profilepic) {
          setProfileImage(response.data.profilepic);
        }
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    }
    getUserProfileData();
  }, []);

  const handleNewProfilePicture = async (event) => {
    const file = event.target.files[0];

    const formData = new FormData();
    formData.append("user", profile.email);
    formData.append("image", file);

    try {
      await refreshAccessToken();

      await axios.post(`${baseUrl}/user/profile`, formData, {
        headers: {
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
      });

      setProfileImage(URL.createObjectURL(file));

      console.log("Profile picture updated:");
    } catch (error) {
      console.error("Error uploading profile picture:", error);
    }
  };

  return (
    <div className="LeftPane">
      <div id="container1">
        <div id="ringcontainer">
          <img src={ring} id="ring"></img>
          <img src={profileImage} id="user1"></img>
    
        </div>
        <div id="text">
          <h2>
            Hello {profile.firstname} {profile.lastname} !
          </h2>
          <p id="userprofile-para">
            Driving excellence in education with cutting-edge technology
          </p>
        </div>
       
        <div className="greytext">
          <label htmlFor="upload-button">
            <CustomNewButton
              text="Add Profile Picture"
              onFileSelect={handleNewProfilePicture}
              style={{ marginLeft: "12vh" }}
            />
          </label>
   
        </div>
      </div>

      <div id="container2">
        <h4>
          {profile.firstname} {profile.lastname}
        </h4>
        <span className="greytext">{profile.designation}</span>
        <i className="fas fa-envelope"></i>
        <span className="greytext">{profile.email}</span>
    
      </div>
      <img src={stars} id="stars"></img>
    </div>
  );
};
