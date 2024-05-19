// import logo from './logo.svg';
// import './Login.css';
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import "../styles/UserProfile.css";
// import "../components/RightPane/RightPane.css";

import { LeftPane } from "../components/LeftPane/LeftPane";
import { RightPane } from "../components/RightPane/RightPane";
import { UserProfileLeftPane } from "../components/UserProfileLeftPane/UserProfileLeftPane";
import { UserProfileRightPane } from "../components/UserProfileRightPane/UserProfileRightPane";
import MainLeftPane from '../components/MainLeftPane/MainLeftPane'

import refreshAccessToken from "../services/AuthService";
import { NewUserProfileRightPane } from "../components/NewUserProfileRightPane/NewUserProfileRightPane";
import SettingsRightPane from "../components/SettingsRightPane/SettingsRightPane";

function Settings() {
  return (
    <div id="body">
      <UserProfileLeftPane></UserProfileLeftPane>
      {/* <MainLeftPane/> */}
      <SettingsRightPane/>
      {/* <UserProfileRightPane /> */}
      {/* <NewUserProfileRightPane/> */}
    </div>
  );
}

export default Settings;
