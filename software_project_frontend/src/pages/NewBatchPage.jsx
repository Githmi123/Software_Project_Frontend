import React, { useState } from 'react'
import { TextField ,Button} from '@mui/material'
import MainLeftPane from '../components/MainLeftPane/MainLeftPane'
import MainRightPane from '../components/MainRightPane/MainRightPane'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CustomButton from '../components/Buttons/CustomButton';
import { Link , useNavigate} from 'react-router-dom';

import '../styles/NewAssignmentPage.css'
import "../styles/NewBatchPage.css"

const NewBatchPage = () => {
  const [batchNumber, setBatchNumber] = useState(''); 
  const navigate = useNavigate();

  const handleNewBatch= () => {
    console.log("new batch : ",batchNumber);
    navigate(`/Batches/${batchNumber}`); 
  }

  return (
    <div>
               <MainLeftPane/>
               <MainRightPane>
               <Button  sx={{m:2, width:'100px', height:'50px',color:'black',fontWeight:'bold' }} startIcon={<ArrowBackIcon/>} onClick={() => window.history.back()} >Home</Button>

               <h1 id='heading-new-batch-page' >New Batch</h1>
               <div id='textfield-set'>
               <span id='label1-new-batch-page'>Batch Number</span>
                <TextField
                    id="outlined-basic"
                    label="Batch Number"
                    variant="outlined"
                    onChange={(e) => setBatchNumber(e.target.value)}
                    //value={assignmentName}
                    //onChange={handleAssignmentNameChange}
                    sx={{ m: '2vh', maxWidth: '70vh', padding:"0", position:"relative"}}
                />

               </div>


               <Link to="/Batches">
               <Button id='add-button' onClick={handleNewBatch} variant='contained'>
                    Add
                </Button>
               </Link>
               

              
               </MainRightPane>
        
        

      
    </div>
  )
}

export default NewBatchPage
