// import logo from './logo.svg';
// import './Login.css';
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import "../styles/UserProfile.css";
// import "../components/RightPane/RightPane.css";
import { Button, InputAdornment, TextField } from "@mui/material";
import { LeftPane } from "../components/LeftPane/LeftPane";
import { RightPane } from "../components/RightPane/RightPane";
import { UserProfileLeftPane } from "../components/UserProfileLeftPane/UserProfileLeftPane";
import { UserProfileRightPane } from "../components/UserProfileRightPane/UserProfileRightPane";
import MainLeftPane from "../components/MainLeftPane/MainLeftPane";
import MainRightPane from "../components/MainRightPane/MainRightPane";
import BasicTabs from "../components/BasicTabs";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import refreshAccessToken from "../services/AuthService";
import { NewUserProfileRightPane } from "../components/NewUserProfileRightPane/NewUserProfileRightPane";
import SettingsRightPane from "../components/SettingsRightPane/SettingsRightPane";

import setting from "../images/settings.png";

import "../styles/Settings.css";

function Settings() {
  return (
    <div id="body">
      {/* <UserProfileLeftPane></UserProfileLeftPane> */}
      {/* <MainLeftPane /> */}
      {/* <SettingsRightPane/> */}
      {/* <UserProfileRightPane /> */}
      {/* <NewUserProfileRightPane/> */}
      <MainRightPane>
        {/* <Button
          sx={{
            m: 2,
            width: "100px",
            height: "50px",
            color: "white",
            fontWeight: "bold",
          }}
          startIcon={<ArrowBackIcon />}
          onClick={() => window.history.back()}
        >
          Back
        </Button> */}
        {/* <h3>Settings</h3> */}
        <div id="setting-title-container">
          <img src={setting} id="setting-image" />
          <div id="setting-titles">
            <h3 id="settings-title">Settings</h3>
            <h5 id="settings-sub-title">
              Keeping your profile up-to-date ensures a personalized grading
              experience.
            </h5>
            <p id="setting-para">
              Make the most of our platform by tailoring it to your needs.
            </p>
          </div>
        </div>
        <div
          style={{
            backgroundColor: "white",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "#5783cf",
              width: "100%",
            }}
          >
            <h3 id="setting-title">Settings</h3>
            <h6
              id="heading-manage-account"
              color="black"
              fontWeight="bolder"
              style={{ fontSize: "3vh" }}
            >
              Manage My Account
            </h6>
          </div> */}

          <BasicTabs />
        </div>
      </MainRightPane>
    </div>
  );
}

export default Settings;
