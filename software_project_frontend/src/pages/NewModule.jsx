import React from 'react'
import MainLeftPane from '../components/MainLeftPane/MainLeftPane'
import MainRightPane from '../components/MainRightPane/MainRightPane'
import { Button, TextField, colors } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import '../styles/MyModulesPage.css'
import { Link } from 'react-router-dom'; 

const NewModule = () => {
  return (
    <div className = "align1">
        <MainLeftPane/>
        <MainRightPane>
        <Button  sx={{m:2, width:'100px', height:'50px',color:'black',fontWeight:'bold' }} startIcon={<ArrowBackIcon/>} onClick={() => window.history.back()} >Home</Button>
  
        <h2  style={{fontSize:"19px", marginLeft: '35px', marginTop: '5px' ,color:'black'}}>Module Code</h2>
        <TextField
          sx={{
            marginLeft: 5,
            marginTop: 3,
            marginRight: 5,
            '& input': {
              fontSize: '0.8rem', // Adjust the font size to decrease the size of the text box
              padding: '8px 12px', // Adjust the padding to match the new font size
            },
          }}
        >
  Module Code
</TextField>

        <h2  style={{fontSize:"19px", marginLeft: '35px', marginTop: '15px' ,color:'black'}}>Module Name</h2>
        <TextField
          sx={{
            marginLeft: 5,
            marginTop: 3,
            marginRight: 5,
            '& input': {
              fontSize: '0.8rem', // Adjust the font size to decrease the size of the text box
              padding: '8px 12px', // Adjust the padding to match the new font size
            },
          }}
        >

</TextField>
        <h2  style={{fontSize:"19px", marginLeft: '35px', marginTop: '15px' ,color:'black'}}>Description</h2>
        <TextField
          sx={{
            marginLeft: 5,
            marginTop: 3,
            marginRight: 5,
            '& input': {
              fontSize: '0.8rem', // Adjust the font size to decrease the size of the text box
              padding: '8px 12px', // Adjust the padding to match the new font size
            },
          }}
        >
  Module Code
</TextField>

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
