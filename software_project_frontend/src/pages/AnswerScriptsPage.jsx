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
import { SnackbarProvider, useSnackbar } from 'notistack';
import * as pdfjsLib from "pdfjs-dist/webpack";
import refreshAccessToken from "../services/AuthService";

import { useParams, useNavigate } from "react-router-dom";

import Cookies from "js-cookie";
import axios from "axios";

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
  const [selectedStudentIds, setSelectedStudentIds] = useState([]);
  


  const columns = [
    { field: "studentid", headerName: "Student ID", width: 90 },
    { field: "assignmentid", headerName: "Assignment ID", width: 150 },
    { field: "marks", headerName: "Marks", width: 150 },
    { field: "batch", headerName: "Batch", width: 150 },
    { field: "modulecode", headerName: "Module Code", width: 150 },
    { field: "fileid", headerName: "File ID", width: 150 },
  ];

  


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
  
      await fetchData();
    } catch (error) {
      if (error.response && error.response.status === 401) {
        const newAccessToken = await refreshAccessToken();
        console.log("New access token: ", newAccessToken);

        if (newAccessToken) {
          try {
         
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
    for (const file of selectedFiles) {
      if (file.url) {
        // If file has a URL, it's a PDF converted to an image
        try {
          // Fetch the image from the URL
          const imageResponse = await fetch(file.url);
          const imageBlob = await imageResponse.blob();
  
          // Append the image blob to FormData under the key "scripts"
          formData.append("scripts", imageBlob, file.file.name);
        } catch (error) {
          console.error("Error fetching image:", error);
          // Handle error fetching image (e.g., notify user)
        }
      } else {
        // Otherwise, append the original file to FormData under the key "scripts"
        formData.append("scripts", file.file);
      }
    }
    // console.log("Selected:", selectedFiles);
    // selectedFiles.forEach((file) => formData.append("scripts", file.file));
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
       
        await upload();
        enqueueSnackbar('Answer script uploaded successfully!', { variant: 'success' });
      } catch (error) {
        if (error.response && error.response.status === 401) {
          const newAccessToken = await refreshAccessToken();
          console.log("New access token: ", newAccessToken);

          if (newAccessToken) {
            try {
          
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


  const handleNewAnswerScript = async (event) => {
    const files = Array.from(event.target.files);
    console.log("Files:", files)
    const convertedFiles = await Promise.all(
      files.map(async (file) => {
        if (file.type === "application/pdf") {
          const images = await convertPdfToImages(file);
          return images.map((image) => ({
            file: image.file,
            url: image.url,
          }));
        } else {
          return { file }; // Wrap non-PDF files in the same structure
        }
      })
    ).then((results) => {
      // Flatten the array of arrays into a single array of files
      return results.flat();
    });
  
    // Log converted files for debugging
    console.log("Converted Files:", convertedFiles);
  
    // Update state with selected files
    setSelectedFiles(convertedFiles);
  };

  const convertPdfToImages = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    const numPages = pdf.numPages;
    const images = [];

    for (let i = 1; i <= numPages; i++) {
      const page = await pdf.getPage(i);
      const viewport = page.getViewport({ scale: 1 });
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };

      await page.render(renderContext).promise;
      const imageUrl = canvas.toDataURL("image/jpeg");
      images.push({ file, url: imageUrl }); // Store file and its image URL
    }

    return images;
  };

  const handleSelectionModelChange = (newSelectionModel) => {
    const selectedStudentIds = newSelectionModel.map((id) => {
      const script = answerScripts.find(script => script.fileid === id);
      return script ? script.studentid : null;
    }).filter(studentid => studentid !== null);
    
    setSelectedStudentIds(selectedStudentIds);
    setSelectedAssignmentNos(newSelectionModel); 
  };
  


 

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
     
      await grade();
    } catch (error) {
      if (error.response && error.response.status === 401) {
        const newAccessToken = await refreshAccessToken();
        console.log("New access token: ", newAccessToken);

        if (newAccessToken) {
          try {
          
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
      
        enqueueSnackbar('Error: Grading failed!', { variant: 'error' });
        
      }
    }
  };

  const gradeSelected = async () => {
    setLoading(true);
    enqueueSnackbar('Answer scripts are being graded. This may take a few minutes. Please wait!', { variant: 'info' });
    console.log("Assignment Nos:", selectedStudentIds);
        const response = await axios.post(
          `http://localhost:3500/answerscript/batch/${batch}/modulecode/${selectedModuleCode}/assignmentid/${assignmentid}/gradeseleted`,
          { fileids: selectedAssignmentNos } 
        );
  
        console.log("Graded selected answer scripts", response.data);
        setLoading(false);
        enqueueSnackbar('Grading completed successfully!', { variant: 'success' });
        window.location.reload();
        enqueueSnackbar('Grading completed successfully!', { variant: 'success' });
        
        
  }

  const handleGradeSelectedFiles = async () => {
    console.log("Started Grading Selected Files");
    if(selectedStudentIds.length === 0){
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
    

    if(selectedAssignmentNos.length > 1){
      const response = await axios.delete(
      
        `http://localhost:3500/answerscript/batch/${batch}/modulecode/${selectedModuleCode}/assignmentid/${assignmentid}/fileid`, 
        {data: { fileids: selectedAssignmentNos }}
      );
      console.log("These are sent", selectedFiles)
      console.log("These are selected", selectedAssignmentNos);
  
      console.log("Deleted selected answer scripts", response.data);
      
      window.location.reload();
      enqueueSnackbar('Answer Script deleted successfully', { variant: 'success' });
      
      
      
  
      setLoading(false);
    }

    else{
      const response = await axios.delete(
      
        `http://localhost:3500/answerscript/batch/${batch}/modulecode/${selectedModuleCode}/assignmentid/${assignmentid}/fileid/${selectedAssignmentNos}`
      );
      console.log("These are sent", selectedFiles)
      console.log("These are selected", selectedAssignmentNos);
  
      console.log("Deleted selected answer scripts", response.data);
      enqueueSnackbar('Answer Script deleted successfully', { variant: 'success' });
      window.location.reload();
      
      
      
  
      setLoading(false);
    }
    
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

    navigate(
      `/ManualGradingPage/batch/${batch}/modulecode/${selectedModuleCode}/assignmentid/${assignmentid}/studentid/${studentid}`
    );
  };

  return (
    
    <div className="align1">
      <MainRightPane>
        <Button id = "back-button"
    
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
   
      onRowSelectionModelChange={(newSelection) => {
        setSelectedAssignmentNos(newSelection);
        handleSelectionModelChange(newSelection); 
   
      }}
      onSelectionModelChange={handleSelectionModelChange}
    
    />








          
          </Box>

           
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
