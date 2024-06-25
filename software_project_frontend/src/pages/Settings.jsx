import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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

      <MainRightPane>

        <h3 id="heading">Settings</h3>
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
         

          <BasicTabs />
        </div>
      </MainRightPane>
    </div>
  );
}

export default Settings;
