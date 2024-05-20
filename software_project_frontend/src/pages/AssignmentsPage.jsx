import React, { useState, useEffect } from "react";
import MainLeftPane from "../components/MainLeftPane/MainLeftPane";
import MainRightPane from "../components/MainRightPane/MainRightPane";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CustomNewButton from "../components/Buttons/CustomNewButton";
import { useParams } from "react-router-dom";

import refreshAccessToken from "../services/AuthService";

import Cookies from "js-cookie";
import axios from "axios";

import { Link } from "react-router-dom";

import "../styles/AssignmentsPage.css";

/* const batches = [
  {
    assignmentNo: "01",
    name: "Assignment 01-quiz",
    date_created: "24/12/2023",
    status: "Graded",
  },
  {
    assignmentNo: "02",
    name: "Inclass 01-quiz",
    date_created: "03/01/2024",
    status: "Not Graded",
  },
  {
    assignmentNo: "03",
    name: "Takehome 01 ",
    date_created: "05/01/2024",
    status: "Graded",
  },
  {
    assignmentNo: "04",
    name: "Assignment 02",
    date_created: "20/01/2024",
    status: "Not Graded",
  },
]; */

const headers = ["Assignment No.", "Name", "Date Created", "Status"];

const AssignmentsPage = () => {
  const { selectedModuleCode, batch } = useParams();

  const [selectedAssignmentNo, setSelectedAssignmentNo] = useState([]);
  const [tableDataAssignments, setTableDataAssignments] = useState([]);

  useEffect(() => {
    const fetchAssignments = async (e) => {
      try {
        await refreshAccessToken();

        const response = await axios.get(
          `http://localhost:3500/assignment/${selectedModuleCode}/${batch}`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("accessToken")}`,
            },
          }
        );
        if (response.data && Array.isArray(response.data.rows)) {
          // Extract the assignment data from the rows
          const assignmentData = response.data.rows;

          // Separate the assignment data into rows and values
          const tableDataAssignments = assignmentData.map((assignment) => {
            // Extract values from each assignment object
            const rowValues = Object.values(assignment);
            // Return the row values
            return rowValues;
          });

          // Set the separated assignment data to the state
          setTableDataAssignments(tableDataAssignments);

          console.log("Assignment Data:", tableDataAssignments);
        } else {
          console.error(
            "No assignment data found in the response:",
            response.data
          );
        }

        console.log("the selected module code", selectedModuleCode);
        console.log("the selected batch", batch);

        // console.log("Checking for duplicate Module_Codes:");
        // const moduleCodes = response.data.map(
        //   (moduledata) => moduledata.modulecode
        // );

        // console.log(moduleCodes);

        // const uniqueModuleCodes = new Set(moduleCodes);
        // if (moduleCodes.length !== uniqueModuleCodes.size) {
        //   console.error("Duplicate Module_Codes detected!");
        // } else {
        //   console.log("No duplicate Module_Codes found.");
        // }
      } catch (error) {
        console.error("Error fetching modules:", error);
      }
    };

    fetchAssignments();
  }, []);

  const handleNewBatch = (event) => {};

  const handleSelectedAssignmentNo = (assignmentNo) => {
    setSelectedAssignmentNo(assignmentNo);
  };

  const formattedAssignments = tableDataAssignments.map(
    (assignment, index) => ({
      assignmentNo: index + 1,
      name: assignment[2],
      dateCreated: new Date(assignment[4]).toLocaleDateString(),
      assignmentId: assignment[3],
    })
  );

  return (
    <div className="align1">
      <MainLeftPane />
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
        <h1 id="heading">
          {selectedModuleCode} - {batch} batch
        </h1>
        <div>
          {/* <CustomNewButton text = "New Assignment" onClick={handleNewBatch}/> */}
          <Link to={`/NewAssignment/${selectedModuleCode}/${batch}`} style={{ textDecoration: "none" }}>
          
            {/* Wrap the button with Link */}
            <CustomNewButton text="New Assignment" onClick={handleNewBatch} />
          </Link>
        </div>

        <div className="column">
          <table className="tableStyle">
            <thead className="theadStyle">
              <tr>
                {headers.map((header) => (
                  <th key={header}>{header}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {formattedAssignments.map((assignment) => (
                <tr
                  key={assignment.assignmentNo}
                  className="trStyle"
                  style={{
                    backgroundColor:
                      selectedAssignmentNo === assignment.assignmentNo
                        ? "#7894DB"
                        : "#E3DDE8",
                    color:
                      selectedAssignmentNo === assignment.assignmentNo
                        ? "white"
                        : "black",
                    border: "7px solid white",
                    borderRadius: "10px",
                  }}
                >
                  <td>
                    <Link
                      to={`/AnswerScripts/batch/${batch}/modulecode/${selectedModuleCode}/assignmentid/${assignment.assignmentId}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      {assignment.assignmentNo}
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={`/AnswerScripts/batch/${batch}/modulecode/${selectedModuleCode}/assignmentid/${assignment.assignmentId}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      {assignment.name}
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={`/AnswerScripts/batch/${batch}/modulecode/${selectedModuleCode}/assignmentid/${assignment.assignmentId}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      {assignment.dateCreated}
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={`/AnswerScripts/batch/${batch}/modulecode/${selectedModuleCode}/assignmentid/${assignment.assignmentId}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      {assignment.assignmentId}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* {batches.map( (batchInfo) => (
                        <Button key={batchInfo.assignmentNo} variant="contained" style={{ margin: '10px', backgroundColor: selectedAssignmentNo === batchInfo.assignmentNo ? '#7894DB' : '#E3DDE8', color: selectedAssignmentNo === batchInfo.assignmentNo ? 'white' : 'black', width: '60vh', textTransform: 'capitalize', borderRadius: "2vh",border: '0px solid #7894DB' }} 
                        onClick={() => handleSelectedAssignmentNo(batchInfo.assignmentNo)}>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            {batchInfo.assignmentNo}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            {batchInfo.name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            {batchInfo.age}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            {batchInfo.assignmentNo}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                             
                        </Button>
                    ))} */}

          {/* <div id='module-table'>
                    <table>
                        <tr id='module-table-headers' sx={{fontWeight:'bolder'}}>
                        <th>Module Code</th>
                        <th>Module Name</th>
                        </tr>
                        {table_data_modules.map((val,key)=>{
                        return(
                            <tr key={key} style={{backgroundColor:'#E3DDE8', borderRadius:'30px', margin:'0 0 5px 0'}}>
                            <td>{val.Module_Code}</td>
                            <td>{val.Module_Name}</td>
                            </tr>
                        )
                        }
            
                        )
            
                        }
            
                    </table>
                    </div> */}
          {/* <div>
            <Link>
              <CustomNewButton text="Edit Batch" />
            </Link>
            <Link>
              <CustomNewButton text="Delete Batch" />
            </Link>
          </div> */}
        </div>
      </MainRightPane>
    </div>
  );
};

export default AssignmentsPage;
