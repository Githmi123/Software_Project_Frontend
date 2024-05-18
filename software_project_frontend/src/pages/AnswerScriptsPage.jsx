import React, { useState, useEffect } from "react";
import MainLeftPane from "../components/MainLeftPane/MainLeftPane";
import MainRightPane from "../components/MainRightPane/MainRightPane";
import { Button, Checkbox } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import { CheckCircle, Delete } from "@mui/icons-material";
import { Edit } from "@mui/icons-material";
import { TrendingUp } from "@mui/icons-material";
import CustomNewButton from "../components/Buttons/CustomNewButton";
import { Link } from "react-router-dom";
import "../styles/AssignmentsPage.css";
import RemoveFileButton from "../components/Buttons/RemoveFileButton";
import GradingButton from "../components/Buttons/GradingButton";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';


import refreshAccessToken from "../services/AuthService";

import { useParams } from "react-router-dom";

import Cookies from "js-cookie";
import axios from "axios";

const AnswerScriptsPage = () => {
  const { selectedModuleCode, batch, assignmentid } = useParams();
  const [selectedAssignmentNos, setSelectedAssignmentNos] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [answerScripts, setAnswerScripts] = useState([]);


  const columns = [
    { field: 'studentid', headerName: 'Student ID', width: 90},
    { field: 'assignmentid', headerName: 'Assignment ID', width: 150 },
    { field: 'marks', headerName: 'Marks', width: 150 },
    { field: 'batch', headerName: 'Batch', width: 150 },
    { field: 'modulecode', headerName: 'Module Code', width: 150 },
    { field: 'fileid', headerName: 'File ID', width: 150 },
    { field: 'graded', headerName: 'Graded', width: 150 },
  ];
  
  // const columns = [
  //   { field: 'id', headerName: 'ID', width: 90 },
  //   {
  //     field: 'firstName',
  //     headerName: 'First name',
  //     width: 150,
  //     editable: true,
  //   },
  //   {
  //     field: 'lastName',
  //     headerName: 'Last name',
  //     width: 150,
  //     editable: true,
  //   },
  //   {
  //     field: 'age',
  //     headerName: 'Age',
  //     type: 'number',
  //     width: 110,
  //     editable: true,
  //   },
  //   {
  //     field: 'fullName',
  //     headerName: 'Full name',
  //     description: 'This column has a value getter and is not sortable.',
  //     sortable: false,
  //     width: 160,
  //     valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  //   },
  // ];
  
  // const rows = [
  //   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
  //   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
  //   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
  //   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
  //   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  //   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  //   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  //   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  //   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  // ];

  

  console.log("the required data  : ", selectedModuleCode, batch, assignmentid);

  useEffect(() => {
    const fetchAnswerscripts = async () => {
      try {
        // await refreshAccessToken();

        const response = await axios.get(
          `http://localhost:3500/answerscript/batch/${batch}/modulecode/${selectedModuleCode}/assignmentid/${assignmentid}`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("accessToken")}`,
            },
          }
        );

        const answerScriptsData = response.data.rows;

        setAnswerScripts(answerScriptsData);
      } catch (error) {
        console.error("Error fetching answer scripts:", error);
      }
    };

    fetchAnswerscripts();
  }, [selectedModuleCode, batch, assignmentid]);

  useEffect(() => {
    const uploadNewAnswerscripts = async () => {
      try {
        await refreshAccessToken();

        const formData = new FormData();
        selectedFiles.forEach((file) => formData.append("scripts", file));

        const response = await axios.post(
          `http://localhost:3500/answerscript/batch/${batch}/modulecode/${selectedModuleCode}/assignmentid/${assignmentid}`,
          formData,
          
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("accessToken")}`,
            },
          },
          
        );

        console.log("Uploaded Answer Scripts:", response.data);
      } catch (error) {
        console.error("Error uploading answer scripts:", error);
      }
    };

    if (selectedFiles.length > 0 && assignmentid) {
      uploadNewAnswerscripts();
    }
  }, [selectedFiles, selectedModuleCode, batch, assignmentid]);

  const handleNewAnswerScript = (file) => {
    setSelectedFiles((prevSelectedFiles) => [...prevSelectedFiles, file]);
  };

  const handleToggleAssignmentNo = (scriptId) => {
    setSelectedAssignmentNos((prevSelectedAssignmentNos) => {
      if (prevSelectedAssignmentNos.includes(scriptId)) {
        return prevSelectedAssignmentNos.filter((id) => id !== scriptId);
      } else {
        return [...prevSelectedAssignmentNos, scriptId];
      }
    });

    const selectedFile = answerScripts.find((script) => script.id === scriptId);
    if (selectedFile) {
      setSelectedFiles((prevSelectedFiles) => {
        if (prevSelectedFiles.some((file) => file.id === scriptId)) {
          return prevSelectedFiles.filter((file) => file.id !== scriptId);
        } else {
          return [...prevSelectedFiles, selectedFile];
        }
      });
    }
  };
  

  const handleToggleAllScripts = () => {
    if (selectedAssignmentNos.length === answerScripts.length) {
      setSelectedAssignmentNos([]);
    } else {
      const allScriptIds = answerScripts.map((script) => script.id);
      setSelectedAssignmentNos(allScriptIds);
    }
  };

  const handleGradeAllFiles = async () => {
    console.log("STarted Grading");
    try {
      // await refreshAccessToken();

      // const response = await axios.post(
      //   `http://localhost:3500/answerscript/batch/${batch}/modulecode/${selectedModuleCode}/assignmentid/${assignmentid}/grade`,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${Cookies.get("accessToken")}`,
      //     },
      //   }
      // );

      const response = await axios.post(
        // `http://localhost:3500/answerscript/batch/${batch}/modulecode/${selectedModuleCode}/assignmentid/${assignmentid}`,
        `http://localhost:3500/answerscript/batch/${batch}/modulecode/${selectedModuleCode}/assignmentid/${assignmentid}/grade`,{},
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        }
      );

      console.log("Got Response");

      console.log("Graded all answer scripts", response.data);
    } catch (error) {
      console.error("Error grading answer scripts:", error);
    }
  };

  const handleGradeSelectedFiles = async () => {
    console.log("Started Grading Selected Files");
    try {
      const response = await axios.post(
        `http://localhost:3500/answerscript/batch/${batch}/modulecode/${selectedModuleCode}/assignmentid/${assignmentid}/grade`,
        { selectedAssignmentNos },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        }
      );

      console.log("Graded selected answer scripts", response.data);
    } catch (error) {
      console.error("Error grading selected answer scripts:", error);
    }
  };
  

  const handleGradeManually = (event) => {};

  const handleVisualizeAGraph = (event) => {};

  const handleRemove = (scriptId) => {
    setSelectedFiles((prevSelectedFiles) =>
      prevSelectedFiles.filter((file) => file.id !== scriptId)
    );
  };

  const handleDeleteFiles = () => {

  };

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
        <h1 id="heading">Uploaded Answer Scripts</h1>
        <div style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent: "space-between", marginLeft:"5vw", marginRight:"5vw"}}>
          <CustomNewButton
            text="Upload Answer Script"
            onFileSelect={handleNewAnswerScript}
          />
          <GradingButton
            text="Grade all files"
            onClick={handleGradeAllFiles}
            icon={AssignmentTurnedInIcon}
          />
          <GradingButton
            text="Grade selected files"
            onClick={handleGradeSelectedFiles}
            icon={CheckCircle}
          />
          
          <Link
            to={`/DataVisualization/batch/${batch}/modulecode/${selectedModuleCode}/assignmentid/${assignmentid}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <GradingButton text="Visualize a graph" icon={TrendingUp} />
          </Link>

          <GradingButton
            text="Delete selected files"
            onClick={handleDeleteFiles}
            icon={Delete}
          />

        </div>

        <div className="columnAnswerScripts">
          <Box sx={{ height: '100%', width: '100%' }}>
            <DataGrid
              rows={answerScripts}
              columns={columns}
              getRowId={(row) => row.studentid}
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
                newSelection.forEach((scriptId) => {
                  handleToggleAssignmentNo(scriptId);
                });
              }}
            />
          </Box>
          {/* <table className="tableStyle2">
            <tbody>
              {answerScripts &&
                answerScripts.map((script) => (
                  <tr
                    key={script.id}
                    className="trStyleAnswerScript"
                    style={{
                      backgroundColor: selectedAssignmentNos.includes(script.id)
                        ? "#F0F0F0"
                        : "#E3DDE8",
                    }}
                  >
                    <td>
                      <Checkbox
                        color="primary"
                        checked={selectedAssignmentNos.includes(script.id)}
                        onChange={() => handleToggleAssignmentNo(script.id)}
                      />
                    </td>
                    <td onClick={() => handleToggleAssignmentNo(script.id)}>
                      {script.studentid}
                    </td>
                    <td onClick={() => handleToggleAssignmentNo(script.id)}>
                      {script.marks}
                    </td>
                    <td>
                      <RemoveFileButton
                        onClick={() => handleRemove(script.id)}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table> */}
        </div>

        <div
          style={{
            marginTop: "1vh",
            display: "flex",
            justifyContent: "center",
            position: "relative",
          }}
        >
          
          {/* <Link
            to="/Dashboard"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <GradingButton text="Dashboard" icon={DashboardIcon} />
          </Link> */}
        </div>
      </MainRightPane>
    </div>
  );
};

export default AnswerScriptsPage;
