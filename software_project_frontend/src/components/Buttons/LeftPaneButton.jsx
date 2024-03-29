import { Button } from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import DashboardIcon from '@mui/icons-material/Dashboard';



function LeftPaneButton({ icon: Icon, name, link }) {

    const [selectedButton, setSelectedButton] = useState(false);

  const handleSelectedButton = (button) => {
      setSelectedButton(button);
  }
  

        const buttonStyle = {
        backgroundColor: selectedButton ? '#ff0000' : 'initial', // Change to the color you want
        color: selectedButton ? 'white' : 'black', // Change to the color you want
        display: 'flex',
        justifyContent: 'flex-start',
        textAlign: 'left',
        width: '10%',
    };

    

    return (
        <Button
            className="button"
            component={Link} to={link}
            startIcon={<Icon />}
            sx={buttonStyle}
            onClick={handleSelectedButton}
        >
            {name}
        </Button>
    )
}

export default LeftPaneButton