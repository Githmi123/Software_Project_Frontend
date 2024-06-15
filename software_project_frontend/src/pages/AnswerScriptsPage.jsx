import React, { useState, useEffect } from "react";
import MainLeftPane from "../components/MainLeftPane/MainLeftPane";
import MainRightPane from "../components/MainRightPane/MainRightPane";
import {
  Alert,
  Button,
  Checkbox,
  CircularProgress,
  Snackbar,
} from "@mui/material";
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
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
// import SnackBar from "../components/SnackBar";

import refreshAccessToken from "../services/AuthService";

import { useParams, useNavigate } from "react-router-dom";

import Cookies from "js-cookie";
import axios from "axios";
// import SnackBar from "../components/SnackBar";

const AnswerScriptsPage = () => {
  const { selectedModuleCode, batch, assignmentid } = useParams();
  const [selectedAssignmentNos, setSelectedAssignmentNos] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [answerScripts, setAnswerScripts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [gradingSnackbarOpen, setGradingSnackbarOpen] = useState(false);
  const [uploadingSnackbarOpen, setUploadingSnackbarOpen] = useState(false);
  const [markingSnackbarOpen, setMarkingSnackbarOpen] = useState(false);

  const columns = [
    { field: "studentid", headerName: "Student ID", width: 90 },
    { field: "assignmentid", headerName: "Assignment ID", width: 150 },
    { field: "marks", headerName: "Marks", width: 150 },
    { field: "batch", headerName: "Batch", width: 150 },
    { field: "modulecode", headerName: "Module Code", width: 150 },
    { field: "fileid", headerName: "File ID", width: 150 },
    { field: "graded", headerName: "Graded", width: 150 },
  ];



  const handleCloseGradingSnackbar = (event, reason) => {
    if (reason === 'clickaway') {

      return;
    }
    setGradingSnackbarOpen(false);
  };

  const handleCloseUploadingSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setUploadingSnackbarOpen(false);
  };

  const handleCloseMarkingSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setMarkingSnackbarOpen(false);
  };

  console.log("the required data  : ", selectedModuleCode, batch, assignmentid);

  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    console.log("fetching answer scripts");

    const response = await axios.get(
      `http://localhost:3500/answerscript/batch/${batch}/modulecode/${selectedModuleCode}/assignmentid/${assignmentid}`
    );
    console.log("after fetching");
    const answerScriptsData = response.data.rows;

    console.log(response.data);
    if (answerScriptsData) {
      console.log("no answer scripts uploaded");
      setAnswerScripts(answerScriptsData);
    }
    setLoading(false);
  };
  const fetchAnswerscripts = async () => {
    try {
      // await refreshAccessToken();
      await fetchData();
    } catch (error) {
      if (error.response && error.response.status === 401) {
        const newAccessToken = await refreshAccessToken();
        console.log("New access token: ", newAccessToken);

        if (newAccessToken) {
          try {
            // await refreshAccessToken();
            await fetchData();
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        }
      } else {
        console.error("Error fetching data:", error);
      }
    }
  };

  useEffect(() => {
    fetchAnswerscripts();
  }, []);

  const upload = async () => {
    setLoading(true);
    const formData = new FormData();
    selectedFiles.forEach((file) => formData.append("scripts", file));
    console.log("Form Data: ", formData);
    const response = await axios.post(
      `http://localhost:3500/answerscript/batch/${batch}/modulecode/${selectedModuleCode}/assignmentid/${assignmentid}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("Uploaded Answer Scripts:", response.data);
    fetchAnswerscripts();
    setLoading(false);

    setUploadingSnackbarOpen(true);
  }

  useEffect(() => {
    const uploadNewAnswerscripts = async () => {
      try {
        // await refreshAccessToken();
        await upload();
      } catch (error) {
        if (error.response && error.response.status === 401) {
          const newAccessToken = await refreshAccessToken();
          console.log("New access token: ", newAccessToken);

          if (newAccessToken) {
            try {
              // await refreshAccessToken();
              await upload();
            } catch (error) {
              console.error("Error fetching data:", error);
            }
          }
        } else {
          console.error("Error fetching data:", error);
        }
      }
    };

    if (selectedFiles.length > 0 && assignmentid) {
      uploadNewAnswerscripts();
    }
  }, [selectedFiles, selectedModuleCode, batch, assignmentid]);

  const handleNewAnswerScript = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
  };

  const handleToggleAssignmentNo = (scriptId) => {
    console.log(scriptId);
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

  const grade = async () => {
    setLoading(true);
    setMarkingSnackbarOpen(true);
    const response = await axios.post(
      // `http://localhost:3500/answerscript/batch/${batch}/modulecode/${selectedModuleCode}/assignmentid/${assignmentid}`,
      `http://localhost:3500/answerscript/batch/${batch}/modulecode/${selectedModuleCode}/assignmentid/${assignmentid}/grade`,
      {}
    );

    console.log("Got Response");

    console.log("Graded all answer scripts", response.data);

    setGradingSnackbarOpen(true);
    setLoading(false);
  };
  const handleGradeAllFiles = async () => {
    
    console.log("Started Grading");
    try {
      setMarkingSnackbarOpen(true);
      await grade();
    } catch (error) {
      if (error.response && error.response.status === 401) {
        const newAccessToken = await refreshAccessToken();
        console.log("New access token: ", newAccessToken);

        if (newAccessToken) {
          try {
            // await refreshAccessToken();
            await grade();
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        }
      } else {
        console.error("Error fetching data:", error);
      }
    }
  };

  const handleGradeSelectedFiles = async () => {
    console.log("Started Grading Selected Files");
    try {
      const response = await axios.post(
        `http://localhost:3500/answerscript/batch/${batch}/modulecode/${selectedModuleCode}/assignmentid/${assignmentid}/grade`,
        { selectedAssignmentNos }
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

  const deleteFiles = async () => {
    setLoading(true);
    const response = await axios.delete(
      `http://localhost:3500/answerscript/batch/${batch}/modulecode/${selectedModuleCode}/assignmentid/${assignmentid}/fileid/${answerScripts.fieid}`,
      { selectedAssignmentNos }
    );

    console.log(selectedAssignmentNos);

    console.log("Deleted selected answer scripts", response.data);
    await fetchData();

    setLoading(false);
  };

  const handleDeleteFiles = async () => {
    console.log("Started Deleting Selected Files");
    console.log(selectedFiles);
    try {
      await deleteFiles();
    } catch (error) {
      if (error.response && error.response.status === 401) {
        const newAccessToken = await refreshAccessToken();
        console.log("New access token: ", newAccessToken);

        if (newAccessToken) {
          try {
            // await refreshAccessToken();
            await deleteFiles();
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        }
      } else {
        console.error("Error fetching data:", error);
      }
    }
  };

  const handleRowClick = (params) => {
    const studentid = params.row.studentid;
    console.log("Row clicked for student ID:", studentid);
    //navigate(`/ManualGradingPage/${studentid}`);
    navigate(
      `/ManualGradingPage/batch/${batch}/modulecode/${selectedModuleCode}/assignmentid/${assignmentid}/studentid/${studentid}`
    );
  };

  return (
    <div className="align1">
      <MainRightPane>
        <Button id = "back-button"
          sx={{
            // m: 2,
            // width: "100px",
            // height: "50px",
            // color: "black",
            // fontWeight: "bold",
            // marginBottom: "2vh",
            
          }}
          startIcon={<ArrowBackIcon />}
          onClick={() => window.history.back()}
        >
          Back
        </Button>
        <h1 id="heading">Uploaded Answer Scripts</h1>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginLeft: "5vw",
            marginRight: "5vw",
            marginTop: "2vh"
          }}
        >
          <CustomNewButton
            text="Upload Answer Script"
            onFileSelect={handleNewAnswerScript}
          />
          <GradingButton
            text="Grade all files"
            onClick={handleGradeAllFiles}
            icon={AssignmentTurnedInIcon}
          />
          {/* <GradingButton
            text="Grade selected files"
            onClick={handleGradeSelectedFiles}
            icon={CheckCircle}
          /> */}

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

        {loading ? (<div style={{display: "flex", justifyContent:"center", alignItems: "center", marginTop:"8vh"}}><CircularProgress/></div>) :
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
              onRowClick={handleRowClick}
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
        }
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

        <Snackbar open={gradingSnackbarOpen} autoHideDuration={6000} onClose={handleCloseGradingSnackbar}>
          <Alert onClose={handleCloseGradingSnackbar} severity="success" variant="filled" sx={{ width: '100%' }}>

            Grading completed successfully!
          </Alert>
        </Snackbar>

        <Snackbar open={uploadingSnackbarOpen} autoHideDuration={6000} onClose={handleCloseUploadingSnackbar}>
          <Alert onClose={handleCloseUploadingSnackbar} severity="success" variant="filled" sx={{ width: '100%' }}>
            Answer script uploaded successfully!
          </Alert>
        </Snackbar>

        <Snackbar open={markingSnackbarOpen} autoHideDuration={6000} onClose={handleCloseMarkingSnackbar}>
          <Alert onClose={handleCloseMarkingSnackbar} severity="info" variant="filled" sx={{ width: '100%' }}>
            Answer scripts are being graded. This may take a few minutes. Please wait!
          </Alert>
        </Snackbar>
      </MainRightPane>
    </div>
  );
};

export default AnswerScriptsPage;
