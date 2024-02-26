import React from 'react'
import '../MainRightPane/MainRightPane.css'
import { Box, Button } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
//import SearchBar from './SearchBar';


const MainRightPane = () => {
  return (
    <div className='maindiv-right'>
      
      <div className='container' style={{margin:'40px 40px 40px auto'}}>    
        <Button  sx={{m:2, width:'100px', height:'50px',color:'black',fontWeight:'bold' }} startIcon={<ArrowBackIcon/>}>Home</Button>
        
      </div>

     
    </div>
  )
}

export default MainRightPane
