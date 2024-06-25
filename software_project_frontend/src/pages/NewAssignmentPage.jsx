import React, { useState, useEffect } from "react";
import MainLeftPane from "../components/MainLeftPane/MainLeftPane";
import MainRightPane from "../components/MainRightPane/MainRightPane";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Alert,
  Button,
  InputAdornment,
  TextField,
  Snackbar,
} from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import "../styles/NewAssignmentPage.css";
import CustomSelect from "../components/Other/CustomSelect";
import InputFileUploadButton from "../components/Buttons/InputFileUploadButton";
import CustomButton from "../components/Buttons/CustomButton";
import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import refreshAccessToken from "../services/AuthService";

const NewAssignmentPage = () => {
  const [moduleOptions, setModuleOptions] = useState([]);
  const [batchOptions, setBatchOptions] = useState([]);
  const [selectedModule, setSelectedModule] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [assignmentName, setAssignmentName] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [schemepath, setSchemePath] = useState("");
  const { selectedModuleCode, batch } = useParams();
  const [snackbarOpen, setSnackbarOpen] = useState(false);


  const [excelFile, setExcelFile] = useState(null);
  const [typeError, setTypeError] = useState(null);


  const [excelData, setExcelData] = useState(null);

  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  useEffect(() => {
    const fetchModulesAndBatches = async () => {
      try {
        await refreshAccessToken();

        const modulesResponse = await axios.get(
          "http://localhost:3500/modules"
        );
        const modules = modulesResponse.data;
        const moduleOptions = modules.map((module) => ({
          value: module.modulecode,
          label: module.modulecode,
        }));
        setModuleOptions(moduleOptions);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchModulesAndBatches();
  }, []);

  useEffect(() => {
    const fetchBatches = async () => {
      try {

        await refreshAccessToken();

        const batchResponse = await axios.get(
          `http://localhost:3500/batch/${selectedModule}`
        );
        const batches = batchResponse.data;

        const batchOptions = batches.map((batch) => ({
          value: batch.batch,
          label: batch.batch,
        }));

        setBatchOptions(batchOptions);
      } catch (error) {
        console.error("Error fetching batches:", error);
      }
    };

    fetchBatches();
  }, [selectedModule]);

  console.log("THese are module options", moduleOptions);

  console.log("This is selected module", selectedModule);

  console.log("batches : ", batchOptions);
  console.log("Selected Batch:", selectedBatch);


  const handleModuleChange = (event) => {
    const value = event.target.value;
    if (value === "new-module") {
      navigate("/NewModule");
    } else {
      setSelectedModule(value);
    }
  };

  const handleAddModule = (event) => {
    navigate("/NewModule");
  };

  const handleAddBatch = (e) => {
    if (selectedModule === "") {
      console.log("Please select a module!");
    } else if (selectedBatch === "new-batch") {
      navigate(`/NewBatchPage/${selectedModule}`);
    } else {
      setSelectedBatch();
      navigate(`/NewBatchPage/${selectedModule}`);
    }
  };

  const handleNewAssignment = (e) => {
    navigate("/NewAssignment");
  };

  const handleBatchChange = (event) => {
    const value = event.target.value;
    if (value === "new-batch") {
      if (!selectedModule) {
        setSnackbarOpen(true);
      } else {
        navigate(`/NewBatchPage/${selectedModule}`);
      }
    } else {
      setSelectedBatch(value);
    }

  };

  // const handleBatchChange = (event) => {
  //   const value = event.target.value;
  //   if (value === "new-batch") {
  //     if (selectedModule === "") {
  //       setSnackbarOpen(true);
  //     } else {
  //       navigate(`/NewBatchPage/${selectedModule}`);
  //     }
  //   } else {
  //     setSelectedBatch(value);
  //     console.log("selected batch 2 : ", selectedBatch);
  //   }
  //   //setSelectedBatch(event.target.value);
  // };

  const handleAssignmentNameChange = (event) => {
    setAssignmentName(event.target.value);
  };

  const handleSchemePathChange = (event) => {
    setSchemePath(event.target.value);
  };


  const handleSelectedFileChange = (file) => {
    setSelectedFile(file); 
    setSchemePath(file.name);
  };

  const handleCancel = (event) => {};

  const handlePrevious = (event) => {
    window.history.back();
  };

  const handleSave = (event) => {};

  const assignmentData = {
    batch: selectedBatch,
    modulecode: selectedModule,
    assignmenttitle: assignmentName,
    schemepath: schemepath,
    scheme: selectedFile,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Started submitting");
      const formData = new FormData();
      console.log(selectedModuleCode);
      console.log("selectedModuleCode:", selectedModuleCode);
      console.log("batch:", batch);
      console.log("selectedModule:", selectedModule);
      console.log("selectedBatch:", selectedBatch);

      // formData.append(
      //   "batch",
      //   selectedModule === "null" ? selectedBatch : batch
      // );
      // formData.append(
      //   "modulecode",
      //   selectedModule === "null" ? selectedModule : selectedModule
      // );
      formData.append("batch", selectedBatch);
      formData.append("modulecode", selectedModule);
      formData.append("assignmenttitle", assignmentName);
      formData.append("schemepath", schemepath);
      formData.append("scheme", selectedFile);

      const response = await axios.post(
        `http://localhost:3500/assignment/${selectedModule}/${selectedBatch}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        console.log("Assignment is created!");
        enqueueSnackbar("Assignment created successfully!", {
          variant: "success",
        });
        // alert("Assignment is created successfully!");
        navigate("/Dashboard");
      } else {
        console.error("Error creating assignment:", response.data);
        enqueueSnackbar("Error creating assignment. Please try again", {
          variant: "error",
        });
        // alert("Error creating assignment. Please try again.");
      }
    } catch (error) {
      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
        console.error("Error response headers:", error.response.headers);
        alert(`Error creating assignment: ${error.response.data.message}`);
      } else if (error.request) {
        console.error("Error request data:", error.request);
        alert(
          "Error creating assignment: No response from the server. Please try again."
        );
      } else {
        console.error("Error message:", error.message);
        alert(`Error creating assignment: ${error.message}`);
      }
      console.error("Error config:", error.config);
    }

  };

  return (
    <div className="align1">
      <MainRightPane>
      
        <h3 id="heading">New Assignment</h3>
        <div
          style={{
            backgroundColor: "white",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="align">
            <span className="label1">Module</span>
            <div className="center">
              <div>
                <CustomSelect
                  label="Module"
                  value={selectedModule}
                  onChange={handleModuleChange}
                  options={moduleOptions}
                />
           
              </div>
            </div>

            <span className="label1">Batch</span>
            <div className="center">
              <div>
                <CustomSelect
                  label="Batch"
                  value={selectedBatch}
                  onChange={handleBatchChange}
                  options={batchOptions}
                  sx={{ width: 400 }}
                />
             
              </div>

            
            </div>

            <span className="label1">Assignment Name</span>
            <div className="center">
              <TextField
                id="outlined-basic"
                label="Assignment Name"
                variant="outlined"
                value={assignmentName}
                onChange={handleAssignmentNameChange}
                
              />
             
            </div>

            <span className="label1">Marking Scheme</span>
            <div className="center">
              <TextField
                id="outlined-basic"
                label="Marking Scheme"
                variant="outlined"
                value={schemepath}
                onChange={handleSchemePathChange}

              />
              <InputFileUploadButton onFileSelect={handleSelectedFileChange} />
      
            </div>
          </div>
          <div
            id="button-save-cancel"
            style={{
              display: "flex",
              flexDirection: "row",
         
            }}
          >
         

            <Link to="/Dashboard" style={{ textDecoration: "none" }}>
              {" "}
     
              <CustomButton
                text="Cancel"
                onClick={handleCancel}
                backgroundColor="white"
                textColor="#7894DB"
              />
            </Link>

            <CustomButton
              text="Next"
              onClick={handleSubmit}
              backgroundColor="#7894DB"
              textColor="white"
            />


          </div>
        </div>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity="warning"
            variant="filled"
            sx={{ width: "100%" }}
          >
            Please select a module first!
          </Alert>
        </Snackbar>
      </MainRightPane>
    </div>
  );
};

export default NewAssignmentPage;

