import React from 'react'
import MainLeftPane from '../components/MainLeftPane/MainLeftPane'
import MainRightPane from '../components/MainRightPane/MainRightPane'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from '@mui/material';

const RecentPage = () => {
  return (
    <div>
      <MainLeftPane/>
      <MainRightPane >
      <Button  sx={{m:2, width:'100px', height:'50px',color:'black',fontWeight:'bold' }} startIcon={<ArrowBackIcon/>}>Home</Button>
        <h1>Recent</h1>
      </MainRightPane>
    </div>
  )
}

export default RecentPage
