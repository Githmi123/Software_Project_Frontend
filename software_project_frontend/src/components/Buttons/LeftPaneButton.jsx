import { Button, Tooltip } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import '../ButtonSet/ButtonSet.css'



function LeftPaneButton({ icon: Icon, name, link, isSelected, onClick }) {

    
  

    const buttonStyle = {
        backgroundColor: isSelected ? '#7894DB' : 'inherit',
        color: isSelected ? 'white' : 'black',
        display: 'flex',
        justifyContent: 'flex-start',
        textAlign: 'left',
        width: '10%',
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