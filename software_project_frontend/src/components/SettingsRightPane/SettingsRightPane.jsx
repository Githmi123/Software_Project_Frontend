import React from 'react'
import BasicTabs from '../BasicTabs'
import Button from "@mui/material/Button";
import CustomButton from "../Buttons/CustomButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function SettingsRightPane() {
  return (
    <div id="rightpane">
        <Button
          sx={{
            m: 2,
            width: "100px",
            height: "50px",
            color: "black",
            fontWeight: "bold",
            marginLeft: "10vh",
          }}
          startIcon={<ArrowBackIcon />}
          onClick={() => window.history.back()}
        >
          Back
        </Button>
        <h1 id="heading">Settings</h1>
      <h6 id="heading" color='black' fontWeight= "bolder" style={{fontSize:"3vh"}}>Manage My Account</h6>
      <BasicTabs/>
    </div>
  )
}

export default SettingsRightPane
