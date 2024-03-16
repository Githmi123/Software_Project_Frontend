import React, { useState } from 'react'
import MainLeftPane from '../components/MainLeftPane/MainLeftPane'
import MainRightPane from '../components/MainRightPane/MainRightPane'
import { Button, Checkbox } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'


import '../styles/AssignmentsPage.css'
import ScrollableMainRightPane from '../components/MainRightPane/ScrollableMainRightPane'
import BarChart from '../components/Other/BarChartComponent'





const DataVisualizationPage = () => {

  

    return (
        <div className = "align1">
            <MainLeftPane/>
            <ScrollableMainRightPane>
                <Button  sx={{m:2, width:'100px', height:'50px',color:'black',fontWeight:'bold' }} startIcon={<ArrowBackIcon/>} onClick={() => window.history.back()} >Home</Button>
                <h1 id='heading' >EE5345 Control Systems - Assignment 2</h1>
                <div className='row'>
                    <div id = "rectangle">
                        
                    </div>

                    <BarChart/>

                </div>
                
        
            </ScrollableMainRightPane>
        </div>
      )
}

export default DataVisualizationPage
