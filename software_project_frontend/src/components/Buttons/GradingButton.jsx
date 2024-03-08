import React from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { Button } from '@mui/material'

const GradingButton = ({text, onClick, icon : Icon}) => {
  return (
    <div style={{display: "flex", marginLeft: 'auto' }}>
      <Button sx={{ ml: "auto", mr: "5vh", width: 'auto', padding: '3vh', height: '50px', color: 'black', fontWeight: 'bold', textTransform: 'none', backgroundColor: "#C6EFF1", borderRadius: "2vh" }}  onClick={onClick} startIcon={<Icon/>} className='new-module-button'>{text}</Button>
        
    </div>
  )
}

export default GradingButton
