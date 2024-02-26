import React from 'react'
import '../MainRightPane1/MainRightPane1.css'
import { Box, Button } from '@mui/material'

//import SearchBar from './SearchBar';


const MainRightPane1 = ({ children }) => {
  return (
    <div className='maindiv-right'>
      
      <div className='container' style={{margin:'40px 40px 40px auto'}}>   
      {children} 
        
        
      </div>

     
    </div>
  )
}

export default MainRightPane1