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
import MainRightPane from "../MainRightPane/MainRightPane";

export const NewUserProfileRightPane = () => {
  const [profileData, setProfileData] = useState("");
  const baseUrl = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    async function getProfileData() {
      try {
      

        const response = await axios.get(`${baseUrl}/user`);
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
      await axios.post(`${baseUrl}/user`, profileData);
      navigate("/Dashboard");
      console.log("new profile data :", profileData);
    } catch (error) {
      console.log("error editing the profile : ", error);
    }
  };

  return (
    <MainRightPane>
      <ProfilePage/>
    </MainRightPane>
  );
};
