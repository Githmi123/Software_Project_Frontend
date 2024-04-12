import React, { useState, useEffect } from 'react'
import MainLeftPane from '../components/MainLeftPane/MainLeftPane'
import MainRightPane from '../components/MainRightPane/MainRightPane'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from '@mui/material';
import refreshAccessToken from '../services/AuthService';
import { Link } from 'react-router-dom';
import Cookies from "js-cookie";

import SearchAppBar from '../components/Other/SearchBar/SearchBar';

import '../styles/RecentPage.css'

const table_data = [
 { Assignment : 'EE4250 Database Systems - Assignment 1', Batch:'22nd',Status:'Submitted for Grading',Graded:201},
 { Assignment : 'EE5262 Design Patterns - Assignment 1', Batch:'22nd',Status:'Graded',Graded:201},
 { Assignment : 'EE3307 GUI Programming - Assignment 1', Batch:'22nd',Status:'Submitted for Grading',Graded:201},
]

const headers = ['Assignment','Batch', 'Status','Graded'];

const RecentPage = () => {
 const [selectedRecentModule, setSelectedRecentModule]=useState(null);
 const [data, setData]=useState([{}]);

//  useEffect(() => {
//   fetch('http://localhost:5000/members')
//   .then(response => response.json())
//   .then(data => console.log(data))
//   .catch(error => console.error(error));

// }, [])

 useEffect(() => {
  async function fetchData(){
    try{
      await refreshAccessToken();
      const response = await fetch('http://localhost:5000/members', {
        headers: {
          Authorization: `Bearer ${Cookies.get('accessToken')}`,
        }
      });
      const data = await response.json();
      console.log(data);

    }
    catch (e){
      console.error(e);
    }
  }

  fetchData();
 }, [])
 

 const handleRecentModule = (event)=>{

 };

 const handleSelectedRecentModule=(Assignment)=>{
  setSelectedRecentModule(Assignment===selectedRecentModule?null:Assignment);
 };


  return (
    <div className = "align1">
      <MainLeftPane/>
      <MainRightPane >
      <Button  sx={{m:2, width:'100px', height:'50px',color:'black',fontWeight:'bold' }} startIcon={<ArrowBackIcon/>} onClick={() => window.history.back()} >Home</Button>
        {/* <SearchAppBar/> */}
        <h1 id='heading' >Recents</h1>

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
              {table_data.map((recentdata) => (
                <tr
                  className='table-data'
                  key={recentdata.Assignment}
                  style={{
                    backgroundColor: recentdata.Assignment === selectedRecentModule ? '#7894DB' : '#E3DDE8',
                    color: recentdata.Assignment === selectedRecentModule ? 'white' : 'black',
                    border: '7px solid white', 
                    borderRadius: '10px'
                  }}
                  onClick={() => handleSelectedRecentModule(recentdata.Assignment)}
                >
                <td><Link to="/AnswerScripts" style={{ textDecoration: 'none', color: 'inherit' }}>{recentdata.Assignment} </Link></td>
                <td><Link to="/AnswerScripts" style={{ textDecoration: 'none', color: 'inherit' }}> {recentdata.Batch}  </Link></td>
                <td><Link to="/AnswerScripts" style={{ textDecoration: 'none', color: 'inherit' }}>{recentdata.Status}</Link></td>
                <td><Link to="/AnswerScripts" style={{ textDecoration: 'none', color: 'inherit' }}>  {recentdata.Graded} </Link></td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

        
      </MainRightPane>
    </div>
  )
}

export default RecentPage
