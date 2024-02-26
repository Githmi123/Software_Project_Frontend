import React from 'react'
import MainLeftPane from '../components/MainLeftPane/MainLeftPane'
import MainRightPane from '../components/MainRightPane/MainRightPane'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from '@mui/material';
import '../styles/RecentPage.css'

const table_data = [
 { Assignment : 'EE4250 Database Systems - Assignment 1', Batch:'22nd',Status:'Submitted for Grading',Graded:201},
 { Assignment : 'EE5262 Design Patterns - Assignment 1', Batch:'22nd',Status:'Graded',Graded:201},
 { Assignment : 'EE3307 GUI Programming - Assignment 1', Batch:'22nd',Status:'Submitted for Grading',Graded:201},
]

const RecentPage = () => {
  return (
    <div>
      <MainLeftPane/>
      <MainRightPane >
      <Button  sx={{m:2, width:'100px', height:'50px',color:'black',fontWeight:'bold' }} startIcon={<ArrowBackIcon/>}>Home</Button>
        <h1 id='heading' >Recents</h1>

        <div id='recent-table'>
          <table>
            <tr id='recent-table-headers' sx={{fontWeight:'bolder'}}>
              <th>Assignment</th>
              <th>Batch</th>
              <th>Status</th>
              <th>Graded</th>
            </tr>
            {table_data.map((val,key)=>{
              return(
                <tr key={key}>
                  <td>{val.Assignment}</td>
                  <td>{val.Batch}</td>
                  <td>{val.Status}</td>
                  <td>{val.Graded}</td>
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

export default RecentPage
