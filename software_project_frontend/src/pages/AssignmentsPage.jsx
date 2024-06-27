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


const headers = ["Assignment No.", "Name", "Date Created", "Status"];

const AssignmentsPage = () => {
  const { selectedModuleCode, batch } = useParams();

  const [selectedAssignmentNo, setSelectedAssignmentNo] = useState([]);
  const [tableDataAssignments, setTableDataAssignments] = useState([]);
  const [loading, setLoading] = useState(false);

  const baseUrl = process.env.REACT_APP_BASE_URL;

  const fetch = async () => {
    setLoading(true);
    const response = await axios.get(
      `${baseUrl}/assignment/${selectedModuleCode}/${batch}`
    );
    if (response.data && Array.isArray(response.data.rows)) {
     
      const assignmentData = response.data.rows;

    
      const tableDataAssignments = assignmentData.map((assignment) => {
    
        const rowValues = Object.values(assignment);

        return rowValues;
      });

  
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

   setLoading(false);
  }

  useEffect(() => {
    const fetchAssignments = async (e) => {
      try {
        await fetch();
        
      } catch (error) {
        if(error.response && error.response.status === 401){
          const newAccessToken = await refreshAccessToken();
          console.log("New access token: ", newAccessToken);

          if(newAccessToken){
            try {
         
              await fetch();
            } catch (error) {
              console.error("Error fetching data:", error);
            }
          }
        }
        else{
          console.error("Error fetching data:", error);
        }
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
   
      <MainRightPane>
        <Button id = "back-button"
          
          startIcon={<ArrowBackIcon />}
          onClick={() => window.history.back()}
        >
          Back
        </Button>
        <h1 id="heading">
          {selectedModuleCode} - {batch} batch
        </h1>
        <div>
        
          <Link to={'/NewAssignment'} style={{ textDecoration: "none" }}>
          
     
            <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}><CustomNewButton text="New Assignment" onClick={handleNewBatch} /></div>
            
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

          

        

        
        </div>
      </MainRightPane>
    </div>
  );
};

export default AssignmentsPage;
