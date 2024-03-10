import React, { useState } from 'react'
import MainLeftPane from '../components/MainLeftPane/MainLeftPane'
import MainRightPane from '../components/MainRightPane/MainRightPane'
import { Button, Checkbox } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { CheckCircle } from '@mui/icons-material';
import { Edit } from '@mui/icons-material';
import { TrendingUp } from '@mui/icons-material';
import CustomNewButton from '../components/Buttons/CustomNewButton'

import { Link } from 'react-router-dom'; 

import '../styles/AssignmentsPage.css'
import RemoveFileButton from '../components/Buttons/RemoveFileButton'
import GradingButton from '../components/Buttons/GradingButton'

const batches = [
    { regNo:'EG_2024_5671.png', date: "12/12/2023", size: '314.5 kB', status: "Graded" },
    { regNo: 'EG_2024_5678.png', date: "12/12/2023", size: '314.5 kB', status: "Not Graded" },
    { regNo: 'EG_2024_5568.png', date: "12/12/2023 ", size: '314.5 kB', status: "Graded" },
    { regNo: 'EG_2024_5672.png', date: "12/12/2023", size: '314.5 kB', status: "Not Graded" },
    { regNo: 'EG_2024_5588.png', date: "12/12/2023 ", size: '314.5 kB', status: "Graded" },
    { regNo: 'EG_2024_5511.png', date: "12/12/2023 ", size: '314.5 kB', status: "Graded" },
    { regNo: 'EG_2024_5600.png', date: "12/12/2023", size: '314.5 kB', status: "Not Graded" },
    { regNo: 'EG_2024_5545.png', date: "12/12/2023 ", size: '314.5 kB', status: "Graded" },
    { regNo: 'EG_2024_5673.png', date: "12/12/2023 ", size: '314.5 kB', status: "Graded" }
  ];

const headers = ['Assignment No.', 'date', 'Date Created', 'Status'];


const AnswerScriptsPage = () => {

    const [selectedAssignmentNos, setSelectedAssignmentNos] = useState([]);

    const handleNewAnswerScript = (event) => {
    };

    const handleGradeAllFiles = (event) => {
    };

    const handleGradeSelectedFiles = (event) => {
    };

    const handleGradeManually = (event) => {
    };

    const handleVisualizeAGraph = (event) => {
    };

    const handleToggleAssignmentNo = (regNo) => {
        setSelectedAssignmentNos((prevSelectedAssignmentNos) => {
            if (prevSelectedAssignmentNos.includes(regNo)) {
                return prevSelectedAssignmentNos.filter((no) => no !== regNo);
            } else {
                return [...prevSelectedAssignmentNos, regNo];
            }
        });
    };

    const handleRemove = (regNo) => {

    };

    

    return (
        <div>
            <MainLeftPane/>
            <MainRightPane>
                <Button  sx={{m:2, width:'100px', height:'50px',color:'black',fontWeight:'bold' }} startIcon={<ArrowBackIcon/>} onClick={() => window.history.back()} >Home</Button>
                <h1 id='heading' >Uploaded Answer Scripts</h1>
                <div>
                    <CustomNewButton text = "Uploaded Answer Script" onClick={handleNewAnswerScript}/>
                </div>

                <div className='columnAnswerScripts'>
                    <table className = "tableStyle2">
                    

                        <tbody>
                            {batches.map((batchInfo) => (
                                <tr key={batchInfo.regNo} className='trStyleAnswerScript' style={{ backgroundColor: selectedAssignmentNos.includes(batchInfo.regNo) ? '#F0F0F0' : '#E3DDE8', color: selectedAssignmentNos.includes(batchInfo.regNo) ? 'black' : 'black', // Border style
                                borderRadius: '10px'
                                    }}>
                                <td>
                                    <Checkbox
                                        color="primary"
                                        checked={selectedAssignmentNos.includes(batchInfo.regNo)}
                                        onChange={() => handleToggleAssignmentNo(batchInfo.regNo)}
                                    />
                                </td>
                                <td onClick={() => handleToggleAssignmentNo(batchInfo.regNo)}>
                                        {batchInfo.regNo}
                                </td>
                                <td onClick={() => handleToggleAssignmentNo(batchInfo.regNo)}>
                                    {batchInfo.date}
                                </td>
                                <td onClick={() => handleToggleAssignmentNo(batchInfo.regNo)}>
                                    {batchInfo.size}
                                </td>
                                <td onClick={() => handleToggleAssignmentNo(batchInfo.regNo)}>
                                    <RemoveFileButton/>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>




                    {/* {batches.map( (batchInfo) => (
                        <Button key={batchInfo.regNo} variant="contained" style={{ margin: '10px', backgroundColor: selectedAssignmentNo === batchInfo.regNo ? '#7894DB' : '#E3DDE8', color: selectedAssignmentNo === batchInfo.regNo ? 'white' : 'black', width: '60vh', textTransform: 'capitalize', borderRadius: "2vh",border: '0px solid #7894DB' }} 
                        onClick={() => handleSelectedAssignmentNo(batchInfo.regNo)}>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            {batchInfo.regNo}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            {batchInfo.date}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            {batchInfo.age}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            {batchInfo.regNo}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                             
                        </Button>
                    ))} */}
                

                
                
                {/* <div id='module-table'>
                    <table>
                        <tr id='module-table-headers' sx={{fontWeight:'bolder'}}>
                        <th>Module Code</th>
                        <th>Module date</th>
                        </tr>
                        {table_data_modules.map((val,key)=>{
                        return(
                            <tr key={key} style={{backgroundColor:'#E3DDE8', borderRadius:'30px', margin:'0 0 5px 0'}}>
                            <td>{val.Module_Code}</td>
                            <td>{val.Module_date}</td>
                            </tr>
                        )
                        }
            
                        )
            
                        }
            
                    </table>
                    </div> */}
            
                </div>

                <div className='row'>
                    <GradingButton text = "Grade all files" onClick={{handleGradeAllFiles}} icon = {AssignmentTurnedInIcon}/>
                    <GradingButton text = "Grade selected files" onClick={{handleGradeSelectedFiles}} icon = {CheckCircle}/>
                    {/* <GradingButton text = "Grade manually" onClick={{handleGradeManually}} icon = {Edit }/> */}
                    {/* <GradingButton text = "Visualize a graph" onClick={{handleVisualizeAGraph}} icon = {TrendingUp}/> */}

                    <Link to="/ManualGradingPage" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <GradingButton text="Grade manually" icon={Edit} />
                    </Link>

                    <Link to="/DataVisualization" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <GradingButton text = "Visualize a graph"  icon = {TrendingUp} />
                    </Link>

                   
                </div>
        
            </MainRightPane>
        </div>
      )
}

export default AnswerScriptsPage
