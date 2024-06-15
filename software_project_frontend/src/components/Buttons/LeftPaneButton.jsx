import { Button, Tooltip } from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Height } from '@mui/icons-material';
import '../ButtonSet/ButtonSet.css'



function LeftPaneButton({ icon: Icon, name, link, isSelected, onClick }) {

    
  

        const buttonStyle = {
        backgroundColor: isSelected ? '#7894DB' : 'inherit', // Change to the color you want
        color: isSelected ? 'white' : 'black', // Change to the color you want
        display: 'flex',
        justifyContent: 'flex-start',
        textAlign: 'left',
        width: '10%',
        
        // Height:"auto"
    };

    

    return (
        <Tooltip title = {name} arrow>
            <Button
            className="button"
            component={Link} to={link}
            startIcon={<Icon />}
            sx={buttonStyle}
            onClick={onClick} 
            
        >
            <span className='button-text'>{name}</span>
        </Button>
        </Tooltip>
        
    )
}

export default LeftPaneButton