import React, { useState } from 'react'
import MainLeftPane from '../components/MainLeftPane/MainLeftPane'
import MainRightPane from '../components/MainRightPane/MainRightPane'
import { Button, Checkbox } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { LineChart } from '@mui/x-charts/LineChart';


import '../styles/AssignmentsPage.css'
import ScrollableMainRightPane from '../components/MainRightPane/ScrollableMainRightPane'
import BarChart from '../components/Other/BarChartComponent'
import BasicArea from '../components/BasicArea'





const DataVisualizationPage = () => {

  

    return (
        <div className = "align1">
            <MainLeftPane/>
            <MainRightPane>
                <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                    <LineChart
                        xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                        series={[
                            {
                            data: [2, 5.5, 2, 8.5, 1.5, 5],
                            area: true,
                            },
                        ]}
                        width={500}
                        height={300}
                    />
                </div>
                
            </MainRightPane>
        </div>
      )
}

export default DataVisualizationPage
