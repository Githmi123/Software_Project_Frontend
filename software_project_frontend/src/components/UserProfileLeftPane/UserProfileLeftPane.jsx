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

  useEffect(() => {
    async function getUserProfileData() {
      try {
        await refreshAccessToken();

        const response = await axios.get("http://localhost:3500/user", {
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

      await axios.post("http://localhost:3500/user/profile", formData, {
        headers: {
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
      });

      setProfileImage(URL.createObjectURL(file));
      //setProfilePicUrl(responseProfilepicture.data.profilepicUrl);
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
          {/* <img src={profile.profilepic} id="user1"></img> */}
        </div>
        <div id="text">
          <h2>
            Hello {profile.firstname} {profile.lastname} !
          </h2>
          <p>Driving excellence in education with cutting-edge technology</p>
        </div>
        {/*   <div
          style={{
            display: "flex",
            justifyContent: "center",
            // marginTop: "5vh",
            // marginLeft: "8vh",
          }}
        >
          <CustomNewButton
            text="Change Profile Picture"
            onFileSelect={handleNewProfilePicture}
          />
        </div> */}
        <div className="greytext">
          <label htmlFor="upload-button">
            <CustomNewButton
              text="Add Profile Picture"
              onFileSelect={handleNewProfilePicture}
              style={{ marginLeft: "12vh" }}
            />
          </label>
          {/*   <input
            id="upload-button"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleNewProfilePicture}
          /> */}
        </div>
      </div>

      <div id="container2">
        <h4>
          {profile.firstname} {profile.lastname}
        </h4>
        <span className="greytext">{profile.designation}</span>
        <i className="fas fa-envelope"></i>
        <span className="greytext">{profile.email}</span>
        {/*  <i className="fas fa-phone-alt"></i>
        <span className="greytext">+94772452625</span>
        <i className="fas fa-map-marker-alt"></i>
        <span className="greytext">No. 47/220, Lake street, Colombo 07</span> */}
      </div>
      <img src={stars} id="stars"></img>
    </div>
  );
};
