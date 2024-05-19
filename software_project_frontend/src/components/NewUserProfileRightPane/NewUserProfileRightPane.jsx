import React, { useState, useEffect } from "react";
import "./NewUserProfileRightPane.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CustomButton from "../Buttons/CustomButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import refreshAccessToken from "../../services/AuthService";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import ProfilePage from "../ProfilePage";

export const NewUserProfileRightPane = () => {
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
      <ProfilePage/>
    </div>
  );
};
