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
      <div className="maindiv-left">
        <img
          id="main-left-pane-image"
          src={projectlogo}
          // style={{ width: "50%" }}
        />

        <ButtonSet />
      </div>
      {/* <div style={{backgroundColor:"#C3D3FB"}} id = "ProfileBar"> */}
      <div style={{ backgroundColor: "#5C469C" }} id="ProfileBar">
        {/* <UserProfileBar/> */}
        {/* <SwipeableEdgeDrawer/> */}
        <AccountMenu />
      </div>

      {/* <div className="maindiv-left">
        <img
          id="main-left-pane-image"
          src={projectlogo}
          style={{ width: "50%" }}
        />

        <ButtonSet />
      </div> */}
    </div>
  );
};

export default MainLeftPane;
