import React, { useState } from 'react'
import MainLeftPane from '../components/MainLeftPane/MainLeftPane'
import MainRightPane from '../components/MainRightPane/MainRightPane'
import { Button } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import CustomNewButton from '../components/Buttons/CustomNewButton'

import '../styles/BatchesPage.css'

const batches = [
    { assignmentNo:'01', name: "Assignment 01-quiz", date_created: '24/12/2023', status: "Graded" },
    { assignmentNo: '02', name: "Inclass 01-quiz", date_created: '03/01/2024', status: "Not Graded" },
    { assignmentNo: '03', name: "Takehome 01 ", date_created: '05/01/2024', status: "Graded" },
    { assignmentNo: '04', name: "Assignment 02", date_created: '20/01/2024', status: "Not Graded" }
  ];


const AssignmentsPage = () => {

    const [selectedAssignmentNo, setSelectedAssignmentNo] = useState(null);

    const handleNewBatch = (event) => {
    };

    const handleSelectedAssignmentNo = (assignmentNo) =>{
        setSelectedAssignmentNo(assignmentNo);
    }

    

    return (
        <div>
            <MainLeftPane/>
            <MainRightPane>
                <Button  sx={{m:2, width:'100px', height:'50px',color:'black',fontWeight:'bold' }} startIcon={<ArrowBackIcon/>}>Home</Button>
                <h1 id='heading' >Module - Batch</h1>
                <div>
                    <CustomNewButton text = "New Assignment" onClick={handleNewBatch}/>
                </div>

                <div className='column'>
                    <table style={{ width: '70%' }}>
                        <thead style={{color: "#B5B7C0", fontWeight:"lighter"}}>
                            <tr>
                                <th>Assignment No.</th>
                                <th>Name</th>
                                <th>Date Created</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {batches.map((batchInfo) => (
                                <tr key={batchInfo.assignmentNo} style={{ backgroundColor: selectedAssignmentNo === batchInfo.assignmentNo ? '#7894DB' : '#E3DDE8', color: selectedAssignmentNo === batchInfo.assignmentNo ? 'white' : 'black', border: '7px solid white', // Border style
                                borderRadius: '10px', 
                                padding: '5px', 
                                cursor: 'pointer' 
                                    }}
                                >
                                    <td onClick={() => handleSelectedAssignmentNo(batchInfo.assignmentNo)}>
                                        {batchInfo.assignmentNo}
                                    </td>
                                    <td onClick={() => handleSelectedAssignmentNo(batchInfo.assignmentNo)}>
                                        {batchInfo.name}
                                    </td>
                                    <td onClick={() => handleSelectedAssignmentNo(batchInfo.assignmentNo)}>
                                        {batchInfo.date_created}
                                    </td>
                                    <td onClick={() => handleSelectedAssignmentNo(batchInfo.assignmentNo)}>
                                        {batchInfo.status}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>




                    {/* {batches.map( (batchInfo) => (
                        <Button key={batchInfo.assignmentNo} variant="contained" style={{ margin: '10px', backgroundColor: selectedAssignmentNo === batchInfo.assignmentNo ? '#7894DB' : '#E3DDE8', color: selectedAssignmentNo === batchInfo.assignmentNo ? 'white' : 'black', width: '60vh', textTransform: 'capitalize', borderRadius: "2vh",border: '0px solid #7894DB' }} 
                        onClick={() => handleSelectedAssignmentNo(batchInfo.assignmentNo)}>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            {batchInfo.assignmentNo}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            {batchInfo.name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            {batchInfo.age}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            {batchInfo.assignmentNo}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                             
                        </Button>
                    ))} */}
                

                
                
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
            
                </div>
        
            </MainRightPane>
        </div>
      )
}

export default AssignmentsPage
