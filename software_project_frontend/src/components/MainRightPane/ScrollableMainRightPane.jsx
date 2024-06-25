import React from 'react'
import '../MainRightPane/MainRightPane.css'
import { Box, Button } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const ScrollableMainRightPane = ({ children }) => {
  return (
    <div className='maindiv-right'>
      
      <div className='containerScrollable' style={{margin:'40px 40px 40px auto'}}>   
      {children} 
      
        
      </div>

     
    </div>
  )
}

export default ScrollableMainRightPane
