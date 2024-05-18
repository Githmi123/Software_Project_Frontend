import React from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { Button } from '@mui/material'

const GradingButton = ({text, onClick, icon : Icon}) => {
  return (
    <div data-testid="icon" style={{display: "flex"}}>
      <Button sx={{ width: 'auto', padding: '3vh', height: '5vh', color: 'black', fontWeight: 'bold', textTransform: 'none', backgroundColor: "#C6EFF1", borderRadius: "2vh", fontSize:"1.5vh" }}  onClick={onClick} startIcon={<Icon/>} className='new-module-button'>{text}</Button>
        
    </div>
  )
}

export default GradingButton
