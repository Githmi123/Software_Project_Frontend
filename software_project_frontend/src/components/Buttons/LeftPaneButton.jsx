import { Button } from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Height } from '@mui/icons-material';



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
        <Button
            className="button"
            component={Link} to={link}
            startIcon={<Icon />}
            sx={buttonStyle}
            onClick={onClick}
        >
            {name}
        </Button>
    )
}

export default LeftPaneButton