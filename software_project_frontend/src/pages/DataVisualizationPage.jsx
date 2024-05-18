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
import FolderList from '../components/FolderList'





const DataVisualizationPage = () => {

    const { selectedModuleCode, batch, assignmentid } = useParams();
    const [data, setData] = useState([0,0,0,0,0,0,0,0,0,0]);
    const [parameters, setParameters] = useState([0, 0, 0, 0, 0, 0, 0])

  
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

    function findMode(array){
        let mode = [];
        let count = 0;
        let val;

        for(let i = 0; i < array.length; i++){
            val = array.filter(v => v === array[i]).length;
            if(val > count){
                mode.length = 0;
                mode.push(array[i]);
                count = val;
            }
            else if(val === count){
                mode.push(array[i]);
            }
        }
        const set = new Set(mode);
        return set;
    };


    function calculate(array) {
        array.sort((a, b) => a - b);
        const min = Math.min(...array);
        const max = Math.max(...array);
        const mean = array.reduce((acc, val) => acc + val, 0) / array.length;
        const mode = findMode(array);
          const median = (array.length % 2 === 0) 
            ? ((array[array.length / 2 - 1] + array[array.length / 2]) / 2 )
            : array[Math.floor(array.length / 2)];
        const variance = array.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / array.length;
        const standardDeviation = Math.sqrt(variance);
        
        return [min, max, mean, mode, median, variance, standardDeviation];
      }


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
                const parameters = calculate(marksArray);
                setData(data);
                console.log(data);
                console.log(parameters);
                setParameters(parameters);
                
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
                <Button
                    sx={{
                        m: 2,
                        width: "100px",
                        height: "50px",
                        color: "black",
                        fontWeight: "bold",
                    }}
                    startIcon={<ArrowBackIcon />}
                    onClick={() => window.history.back()}
                    >
                    Home
                </Button>
                <h1 id="heading">Distribution curve for {selectedModuleCode} : {assignmentid}</h1>
                <div style={{display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"row"}}>
                    <BarChart
                        xAxis={[{ scaleType:"band", data: ['0-5', '6-10', '11-15', '16-20', '21-25', '26-30', '31-35', '36-40', '41-45', '46-50'], label:"Score" }]}
                        yAxis={[{label:"No.of students"}]}
                        series={[
                            {
                            data: data,
                            area: true,
                            label: "No. of Students"
                            },
                        ]}
                        width={500}
                        height={400}
                        // xAxisLabel = "Score"
                        // yAxisLabel="No.of students"
                    />
                    <FolderList 
                    min = {parameters[0]}
                    max = {parameters[1]}
                    mean = {parameters[2]}
                    mode = {parameters[3]}
                    median = {parameters[4]}
                    variance = {parameters[5]}
                    standardDeviation = {parameters[6]}
                    />
                        
                </div>
                    
                
            </MainRightPane>
        </div>
      )
}

export default DataVisualizationPage
