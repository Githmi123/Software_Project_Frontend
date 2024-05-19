import React, { useState, useEffect } from "react";
import MainLeftPane from "../components/MainLeftPane/MainLeftPane";
import MainRightPane from "../components/MainRightPane/MainRightPane";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button, InputAdornment, TextField } from "@mui/material";
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
import refreshAccessToken from "../services/AuthService";

const NewAssignmentPage = () => {
  const [moduleOptions, setModuleOptions] = useState([]);
  const [batchOptions, setBatchOptions] = useState([]);
  const [selectedModule, setSelectedModule] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [assignmentName, setAssignmentName] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [schemepath, setSchemePath] = useState("");

  // onchange states
  const [excelFile, setExcelFile] = useState(null);
  const [typeError, setTypeError] = useState(null);

  // submit state
  const [excelData, setExcelData] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchModulesAndBatches = async () => {
      try {
        await refreshAccessToken();

        const modulesResponse = await axios.get(
          "http://localhost:3500/modules",
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("accessToken")}`,
            },
          }
        );
        const modules = modulesResponse.data;
        const moduleOptions = modules.map((module) => ({
          value: module.modulecode,
          label: module.modulename,
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
        // const accessToken = Cookies.get("accessToken");
        // if (!accessToken || !selectedModule) {
        //   console.error(
        //     "Access token not available or selected module is empty"
        //   );
        //   return;
        // }
        await refreshAccessToken();

        const batchResponse = await axios.get(
          `http://localhost:3500/batch/${selectedModule}`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("accessToken")}`,
            },
          }
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
    setSelectedModule(event.target.value);
  };

  const handleBatchChange = (event) => {
    setSelectedBatch(event.target.value);
  };

  const handleAssignmentNameChange = (event) => {
    setAssignmentName(event.target.value);
  };

  const handleSchemePathChange = (event) => {
    setSchemePath(event.target.value);
  };

  /* const handleFile = (e) => {
    let fileTypes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
    ];
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileTypes.includes(selectedFile.type)) {
        setTypeError(null);
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          setExcelFile(e.target.result);
        };
      } else {
        setTypeError("Please select only excel file types");
        setExcelFile(null);
      }
    } else {
      console.log("Please select your file");
    }
  };

  const handleFileSubmit = (e) => {
    e.preventDefault();
    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, { type: "buffer" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      setExcelData(data.slice(0, 10));
    }
  }; */

  const handleSelectedFileChange = (file) => {
    setSelectedFile(file); // Store the selected file
    setSchemePath(file.name); // Update the schemepath state with the file name
  };

  const handleCancel = (event) => {};

  const handlePrevious = (event) => {
    window.history.back(); // Navigate to previous page
  };

  const handleSave = (event) => {};
  // const onFileSelect = (event) => {

  //     console.log("File selected");
  // };

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
      await refreshAccessToken();

      const formData = new FormData();

      formData.append("batch", selectedBatch);
      formData.append("modulecode", selectedModule);
      formData.append("assignmenttitle", assignmentName);
      formData.append("schemepath", schemepath);
      formData.append("scheme", selectedFile);

      // Make the POST request with the FormData object
      await axios.post(
        `http://localhost:3500/assignment/${selectedModule}/${selectedBatch}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
            "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
          },
        }
      );

      console.log("Assignment is created!");

      console.log("Assignment is created!");

      navigate("/Dashboard");
    } catch (error) {
      console.error("Error creating module:", error);
    }
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
          Back
        </Button>
        <div className="align">
          <span className="label1">Module</span>
          <CustomSelect
            label="Module"
            value={selectedModule}
            onChange={handleModuleChange}
            options={moduleOptions}
          />

          <span className="label1">Batch</span>
          <CustomSelect
            label="Batch"
            value={selectedBatch} // Use selectedBatch instead of selectedValue
            onChange={handleBatchChange}
            options={batchOptions}
          />

          <span className="label1">Assignment Name</span>
          <TextField
            id="outlined-basic"
            label="Assignment Name"
            variant="outlined"
            value={assignmentName}
            onChange={handleAssignmentNameChange}
            sx={{ m: 0.5, maxWidth: 400, padding: "0", position: "relative" }}
          />
          <span className="label1">Marking Scheme</span>
          <div className="center">
            <TextField
              id="outlined-basic"
              label="Marking Scheme"
              variant="outlined"
              value={schemepath}
              onChange={handleSchemePathChange}
              sx={{
                m: 0.5,
                width: "46vh",
                maxWidth: 400,
                padding: "0",
                position: "relative",
              }}
            />
            <InputFileUploadButton onFileSelect={handleSelectedFileChange} />
            {/* <InputFileUploadButton onFileSelect={onFileSelect}/> */}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* <CustomButton text = "Cancel" onClick = {handleCancel} backgroundColor = "white" textColor = "#7894DB" /> */}

          <Link to="/RecentPage" style={{ textDecoration: "none" }}>
            {" "}
            {/* Wrap the button with Link */}
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

          {/* <Button variant="contained" style={{margin:"10px", backgroundColor:"white", color:"#7894DB", width : "20vh", textTransform: "capitalize", border: "2px solid #7894DB"}}>Cancel</Button> */}
          {/* <Button variant="contained" style={{margin:"10px", backgroundColor:"#7894DB", width : "20vh", textTransform: "capitalize"}}>Save</Button> */}
        </div>
      </MainRightPane>
    </div>
  );
};

export default NewAssignmentPage;

{
  /* {selectedImage && (
                                                <TextField
                                                id="outlined-basic"
                                                label="Marking Scheme"
                                                variant="outlined"
                                                value={selectedImage.name}
                                                sx={{ m: 0.5, maxWidth: 400, padding:"0", position:"relative"}}
                                                InputProps={{
                                                    startAdornment: (
                                                    <InputAdornment position="start">Selected: {selectedImage.name} </InputAdornment>
                                                    ),
                                                }}
                                                />
                                            )} */
}

{
  /* <span className='label1'>Marking Scheme</span>
                <div className='center'>
                    <InputFileUploadButton onFileSelect={onFileSelect} /> */
}
{
  /* <label htmlFor="contained-button-file">
                <InputFileUploadButton/>
                </label>*/
}

{
  /* <TextField
                            id="outlined-basic"
                            label="Marking Scheme"
                            variant="outlined"
                            // type='file'
                            value={selectedImage.name}
                            onChange={handleSelectedImageChange}
                            sx={{ m: 0.5, maxWidth: 400, padding:"0", position:"relative"}}
                            InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">Selected: {selectedImage.name} </InputAdornment>
                                                    ),
                            }}
                            // InputProps={{
                            //     endAdornment: (
                            //         <InputAdornment position='end'>
                                        
                            //         </InputAdornment>
                            //     )
                            // }}
                        
                        /> */
}

{
  /* <InputFileUploadButton/> */
}
{
  /* <InputFileUploadButton onFileSelect={onFileSelect} /> */
}

{
  /* <div> */
}
{
  /* <label htmlFor="dropdown">Choose an option:</label> */
}
{
  /* <select id="dropdown" value={selectedValue} onChange={handleChange}>
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                    </select> */
}
{
  /* <p>Selected option: {selectedValue}</p> */
}
{
  /* </div> */
}

{
  /* <FormControl sx={{ m: 0.5, maxWidth: 400 }}>
                    <InputLabel id="demo-simple-select-helper-label">Select Module</InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={selectedValue}
                        label="Age"
                        onChange={handleChange}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select> */
}
{
  /* <FormHelperText>With label + helper text</FormHelperText> */
}
{
  /* </FormControl> */
}
{
  /* <FormControl sx={{ m: 1, minWidth: 120 }}>
        <Select
          value={selectedValue}
          onChange={handleChange}
          label="Select Module"
        
          
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        {/* <FormHelperText>Without label</FormHelperText> */
}
{
  /* </FormControl> */
}

{
  /* <div> */
}
{
  /* <label htmlFor="dropdown">Choose an option:</label> */
}
{
  /* <select id="dropdown" value={selectedValue} onChange={handleChange}>
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                    </select> */
}
{
  /* <p>Selected option: {selectedValue}</p> */
}
{
  /* </div> */
}

{
  /* <FormControl sx={{ m: 0.5, maxWidth: 400 }}>
                    <InputLabel id="demo-simple-select-helper-label">Select Batch</InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={selectedValue}
                        label="Batch"
                        onChange={handleChange}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select> */
}
{
  /* <FormHelperText>With label + helper text</FormHelperText> */
}
{
  /* </FormControl> */
}

{
  /* </div> */
}
