import { Button } from '@mui/material'
import React from 'react'

const CustomButton = ({text, onClick, backgroundColor, textColor}) => {
  return (
    <div>
        <Button
            variant='contained'
            style={{margin:"10px", backgroundColor:backgroundColor, color:textColor, width : "20vh", textTransform: "capitalize", border: "2px solid #7894DB"}}
            onClick={onClick}
        > 
            {text}
        </Button>
      
    </div>
  )
}

export default CustomButton;
