import React, { useState } from "react";
import "../MainLeftPane/MainLeftPane.css";
import projectlogo from "../../images/rs.png";
import ButtonSet from "../ButtonSet/ButtonSet";
import { Drawer, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import UserProfileBar from "../UserProfileBar/UserProfileBar";
import SwipeableEdgeDrawer from "../Drawer";
import AccountMenu from "../AccountMenu";
import Divider from "@mui/material/Divider";
import MenuIcon from '@mui/icons-material/Menu';

// import { Drawer } from '@mui/material'

const MainLeftPane = () => {

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };


  


  
  // const isMenuOpen = Boolean(anchorEl);

  return (
    <div className="maindiv-left">
      
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer(true)}
        className="hamburger-icons"
        
      >
        <MenuIcon />
      </IconButton>
      <div style={{ backgroundColor: "inherit" }} id="ProfileBar">
              <AccountMenu />
            </div>
    

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <div
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <div className="maindiv-left-pane">
            <div className="main-left-pane">
              <img
                id="main-left-pane-image"
                src={projectlogo}
              />

              <ButtonSet />
            </div>
            {/* <div style={{ backgroundColor: "inherit" }} id="ProfileBar">
              <AccountMenu />
            </div> */}
          </div>
        </div>
      </Drawer>

      {/* <Menu
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
      </Menu> */}

      <div className="main-left">
        <img
          id="main-left-pane-image"
          src={projectlogo}
          // style={{ width: "50%" }}
        />

        <ButtonSet />
      </div>
      {/* <div style={{backgroundColor:"#C3D3FB"}} id = "ProfileBar"> */}
      <div style={{ backgroundColor: "inherit" }} id="ProfileBar1">

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
