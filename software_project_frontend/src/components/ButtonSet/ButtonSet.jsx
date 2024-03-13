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
//import '../ButtonSet/ButtonSet.css'

const buttonStyle = {
  textAlign: 'left',
  textTransform: 'none',
  backgroundColor: 'white',
  color: 'black',
  width: '200px',
  display: 'flex',
};

const ButtonSet = () => {


  return (
    <Stack direction='column' spacing={2} alignItems='center' alignContent='left' >
        <Button className="button" style={buttonStyle} sx={{'& .MuiButton-startIcon': {marginRight: '45px',}}} component={Link} to='/RecentPage'  startIcon={<DashboardIcon/>} endIcon={<ArrowForwardIosIcon/>}>Dashboard</Button>
        <Button className='button'  style={buttonStyle} sx={{textAlign:'left'}} startIcon={<AssignmentIcon/> } component={Link} to="/NewAssignment" endIcon={<ArrowForwardIosIcon/>}>New Assignment</Button>
        <Button className='button' style={buttonStyle} sx={{'& .MuiButton-startIcon': {marginRight: '39px',}}} component={Link} to='/MyModulePage' startIcon={<BookIcon/>} endIcon={<ArrowForwardIosIcon/>}>My Modules</Button>
        <Button className='button' style={buttonStyle} sx={{'& .MuiButton-startIcon': {marginRight: '65px',}}} startIcon={<SettingsIcon/>} endIcon={<ArrowForwardIosIcon/>}>Settings</Button>
        <Button className='button' style={buttonStyle} sx={{'& .MuiButton-startIcon': {marginRight: '90px',}}} startIcon={<LiveHelpIcon/>} endIcon={<ArrowForwardIosIcon/>}>Help</Button>   

    </Stack>
  )
}

export default ButtonSet
