import React from 'react'
import { Button } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MainLeftPane from '../components/MainLeftPane/MainLeftPane'
import MainRightPane from '../components/MainRightPane/MainRightPane'
import AddCircleIcon from '@mui/icons-material/AddCircle';

import '../styles/MyModulesPage.css'


const table_data_modules = [
    { Module_Code:'EE5262',Module_Name:'Database Systems'},
    { Module_Code:'EE5262',Module_Name:'Database Systems'},
    { Module_Code:'EE5262',Module_Name:'Database Systems'},
    { Module_Code:'EE5262',Module_Name:'Database Systems'},  
   ]
   

const MyModulesPage = () => {
  return (
    <div>
      <MainLeftPane/>
      <MainRightPane>
      <Button  sx={{m:2, width:'100px', height:'50px',color:'black',fontWeight:'bold' }} startIcon={<ArrowBackIcon/>}>Home</Button>
      <h1 id='heading' >My Modules</h1>

      <Button sx={{ m: 2, width: '150px', height: '50px', color: 'black', fontWeight: 'bold', textTransform: 'none' }} startIcon={<AddCircleIcon/>} id='new-module-button'>New Module</Button>
   
      <div id='module-table'>
          <table>
            <tr id='module-table-headers' sx={{fontWeight:'bolder'}}>
              <th>Module Code</th>
              <th>Module Name</th>
            </tr>
            {table_data_modules.map((val,key)=>{
              return(
                <tr key={key} style={{backgroundColor:'#E3DDE8'}}>
                  <td>{val.Module_Code}</td>
                  <td>{val.Module_Name}</td>
                </tr>
              )
            }

            )

            }

          </table>
        </div>



      </MainRightPane>
    </div>
  )
}

export default MyModulesPage
