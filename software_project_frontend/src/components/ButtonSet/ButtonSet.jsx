import { Button, Stack } from '@mui/material'
import React from 'react'
import '../ButtonSet/ButtonSet.css'
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BookIcon from '@mui/icons-material/Book';
import SettingsIcon from '@mui/icons-material/Settings';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const ButtonSet = () => {
  return (
    <Stack direction='column' spacing={2} alignItems='center'  >
        <Button className='button' sx={{textAlign:'left'}} startIcon={<DashboardIcon/>} endIcon={<ArrowForwardIosIcon/>}>Dashboard</Button>
        <Button className='button' sx={{textAlign:'left'}} startIcon={<AssignmentIcon/>} endIcon={<ArrowForwardIosIcon/>}>New Assignment</Button>
        <Button className='button'startIcon={<BookIcon/>} endIcon={<ArrowForwardIosIcon/>}>My Modules</Button>
        <Button className='button' startIcon={<SettingsIcon/>} endIcon={<ArrowForwardIosIcon/>}>Settings</Button>
        <Button className='button' startIcon={<LiveHelpIcon/>} endIcon={<ArrowForwardIosIcon/>}>Help</Button>   
    </Stack>
  )
}

export default ButtonSet
