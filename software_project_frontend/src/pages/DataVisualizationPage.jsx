import React, { useEffect, useState } from 'react'
import MainLeftPane from '../components/MainLeftPane/MainLeftPane'
import MainRightPane from '../components/MainRightPane/MainRightPane'
import { Button, Checkbox } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { LineChart } from '@mui/x-charts/LineChart';
import refreshAccessToken from "../services/AuthService";

import '../styles/AssignmentsPage.css'
import ScrollableMainRightPane from '../components/MainRightPane/ScrollableMainRightPane'
// import BarChart from '../components/Other/BarChartComponent'
import BasicArea from '../components/BasicArea'
import { useParams } from 'react-router-dom'
import Cookies from "js-cookie";
import axios from "axios";
import { BarChart } from '@mui/x-charts/BarChart';





const DataVisualizationPage = () => {

    const { selectedModuleCode, batch, assignmentid } = useParams();
    const [data, setData] = useState([0,0,0,0,0,0,0,0,0,0]);

  
    function groupData(array){
        let newData = [0,0,0,0,0,0,0,0,0,0];
        let num;
        for(let i = 0; i < array.length; i++)
        {
            if(array[i] % 5 === 0){
                console.log(array[i]);
                num = array[i] / 5;
                newData[num - 1]++;
                
            }
            else{
                console.log(array[i]);
                num = Math.floor(array[i]/5);
                newData[num]++;
                
            }
            
        }
        return newData;
    };


    useEffect(() => {
        const fetchData = async () => {
          try {
            await refreshAccessToken();
            const response = await axios.get(
              `http://localhost:3500/report/batch/${batch}/modulecode/${selectedModuleCode}/assignmentid/${assignmentid}`,
              {
                headers: {
                  Authorization: `Bearer ${Cookies.get("accessToken")}`,
                },
              }
            );

            const {marks} = response.data;
            if (marks && Array.isArray(marks)) {
                const marksArray = marks.map(marksObject => marksObject.marks);
                // setMarksArray(marksArray);
                

                console.log(marksArray);
                const data = groupData(marksArray);
                setData(data);
                console.log(data);
            } else {
            console.error("The response does not contain 'marks' or 'marks' is not an array");
            }
            
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
      }, []);



    return (
        <div className = "align1">
            <MainLeftPane/>
            <MainRightPane>
                <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                    <BarChart
                        xAxis={[{ scaleType:"band", data: ['0-5', '6-10', '11-15', '16-20', '21-25', '26-30', '31-35', '36-40', '41-45', '46-50'] }]}
                        series={[
                            {
                            data: data,
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
