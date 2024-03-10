import React, { useState } from 'react'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MainLeftPane from '../components/MainLeftPane/MainLeftPane'
import MainRightPane from '../components/MainRightPane/MainRightPane'
import AddCircleIcon from '@mui/icons-material/AddCircle';

import '../styles/MyModulesPage.css'
import CustomNewButton from '../components/Buttons/CustomNewButton';


const table_data_modules = [
    { Module_Code:'EE5262',Module_Name:'Database Systems',Credits:2},
    { Module_Code:'EE5263',Module_Name:'Database Systems 2',Credits:2},
    { Module_Code:'EE5264',Module_Name:'Database Systems 3',Credits:2},
    { Module_Code:'EE5265',Module_Name:'Database Systems 4',Credits:2},  
];

const headers = ['Module_Code','Module_Name','Credits'];

const MyModulesPage = () => {
  const [selectedModule, setSelectedModule] = useState(null);

  const handleNewModule = (event) => {
    // Handle adding a new module
  };

  const handleSelectedModule = (moduleCode) => {
    setSelectedModule(moduleCode === selectedModule ? null : moduleCode);
  };

  return (
    <div>
      <MainLeftPane/>
      <MainRightPane>
        <Button  sx={{m:2, width:'100px', height:'50px',color:'black',fontWeight:'bold' }} startIcon={<ArrowBackIcon/>}>Home</Button>
        <h1 id='heading' >My Modules</h1>
        <div>
          <Link to='/NewModule'  style={{ textDecoration: 'none' }}>
          <CustomNewButton text='New Module' onClick={handleNewModule} />
          </Link>
          
        </div>
        <div className='column'>
          <table className='table'>
            <thead className='tablehead'>
              <tr>
                {headers.map((header) => (
                  <th key={header}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {table_data_modules.map((moduledata) => (
                <tr
                  className='table-data'
                  key={moduledata.Module_Code}
                  style={{
                    backgroundColor: moduledata.Module_Code === selectedModule ? '#7894DB' : '#E3DDE8',
                    color: moduledata.Module_Code === selectedModule ? 'white' : 'black',
                    border: '7px solid white', 
                    borderRadius: '10px'
                  }}
                  onClick={() => handleSelectedModule(moduledata.Module_Code)}
                >
                  <td>{moduledata.Module_Code}</td>
                  <td>{moduledata.Module_Name}</td>
                  <td>{moduledata.Credits}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </MainRightPane>
    </div>
  )
}

export default MyModulesPage;
