import { Button, Stack } from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BookIcon from '@mui/icons-material/Book';
import SettingsIcon from '@mui/icons-material/Settings';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


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
  const [selectedButton, setSelectedButton] = useState(false);

  const handleSelectedButton = (button) => {
      setSelectedButton(button);
  }
  const buttonStyle = {
    backgroundColor: selectedButton === "/Dashboard" ? '#ff0000' : 'white',
            color: selectedButton === "/Dashboard" ? 'white' : 'black',
    display: 'flex',
    justifyContent: 'flex-start',
    textAlign: 'left',
    width: '100%',
};

  return (
    <Stack direction='column' spacing={2} alignItems='center' alignContent='center' marginLeft={"3vh"}>
        {/* <Button className="button" style={buttonStyle} sx={{'& .MuiButton-startIcon': {marginRight: '45px',}}} component={Link} to='/RecentPage'  startIcon={<DashboardIcon/>} endIcon={<ArrowForwardIosIcon/>}>Dashboard</Button>
        <Button className='button'  style={buttonStyle} sx={{textAlign:'left'}} startIcon={<AssignmentIcon/> } component={Link} to="/NewAssignment" endIcon={<ArrowForwardIosIcon/>}>New Assignment</Button>
        <Button className='button' style={buttonStyle} sx={{'& .MuiButton-startIcon': {marginRight: '39px',}}} component={Link} to='/MyModulePage' startIcon={<BookIcon/>} endIcon={<ArrowForwardIosIcon/>}>My Modules</Button>
        <Button className='button' style={buttonStyle} sx={{'& .MuiButton-startIcon': {marginRight: '65px',}}} startIcon={<SettingsIcon/>} endIcon={<ArrowForwardIosIcon/>}>Settings</Button>
        <Button className='button' style={buttonStyle} sx={{'& .MuiButton-startIcon': {marginRight: '90px',}}} startIcon={<LiveHelpIcon/>} endIcon={<ArrowForwardIosIcon/>}>Help</Button>    */}


        <LeftPaneButton icon={DashboardIcon} name="Dashboard" link = '/Dashboard' />
        <LeftPaneButton icon={AssignmentIcon} name="New Assignment" link = {`/NewAssignment/${null}/${null}`}/>
        <LeftPaneButton icon={BookIcon} name="My Modules" link = '/MyModulePage'/>
        <LeftPaneButton icon={SettingsIcon} name="Settings" link = '/Settings'/>
        <LeftPaneButton icon={LiveHelpIcon} name="Help" link = '/Help'/>


    </Stack>

  )
}

export default ButtonSet
