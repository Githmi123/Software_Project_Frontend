import React from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { Button } from '@mui/material'

const CustomNewButton = ({text, onClick}) => {
  return (
    <div style={{display: "flex", marginLeft: 'auto' }}>
      <Button sx={{ ml: "auto", mr: "10vh", width: 'auto', padding: '3vh', height: '50px', color: 'black', fontWeight: 'bold', textTransform: 'none', backgroundColor: "#C3D3FB", borderRadius: "2vh" }}  onClick={onClick} startIcon={<AddCircleIcon/>} className='new-module-button'>{text}</Button>
        
    </div>
  )
}

export default CustomNewButton
