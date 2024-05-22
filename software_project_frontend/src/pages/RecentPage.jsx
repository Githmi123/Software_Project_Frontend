import React, { useState, useEffect } from "react";
import MainLeftPane from "../components/MainLeftPane/MainLeftPane";
import MainRightPane from "../components/MainRightPane/MainRightPane";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button } from "@mui/material";
import refreshAccessToken from "../services/AuthService";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import SearchAppBar from "../components/Other/SearchBar/SearchBar";
import { useParams } from "react-router-dom";
import "../styles/RecentPage.css";
import UserProfileBar from "../components/UserProfileBar/UserProfileBar";
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import CustomNewButton from "../components/Buttons/CustomNewButton";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import { Delete, Edit } from "@mui/icons-material";

const headers = ["Assignment", "Batch", "Date Created"];

const RecentPage = () => {
  const [selectedRecentModule, setSelectedRecentModule] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [moduleData, setModuleData] = useState([]);
  const [batchData, setBatchData] = useState([]);

  const navigate = useNavigate();

  const columns = [
    { field: 'assignment', headerName: 'Assignment', width: 150 },
    { field: 'batch', headerName: 'Batch', width: 300 },
    { field: 'dateCreated', headerName: 'Date Created', width: 150 },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // await refreshAccessToken();
        const modulesResponse = await axios.get(
          "http://localhost:3500/modules",
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("accessToken")}`,
            },
          }
        );
        const modules = modulesResponse.data;
        const formattedModules = modules.map((module) => ({
          moduleCode: module.modulecode,
          moduleName: module.modulename,
          moduleCredits: module.credits,
        }));
        setModuleData(formattedModules);

        console.log("Module Data", formattedModules);

        const allBatches = [];
        for (const module of modules) {
          const batchResponse = await axios.get(
            `http://localhost:3500/batch/${module.modulecode}`,
            {
              headers: {
                Authorization: `Bearer ${Cookies.get("accessToken")}`,
              },
            }
          );
          const batches = batchResponse.data.map((batch) => ({
            moduleCode: module.modulecode,
            batch: batch.batch,
            moduleName: module.modulename,
          }));
          allBatches.push(...batches);
        }
        setBatchData(allBatches);

        console.log("Batch Data", allBatches);

        const allAssignments = [];
        for (const batch of allBatches) {
          const assignmentResponse = await axios.get(
            `http://localhost:3500/assignment/${batch.moduleCode}/${batch.batch}`,
            {
              headers: {
                Authorization: `Bearer ${Cookies.get("accessToken")}`,
              },
            }
          );
          const assignmentsData = assignmentResponse.data;

          if (
            typeof assignmentsData === "object" &&
            assignmentsData !== null &&
            Array.isArray(assignmentsData.rows)
          ) {
            const formattedAssignments = assignmentsData.rows.map(
              (assignment) => ({
                assignment: assignment.assignmenttitle,
                moduleName: batch.moduleName,
                moduleCode: batch.moduleCode,
                batch: batch.batch,
                assignmentId: assignment.assignmentid,
                dateCreated: new Date(
                  assignment.assignmentdate
                ).toLocaleDateString(),
              })
            );

            allAssignments.push(...formattedAssignments);
          } else {
            console.error("Invalid assignmentsData:", assignmentsData);
          }
        }
        setAssignments(allAssignments);

        console.log("Assignments Data", allAssignments);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


  const handleDeleteAssignment = async (assignment) => {
    console.log("handling delete assignment");
    // e.preventDefault();
    try {
      console.log("handling delete assignment");
      // console.log(moduleData);
      // await refreshAccessToken();
      
      // const moduleData = {
      //   id : selectedRecentModule.assignmentId,
      //   modulecode : selectedRecentModule.moduleCode,
      //   batch : selectedRecentModule.batch
      // }

      await axios.delete(
          `http://localhost:3500/assignment/${assignment.moduleCode}/${assignment.batch}/${assignment.assignmentId}`,
          // moduleData,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("accessToken")}`,
            },
          }
      );

      setAssignments(assignments.filter((a) => a.assignmentId != assignment.assignmentId));

      console.log("Deleted Assignment");

     
      // navigate("/MyModulePage");
    } catch (error) {
      console.error("Error editing module:", error);
    }
  };


  const handleSelection = (assignment) => {
    setSelectedRecentModule(assignment);
    navigate(`/AnswerScripts/batch/${assignment.batch}/modulecode/${assignment.moduleCode}/assignmentid/${assignment.assignmentId}`);
  };

  const handleEditAssignment = (assignment) => {
    navigate(`/EditAssignment/${assignment.moduleCode}/${assignment.assignment}/${assignment.batch}/${assignment.assignmentId}`);
  };

  const newLocal = "space";
  return (
    <div className="align1">
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
          Back
        </Button>
        <h1 id="heading">Recents</h1>
        <div>
        <div style={{display:"flex", flexDirection:"row", alignItems:"flex-end", justifyContent:"right"}}>
               {/* <Link to={`/AnswerScripts/batch/${selectedRecentModule.batch}/modulecode/${selectedRecentModule.moduleCode}/assignmentid/${selectedRecentModule.assignmentId}`}>
                <CustomNewButton text="View Assignment" />
              </Link> */}
          
          <div style={{width:"10vw"}}></div>
          <Link to={`/NewAssignment/${null}/${null}`} style={{ textDecoration: "none" }}>
            <CustomNewButton text="New Assignment" />
          </Link>
          {/* <div style={{width:"10vw"}}></div> */}
          {/* <Link to={`/EditModule/${selectedModule}`}>
            <CustomNewButton onClick = {handleEditModule} text="Edit Assignment" />
          </Link> */}

          
          {/* <Link to={`/DeleteAssignment/${selectedRecentModule.moduleCode}/${selectedRecentModule}/${selectedRecentModule.assignmentId}`}>
            <CustomNewButton onClick = {handleDeleteAssignment} text="Delete Assignment" />
          </Link> */}

        </div>
        <div className="columnModules" style={{width:"80%"}}>
        <List sx={{ width: '100%', bgcolor: 'background.paper', overflow:"auto", height:"80%"}}>
              {assignments.map((assignment, index) => (
                <ListItem
                
                  key={assignment.assignmentId}
                  secondaryAction={
                    <div>
                      <IconButton edge="end" aria-label="edit" onClick={() => handleEditAssignment(assignment)}>
                        <Edit />
                      </IconButton>
                      <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteAssignment(assignment)}>
                        <Delete />
                      </IconButton>
                    </div>
                  }
                  disablePadding
                >
                  <ListItemButton onClick={() => handleSelection(assignment)}>
                    <ListItemText primaryTypographyProps={{ style: { fontSize: '2vh' } }}
    // secondaryTypographyProps={{ style: {  } }}
                      primary={`${assignment.assignment} - ${assignment.moduleCode}`}
                      secondary={
                        <span>
                          {assignment.batch} - {assignment.dateCreated}
                        </span>
                      }
                      secondaryTypographyProps={{ component: 'span', style: { display: 'inline', fontSize: '1.5vh' } }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          {/* <Box sx={{ height: '100%', width: '100%', display:"flex", justifyContent:"center" }}>
            <DataGrid
              rows={assignments}
              columns={columns}
              getRowId={(row) => row.assignmentId}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5]}
              checkboxSelection
              disableRowSelectionOnClick
              onRowSelectionModelChange={(newSelection) => {
                const selectedAssignment = assignments.find(
                  (assignment) => assignment.assignmentId === newSelection[0]
                );
                handleSelection(selectedAssignment);
              }}
              // isRowSelectable={(params) => params.row.moduleCode !== selectedModule}
            />
          </Box> */}
        </div>
          {/* <table className="table"> */}
            {/* <thead className="tablehead">
              <tr>
                {headers.map((header) => (
                  <th key={header}>{header}</th>
                ))}
              </tr>
            </thead> */}

            {/* <tbody>
              {assignments.length > 0 ? (
                assignments.map((assignment, index) => (
                  <tr
                    key={index}
                    className="table-data"
                    onClick={() => setSelectedRecentModule(assignment)}
                    style={{
                      backgroundColor:
                        selectedRecentModule === assignment
                          ? "#7894DB"
                          : "#E3DDE8",
                      color:
                        selectedRecentModule === assignment ? "white" : "black",
                      border: "7px solid white",
                      borderRadius: "10px",
                    }}
                  >
                    {" "}
                    <td>
                      <Link
                        to={`/AnswerScripts/batch/${assignment.batch}/modulecode/${assignment.moduleCode}/assignmentid/${assignment.assignmentId}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        {assignment.moduleCode} {assignment.moduleName} -{" "}
                        {assignment.assignment}
                      </Link>
                    </td>
                    <td>{assignment.batch}</td>
                   
                    <td>{assignment.dateCreated}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No assignments found</td>
                </tr>
              )}
            </tbody>
          </table> */}
        </div>
        
      </MainRightPane>
    </div>
  );
};

export default RecentPage;
