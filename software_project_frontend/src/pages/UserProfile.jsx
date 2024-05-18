// import logo from './logo.svg';
// import './Login.css';
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/UserProfile.css";
import "../components/RightPane/RightPane.css";

import { LeftPane } from "../components/LeftPane/LeftPane";
import { RightPane } from "../components/RightPane/RightPane";
import { UserProfileLeftPane } from "../components/UserProfileLeftPane/UserProfileLeftPane";
import { UserProfileRightPane } from "../components/UserProfileRightPane/UserProfileRightPane";

import refreshAccessToken from "../services/AuthService";

function UserProfile() {
  return (
    <div id="body">
      <UserProfileLeftPane></UserProfileLeftPane>
      <UserProfileRightPane />
    </div>
  );
}

export default UserProfile;
