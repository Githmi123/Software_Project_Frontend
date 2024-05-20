import React from "react";
import "../MainLeftPane/MainLeftPane.css";
import projectlogo from "../../images/rs.png";
import ButtonSet from "../ButtonSet/ButtonSet";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import UserProfileBar from "../UserProfileBar/UserProfileBar";
import SwipeableEdgeDrawer from "../Drawer";
import AccountMenu from "../AccountMenu";
import Divider from "@mui/material/Divider";

// import { Drawer } from '@mui/material'

const MainLeftPane = () => {
  return (
    <div className="maindiv-left">
      <div id="ProfileBar">
        {/* <UserProfileBar/> */}
        {/* <SwipeableEdgeDrawer/> */}
        <AccountMenu />
      </div>

      <div className="maindiv-left">
        <img
          id="main-left-pane-image"
          src={projectlogo}
          style={{ width: "50%" }}
        />

        <ButtonSet />
      </div>
    </div>
  );
};

export default MainLeftPane;
