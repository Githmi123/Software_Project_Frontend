import React from 'react'
import MainLeftPane from '../components/MainLeftPane/MainLeftPane'
import MainRightPane from '../components/MainRightPane/MainRightPane'
import { Button, TextField, colors } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { Link } from 'react-router-dom'; 

const NewModule = () => {
  return (
    <div>
        <MainLeftPane/>
        <MainRightPane>
        <Button  sx={{m:2, width:'100px', height:'50px',color:'black',fontWeight:'bold' }} startIcon={<ArrowBackIcon/>} onClick={() => window.history.back()} >Home</Button>
  
        <h2  style={{ marginLeft: '35px', marginTop: '5px' ,color:'black'}}>Module Code</h2>
        <TextField sx={{ marginLeft: 5, marginTop: 3, marginRight:5 }}>Module Code</TextField>

        <h2  style={{ marginLeft: '35px', marginTop: '15px' ,color:'black'}}>Module Name</h2>
        <TextField sx={{ marginLeft: 5, marginTop: 3, marginRight:5 }}>Module Name</TextField>

        <h2  style={{ marginLeft: '35px', marginTop: '15px' ,color:'black'}}>Description</h2>
        <TextField sx={{ marginLeft: 5, marginTop: 3, marginRight:5 }}>Description</TextField>

        <div style={{marginTop:'50px',display: 'flex', justifyContent: 'center'}}>
        {/* <Button sx={{marginLeft:'15px',color:'#7894DB',backgroundColor:'white', border: '1px solid #7894DB','&:hover': { backgroundColor: '#7894DB', color: 'white' }}}>Cancel</Button> */}

        <Link to="/MyModulePage" style={{ textDecoration: 'none' }}>
            <Button sx={{marginLeft:'15px',color:'#7894DB',backgroundColor:'white', border: '1px solid #7894DB','&:hover': { backgroundColor: '#7894DB', color: 'white' }}}>Cancel</Button>
          </Link>

        <Button sx={{marginLeft:'15px',color:'#7894DB',backgroundColor:'white', border: '1px solid #7894DB','&:hover': { backgroundColor: '#7894DB', color: 'white' }}}>Save</Button>
        </div>
       

        </MainRightPane>
      
    </div>
  )
}

export default NewModule
