import { Button } from '@mui/material'
import CancelIcon from '@mui/icons-material/Cancel';
import React from 'react'

const RemoveFileButton = () => {
  return (
    <div>
      <Button
        variant='contained'
        style={{margin:"10px", width : "20vh", textTransform: "capitalize", backgroundColor: "#ED8484", borderRadius:"3vh"}}
        startIcon = {<CancelIcon style={{color:"black"}}/>}
      > 
        Remove File
      </Button>
      
    </div>
  )
}

export default RemoveFileButton;
