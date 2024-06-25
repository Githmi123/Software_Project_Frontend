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
import { SnackbarProvider, useSnackbar } from 'notistack';

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
  const [failedGradingSnackbarOpen, setFailedGradingSnackbarOpen] = useState(false);
  const [noSelectionSnackbarOpen, setNoSelectionSnackbarOpen] = useState(false);

  const columns = [
    { field: "studentid", headerName: "Student ID", width: 90 },
    { field: "assignmentid", headerName: "Assignment ID", width: 150 },
    { field: "marks", headerName: "Marks", width: 150 },
    { field: "batch", headerName: "Batch", width: 150 },
    { field: "modulecode", headerName: "Module Code", width: 150 },
    { field: "fileid", headerName: "File ID", width: 150 },
    { field: "graded", headerName: "Graded", width: 150 },
  ];

  // const [columns, setColumns] = useState([
  //   { field: "studentid", headerName: "Student ID", width: 90 },
  //   { field: "assignmentid", headerName: "Assignment ID", width: 150 },
  //   { field: "marks", headerName: "Marks", width: 150 },
  //   { field: "batch", headerName: "Batch", width: 150 },
  //   { field: "modulecode", headerName: "Module Code", width: 150 },
  //   { field: "fileid", headerName: "File ID", width: 150 },
  //   { field: "graded", headerName: "Graded", width: 150 },
  // ]);

  // useEffect(() => {
  //   const handleResize = () => {
  //     const newColumns = window.innerWidth < 600
  //       ? [
  //           { field: "studentid", headerName: "Student ID", width: 90 },
  //           { field: "assignmentid", headerName: "Assignment ID", width: 150 },
  //           { field: "marks", headerName: "Marks", width: 150 },
  //         ]
  //       : [
  //           { field: "studentid", headerName: "Student ID", width: 90 },
  //           { field: "assignmentid", headerName: "Assignment ID", width: 150 },
  //           { field: "marks", headerName: "Marks", width: 150 },
  //           { field: "batch", headerName: "Batch", width: 150 },
  //           { field: "modulecode", headerName: "Module Code", width: 150 },
  //           { field: "fileid", headerName: "File ID", width: 150 },
  //           { field: "graded", headerName: "Graded", width: 150 },
  //         ];

  //     setColumns(newColumns);
  //   };

  //   window.addEventListener("resize", handleResize);
  //   handleResize(); // Initial resize call

  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);


  const handleClick = () => {
    enqueueSnackbar('I love snacks.');
  };

  const { enqueueSnackbar } = useSnackbar();

  const handleCloseGradingSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setGradingSnackbarOpen(false);
  };

  const handleCloseFailedGradingSnackbar = (event, reason) => {
    if (reason === 'clickaway') {

      return;
    }
    setFailedGradingSnackbarOpen(false);
  };

  const handleCloseUploadingSnackbar = (event, reason) => {
    if (reason === "clickaway") {
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

  const handleNoSelectionSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setNoSelectionSnackbarOpen(false);
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
            setLoading(false);
            console.error("Error fetching data:", error);
            
            enqueueSnackbar('Connection Error!', { variant: 'error' });
          }
        }
      } else {
        console.error("Error fetching data:", error);
        setLoading(false);
        enqueueSnackbar('Connection Error!', { variant: 'error' });
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

    
  };

  useEffect(() => {
    const uploadNewAnswerscripts = async () => {
      try {
        // await refreshAccessToken();
        await upload();
        enqueueSnackbar('Answer script uploaded successfully!', { variant: 'success' });
      } catch (error) {
        if (error.response && error.response.status === 401) {
          const newAccessToken = await refreshAccessToken();
          console.log("New access token: ", newAccessToken);

          if (newAccessToken) {
            try {
              // await refreshAccessToken();
              await upload();
              enqueueSnackbar('Answer script uploaded successfully!', { variant: 'success' });
            } catch (error) {
              setLoading(false);
              console.error("Error fetching data:", error);
              enqueueSnackbar('Failed to upload answer script!', { variant: 'error' });
              
            }
          }
        } else {
          setLoading(false);
          console.error("Error fetching data:", error);
          enqueueSnackbar('Failed to upload answer script!', { variant: 'error' });
          
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

  const handleSelectionModelChange = (newSelectionModel) => {
    setSelectedAssignmentNos(newSelectionModel);

    const selectedFileIds = newSelectionModel.map((id) => {
      const script = answerScripts.find(script => script.assignmentid === id);
      return script ? script.fileid : null;
    }).filter(fileid => fileid !== null);

    setSelectedFiles(selectedFileIds);
};


  // const handleToggleAssignmentNo = (scriptId) => {
  //   console.log(scriptId);
  //   setSelectedAssignmentNos((prevSelectedAssignmentNos) => {
  //     if (prevSelectedAssignmentNos.includes(scriptId)) {
  //       return prevSelectedAssignmentNos.filter((id) => id !== scriptId);
  //     } else {
  //       return [...prevSelectedAssignmentNos, scriptId];
  //     }
  //   });

  //   const selectedFile = answerScripts.find((script) => script.id === scriptId);

  //   if (selectedFile) {
  //     setSelectedFiles((prevSelectedFiles) => {
  //       if (prevSelectedFiles.some((file) => file.id === scriptId)) {
  //         return prevSelectedFiles.filter((file) => file.id !== scriptId);
  //       } else {
  //         return [...prevSelectedFiles, selectedFile];
  //       }
  //     });
  //   }
  // };

  const handleToggleAssignmentNo = (scriptId) => {
    setSelectedAssignmentNos((prevSelectedAssignmentNos) => {
      if (prevSelectedAssignmentNos.includes(scriptId)) {
        return prevSelectedAssignmentNos.filter((id) => id !== scriptId);
      } else {
        return [...prevSelectedAssignmentNos, scriptId];
      }
    });
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
    enqueueSnackbar('Grading is starting. This may take a few minutes. Please wait!', { variant: 'info' });
    const response = await axios.post(
      // `http://localhost:3500/answerscript/batch/${batch}/modulecode/${selectedModuleCode}/assignmentid/${assignmentid}`,
      `http://localhost:3500/answerscript/batch/${batch}/modulecode/${selectedModuleCode}/assignmentid/${assignmentid}/grade`,
      {}
    );

    console.log("Got Response");
    setLoading(false);
    console.log("Graded all answer scripts", response.data);
    
    enqueueSnackbar('Grading completed successfully!', { variant: 'success' });
    
  };
  const handleGradeAllFiles = async () => {
    
    console.log("Started Grading");
    try {
      // setMarkingSnackbarOpen(true);
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
            setLoading(false);
            console.error("Error fetching data:", error);
            enqueueSnackbar('Error: Grading failed!', { variant: 'error' });
            
          }
        }
      } else {
        setLoading(false);
        console.error("Error fetching data:", error);
        // setFailedGradingSnackbarOpen(true);
        enqueueSnackbar('Error: Grading failed!', { variant: 'error' });
        
      }
    }
  };

  const gradeSelected = async () => {
    setLoading(true);
    enqueueSnackbar('Answer scripts are being graded. This may take a few minutes. Please wait!', { variant: 'info' });
    console.log("Assignment Nos:", selectedAssignmentNos);
        const response = await axios.post(
          `http://localhost:3500/answerscript/batch/${batch}/modulecode/${selectedModuleCode}/assignmentid/${assignmentid}/gradeseleted`,
          { selectedAssignmentNos }
        );
  
        console.log("Graded selected answer scripts", response.data);
        setLoading(false);
        enqueueSnackbar('Grading completed successfully!', { variant: 'success' });
        
  }

  const handleGradeSelectedFiles = async () => {
    console.log("Started Grading Selected Files");
    if(selectedAssignmentNos.length === 0){
      enqueueSnackbar('Please select files to grade!', { variant: 'error' });
    }
    else{
      try {
        await gradeSelected();
      } catch (error) {
        if (error.response && error.response.status === 401) {
          const newAccessToken = await refreshAccessToken();
          console.log("New access token: ", newAccessToken);
  
          if (newAccessToken) {
            try {
              // await refreshAccessToken();
              await grade();
            } catch (error) {
              setLoading(false);
              console.error("Error fetching data:", error);
              enqueueSnackbar('Error: Grading failed!', { variant: 'error' });
            }
          }
        } else {
          setLoading(false);
          console.error("Error fetching data:", error);
          // setFailedGradingSnackbarOpen(true);
          enqueueSnackbar('Error: Grading failed!', { variant: 'error' });
          
        }
      }
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
    console.log("These are selected", selectedAssignmentNos);
    

    
    const response = await axios.delete(
      
      `http://localhost:3500/answerscript/batch/${batch}/modulecode/${selectedModuleCode}/assignmentid/${assignmentid}/fileid/${selectedAssignmentNos}`
    );
    console.log("These are sent", selectedFiles)
    console.log("These are selected", selectedAssignmentNos);

    console.log("Deleted selected answer scripts", response.data);
    enqueueSnackbar('Answer Script deleted successfully', { variant: 'success' });
    window.location.reload();
    
    
    

    setLoading(false);
  };

  const handleDeleteFiles = async () => {
    console.log("Started Deleting Selected Files");
    console.log(selectedFiles);
    if(selectedAssignmentNos.length === 0){
      enqueueSnackbar('Please select files to delete!', { variant: 'error' });
    }
    else{
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
              setLoading(false);
              console.error("Error fetching data:", error);
              enqueueSnackbar('Failed to delete answer scripts!', { variant: 'error' });
              
            }
          }
        } else {
          setLoading(false);
          console.error("Error fetching data:", error);
          enqueueSnackbar('Failed to delete answer scripts!', { variant: 'error' });
          
        }
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
          // sx={{
            // m: 2,

            // width: "100px",
            // height: "50px",
            // color: "black",
            // fontWeight: "bold",
            // marginBottom: "2vh",
            

          // }}
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
            marginTop: "2vh",
          }}
        >
          <CustomNewButton
            text="Upload"
            onFileSelect={handleNewAnswerScript}
          />
          {/* <GradingButton
            text="Grade"
            onClick={handleGradeAllFiles}
            icon={AssignmentTurnedInIcon}
          /> */}
          <GradingButton
            text="Grade"
            onClick={handleGradeSelectedFiles}
            icon={CheckCircle}
          />

          <Link
            to={`/DataVisualization/batch/${batch}/modulecode/${selectedModuleCode}/assignmentid/${assignmentid}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <GradingButton text="Visualize" icon={TrendingUp} />
          </Link>

          <GradingButton
            text="Delete"
            onClick={handleDeleteFiles}
            icon={Delete}
          />
        </div>

        {loading ? (<div style={{display: "flex", justifyContent:"center", alignItems: "center", marginTop:"8vh"}}><CircularProgress/></div>) :
        <div className="columnAnswerScripts">
        
          <Box sx={{ height: '100%', width: '100%', }}>
          

          <DataGrid
    
      rows={answerScripts}
      columns={columns}
      getRowId={(row) => row.fileid}
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
      // onRowSelectionModelChange={(newSelection) => {
      //   newSelection.forEach((scriptId) => {
      //     handleToggleAssignmentNo(scriptId);
      //   });
      // }}
      onRowSelectionModelChange={(newSelection) => {
        setSelectedAssignmentNos(newSelection);
        // setSelectedFiles(newSelection);
      }}
      onSelectionModelChange={handleSelectionModelChange}
    
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

        <Snackbar
          open={gradingSnackbarOpen}
          autoHideDuration={6000}
          onClose={handleCloseGradingSnackbar}
        >
          <Alert
            onClose={handleCloseGradingSnackbar}
            severity="success"
            variant="filled"
            sx={{ width: "100%" }}
          >
            Grading completed successfully!
          </Alert>
        </Snackbar>

        <Snackbar
          open={uploadingSnackbarOpen}
          autoHideDuration={6000}
          onClose={handleCloseUploadingSnackbar}
        >
          <Alert
            onClose={handleCloseUploadingSnackbar}
            severity="success"
            variant="filled"
            sx={{ width: "100%" }}
          >
            Answer script uploaded successfully!
          </Alert>
        </Snackbar>

        <Snackbar open={markingSnackbarOpen} autoHideDuration={6000} onClose={handleCloseMarkingSnackbar}>
          <Alert onClose={handleCloseMarkingSnackbar} severity="info" variant="filled" sx={{ width: '100%' }}>
            Answer scripts are being graded. This may take a few minutes. Please wait!
          </Alert>
        </Snackbar>

        <Snackbar open={failedGradingSnackbarOpen} autoHideDuration={6000} onClose={handleCloseFailedGradingSnackbar}>
          <Alert onClose={handleCloseFailedGradingSnackbar} severity="error" variant="filled" sx={{ width: '100%' }}>
            Error: Grading failed!
          </Alert>
        </Snackbar>

        <Snackbar open={noSelectionSnackbarOpen} autoHideDuration={6000} onClose={handleNoSelectionSnackbar}>
          <Alert onClose={handleNoSelectionSnackbar} severity="error" variant="filled" sx={{ width: '100%' }}>
            Please select files to delete!
          </Alert>
        </Snackbar>
      </MainRightPane>
    </div>
  );
};

export default AnswerScriptsPage;
