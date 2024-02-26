import React from 'react'
// import MainLeftPane1 from '../components/MainLeftPane1/MainLeftPane1'
import MainRightPane1 from '../components/MainRightPane1/MainRightPane1'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from '@mui/material';
import MainLeftPane1 from '../components/MainLeftPane1/MainLeftPane1';

const RecentPage1 = () => {
  return (
    <div>
      <MainLeftPane1/>
      <MainRightPane1 >
      <Button  sx={{m:2, width:'100px', height:'50px',color:'black',fontWeight:'bold' }} startIcon={<ArrowBackIcon/>}>Home</Button>
        <h1>Recent</h1>
      </MainRightPane1>
    </div>
  )
}

export default RecentPage1