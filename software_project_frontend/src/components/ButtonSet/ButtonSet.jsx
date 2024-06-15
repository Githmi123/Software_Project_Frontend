import { Button, Stack } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BookIcon from '@mui/icons-material/Book';
import SettingsIcon from '@mui/icons-material/Settings';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import axios from "axios";
import refreshAccessToken from '../../services/AuthService';
import  "./ButtonSet.css"
import LeftPaneButton from '../Buttons/LeftPaneButton';
import '../ButtonSet/ButtonSet.css'

const buttonStyle = {
  textAlign: 'left',
  textTransform: 'none',
  backgroundColor: 'white',
  color: 'black',
  width: '200px',
  display: 'flex',
};

const ButtonSet = () => {
  const [selectedButton, setSelectedButton] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSelectedButton = (name) => {
      setSelectedButton(name);
  }
  const buttonStyle = {
    backgroundColor: selectedButton === "/Dashboard" ? '#ff0000' : 'white',
            color: selectedButton === "/Dashboard" ? 'white' : 'black',
    display: 'flex',
    justifyContent: 'flex-start',
    textAlign: 'left',
    width: '100%',
};


const getData = async () => {
  console.log("Fetching modules data");
  setLoading(true);
 

  const response = await axios.get(
    "http://localhost:3500/modules"
  );
  console.log(response.data);
  // setTableDataModules(response.data);

  console.log(response.data);

  console.log("Checking for duplicate Module_Codes:");
  const moduleCodes = response.data.map(
    (moduledata) => moduledata.modulecode
  );

  console.log(moduleCodes);

  const uniqueModuleCodes = new Set(moduleCodes);
  if (moduleCodes.length !== uniqueModuleCodes.size) {
    console.error("Duplicate Module_Codes detected!");
  } else {
    console.log("No duplicate Module_Codes found.");
  }

  setLoading(false);

}

useEffect(() => {
  const fetchModules = async (e) => {
    try {
      await getData();
    } catch (error) {
      if(error.response && error.response.status === 401){
        const newAccessToken = await refreshAccessToken();
        console.log("New access token: ", newAccessToken);

        if(newAccessToken){
          try {
            // await refreshAccessToken();
            await getData();
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        }
      }
      else{
        console.error("Error fetching data:", error);
      }
    }
  };

  fetchModules();
}, []);


  return (
    <Stack direction='column' spacing={2} alignItems='center' alignContent='center' marginLeft={"3vh"} className='button-set'>
        {/* <Button className="button" style={buttonStyle} sx={{'& .MuiButton-startIcon': {marginRight: '45px',}}} component={Link} to='/RecentPage'  startIcon={<DashboardIcon/>} endIcon={<ArrowForwardIosIcon/>}>Dashboard</Button>
        <Button className='button'  style={buttonStyle} sx={{textAlign:'left'}} startIcon={<AssignmentIcon/> } component={Link} to="/NewAssignment" endIcon={<ArrowForwardIosIcon/>}>New Assignment</Button>
        <Button className='button' style={buttonStyle} sx={{'& .MuiButton-startIcon': {marginRight: '39px',}}} component={Link} to='/MyModulePage' startIcon={<BookIcon/>} endIcon={<ArrowForwardIosIcon/>}>My Modules</Button>
        <Button className='button' style={buttonStyle} sx={{'& .MuiButton-startIcon': {marginRight: '65px',}}} startIcon={<SettingsIcon/>} endIcon={<ArrowForwardIosIcon/>}>Settings</Button>
        <Button className='button' style={buttonStyle} sx={{'& .MuiButton-startIcon': {marginRight: '90px',}}} startIcon={<LiveHelpIcon/>} endIcon={<ArrowForwardIosIcon/>}>Help</Button>    */}


        <LeftPaneButton icon={DashboardIcon} name="Dashboard" link = '/Dashboard' isSelected={selectedButton === "Dashboard"} onClick={() => handleSelectedButton('Dashboard')}/>
        <LeftPaneButton icon={AssignmentIcon} name="New Assignment" link = '/NewAssignment' isSelected={selectedButton === "New Assignment"} onClick={() => handleSelectedButton("New Assignment")}/>
        <LeftPaneButton icon={BookIcon} name="My Modules" link = '/MyModulePage' isSelected={selectedButton === "My Modules"} onClick={() => handleSelectedButton("My Modules")}/>
        <LeftPaneButton icon={SettingsIcon} name="Settings" link = '/Settings' isSelected={selectedButton === "Settings"} onClick={() => handleSelectedButton("Settings")}/>
        <LeftPaneButton icon={LiveHelpIcon} name="Help" link = '/Help' isSelected={selectedButton === "Help"} onClick={() => handleSelectedButton("Help")}/>


    </Stack>

  )
}

export default ButtonSet
