import React, { useState } from 'react'
import MainLeftPane from '../components/MainLeftPane/MainLeftPane'
import MainRightPane from '../components/MainRightPane/MainRightPane'
import { Button } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import CustomNewButton from '../components/Buttons/CustomNewButton'

import { Link } from 'react-router-dom';

import '../styles/BatchesPage.css'

const batches = ["22th batch", "23rd batch", "24th batch", "25th batch"];



const BatchesPage = () => {

    const [selectedBatch, setSelectedBatch] = useState(null);

    const handleNewBatch = (event) => {

    };

    const handleSelectedBatch = (batch) =>{
        setSelectedBatch(batch);
    }

    

    return (
        <div>
            <MainLeftPane/>
            <MainRightPane>
                <Button  sx={{m:2, width:'100px', height:'50px',color:'black',fontWeight:'bold' }} startIcon={<ArrowBackIcon/>} onClick={() => window.history.back()} >Home</Button>
                <h1 id='heading' >Module</h1>
                <div>
                    <Link to="/NewBatchPage">
                    
                    <CustomNewButton text = "New Batch" onClick={handleNewBatch}/>
                    </Link>
                </div>

                <div className='column'>
                    {batches.map( (batch) => (
                         <Link to="/Assignments" key={batch} style={{ textDecoration: 'none', color: 'inherit' }}>
                         <Button
                             variant="contained"
                             style={{
                                 margin: '10px',
                                 backgroundColor: selectedBatch === batch ? '#7894DB' : '#E3DDE8',
                                 color: selectedBatch === batch ? 'white' : 'black',
                                 width: '60vh',
                                 textTransform: 'capitalize',
                                 borderRadius: '2vh',
                                 border: '0px solid #7894DB'
                             }}
                             onClick={() => handleSelectedBatch(batch)}
                         >
                             {batch}
                         </Button>
                     </Link>
                    ))}
                </div>

                
                
                {/* <div id='module-table'>
                    <table>
                        <tr id='module-table-headers' sx={{fontWeight:'bolder'}}>
                        <th>Module Code</th>
                        <th>Module Name</th>
                        </tr>
                        {table_data_modules.map((val,key)=>{
                        return(
                            <tr key={key} style={{backgroundColor:'#E3DDE8', borderRadius:'30px', margin:'0 0 5px 0'}}>
                            <td>{val.Module_Code}</td>
                            <td>{val.Module_Name}</td>
                            </tr>
                        )
                        }
            
                        )
            
                        }
            
                    </table>
                    </div> */}
            
        
        
            </MainRightPane>
        </div>
      )
}

export default BatchesPage
