import { IconButton, Stack } from '@mui/material'
import React, { useState, useEffect } from 'react'
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
import MenuIcon from '@mui/icons-material/Menu';

const ButtonSet = () => {
  const [selectedButton, setSelectedButton] = useState("");
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const handleSelectedButton = (name) => {
      setSelectedButton(name);
  }

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };


const getData = async () => {
  console.log("Fetching modules data");
  setLoading(true);
 

  const response = await axios.get(
    `${baseUrl}/modules`
  );
  console.log(response.data);

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
    <div>

    <IconButton className="hamburger-icon" onClick={handleMenuToggle}>
        <MenuIcon />
      </IconButton>

    <Stack direction='column' spacing={2} alignItems='center' alignContent='center' marginLeft={"3vh"} className={`button-set ${menuOpen ? 'show' : ''}`}>

        <LeftPaneButton icon={DashboardIcon} name="Dashboard" link = '/Dashboard' isSelected={selectedButton === "Dashboard"} onClick={() => handleSelectedButton('Dashboard')}/>
        <LeftPaneButton icon={AssignmentIcon} name="New Assignment" link = '/NewAssignment' isSelected={selectedButton === "New Assignment"} onClick={() => handleSelectedButton("New Assignment")}/>
        <LeftPaneButton icon={BookIcon} name="My Modules" link = '/MyModulePage' isSelected={selectedButton === "My Modules"} onClick={() => handleSelectedButton("My Modules")}/>
        <LeftPaneButton icon={SettingsIcon} name="Settings" link = '/Settings' isSelected={selectedButton === "Settings"} onClick={() => handleSelectedButton("Settings")}/>
        <LeftPaneButton icon={LiveHelpIcon} name="Help" link = '/Help' isSelected={selectedButton === "Help"} onClick={() => handleSelectedButton("Help")}/>


    </Stack>


{menuOpen && (
  <div className={`menu ${menuOpen ? 'show' : ''}`}>
    <LeftPaneButton icon={DashboardIcon} name="Dashboard" link='/Dashboard' isSelected={selectedButton === "Dashboard"} onClick={() => handleSelectedButton('Dashboard')} />
    <LeftPaneButton icon={AssignmentIcon} name="New Assignment" link='/NewAssignment' isSelected={selectedButton === "New Assignment"} onClick={() => handleSelectedButton("New Assignment")} />
    <LeftPaneButton icon={BookIcon} name="My Modules" link='/MyModulePage' isSelected={selectedButton === "My Modules"} onClick={() => handleSelectedButton("My Modules")} />
    <LeftPaneButton icon={SettingsIcon} name="Settings" link='/Settings' isSelected={selectedButton === "Settings"} onClick={() => handleSelectedButton("Settings")} />
    <LeftPaneButton icon={LiveHelpIcon} name="Help" link='/Help' isSelected={selectedButton === "Help"} onClick={() => handleSelectedButton("Help")} />
  </div>
)}

</div>

  )
}

export default ButtonSet
