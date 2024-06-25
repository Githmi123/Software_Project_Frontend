import React from 'react'
import { Button, Tooltip } from '@mui/material'
import './GradingButton.css';

const GradingButton = ({text, onClick, icon : Icon}) => {
  return (
    <div data-testid="icon" className="icon-container">
      <Tooltip title = {text} arrow>
      <Button  onClick={onClick} startIcon={<Icon/>} className='new-module-button'>{text}</Button>
      </Tooltip>
        
    </div>
  )
}

export default GradingButton
