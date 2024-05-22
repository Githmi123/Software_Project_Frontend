import React, { useState, useEffect } from "react";
import MainLeftPane from "../components/MainLeftPane/MainLeftPane";
import MainRightPane from "../components/MainRightPane/MainRightPane";
import { Button, TextField, colors } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import Cookies from "js-cookie";

import "../styles/MyModulesPage.css";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import refreshAccessToken from "../services/AuthService";
import InputFileUploadButton from "../components/Buttons/InputFileUploadButton";

const EditAssignment = () => {
  const { selectedModuleCode, batch, selectedAssignmentId } = useParams();
  const [moduleData, setModuleData] = useState(
    null

  );
  const [selectedFile, setSelectedFile] = useState("");
  const [schemepath, setSchemePath] = useState("");

  useEffect(() => {
    const fetchAssignmentDetails = async () => {
      try {
        await refreshAccessToken();

        console.log("selected module code :", selectedModuleCode);
        console.log(batch, selectedAssignmentId);
        const response = await axios.get(
          `http://localhost:3500/assignment/${selectedModuleCode}/${batch}/${selectedAssignmentId}`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("accessToken")}`,
            },
          }
        );
        setModuleData(response.data[0]);
        
        setSchemePath(moduleData.schemepath); // Update the schemepath state with the file name
        console.log("response:", response.data[0]);
        console.log(moduleData.batch);
      } catch (error) {
        console.error("Error fetching module:", error);
      }
    };

    fetchAssignmentDetails();
  }, [selectedModuleCode, batch, selectedAssignmentId ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setModuleData({
      ...moduleData,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await refreshAccessToken();

      await axios.post(
        `http://localhost:3500/modules/edit/${selectedModuleCode}`,
        moduleData,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        }
      );
      navigate("/MyModulePage");
    } catch (error) {
      console.error("Error editing module:", error);
    }
  };

  const handleSelectedFileChange = (file) => {
    setSelectedFile(file); // Store the selected file
    setSchemePath(file.name); // Update the schemepath state with the file name

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
        <h1>Edit Assignment: {selectedAssignmentId}</h1>
        <div className="alignment" style={{margin:"5vh", marginTop:"1vh"}}>
          <h2
            style={{
              fontSize: "2vh",
              marginLeft: "35px",
              // marginTop: "5vh",
              color: "black",
            }}
          >
            Assignment Name
          </h2>
          <TextField
          hiddenLabel
          id="filled-hidden-label-small"
          variant="filled"
          // defaultValue="Module Code"
          placeholder="Assignment Name"
          name="selectedAssignmentName"
          value={moduleData ? moduleData.assignmenttitle : ""}
          onChange={handleChange}
            style={{width: "max-width"}}
            sx={{
              marginLeft: 5,
              marginTop: 0,
              marginRight: 5,
              "& input": {
                fontSize: "0.7rem", // Adjust the font size to decrease the size of the text box
                padding: "8px 12px", // Adjust the padding to match the new font size
              },
            }}
          >
            Assignment Name
          </TextField>

          <h2
            style={{
              fontSize: "2vh",
              marginLeft: "35px",
              marginTop: "5vh",
              color: "black",
            }}
          >
            Module Code
          </h2>
          <TextField
          hiddenLabel
          id="filled-hidden-label-small"
          variant="filled"
          // defaultValue="Module Code"
          placeholder="Module Code"
          name="selectedModuleCode"
          value={selectedModuleCode}
          onChange={handleChange}
            style={{width:"max-width"}}
            sx={{
              marginLeft: 5,
              marginTop: 0,
              marginRight: 5,
              "& input": {
                fontSize: "0.7rem", // Adjust the font size to decrease the size of the text box
                padding: "8px 12px", // Adjust the padding to match the new font size
              },
            }}
          >
            Module Code
          </TextField>

          <h2
            style={{
              fontSize: "2vh",
              marginLeft: "35px",
              marginTop: "5vh",
              color: "black",
            }}
          >
            Batch
          </h2>
          <TextField
          hiddenLabel
          id="filled-hidden-label-small"
          variant="filled"
          // defaultValue="Module Code"
          placeholder="Credits"
          name="batch"
          value={batch}
          onChange={handleChange}
            style={{width: "max-width"}}
            sx={{
              marginLeft: 5,
              marginTop: 0,
              marginRight: 5,
              "& input": {
                fontSize: "0.7rem", // Adjust the font size to decrease the size of the text box
                padding: "8px 12px", // Adjust the padding to match the new font size
              },
            }}
          >
            Batch
          </TextField>

          <h2
            style={{
              fontSize: "2vh",
              marginLeft: "35px",
              marginTop: "5vh",
              color: "black",
            }}
          >
            Change Marking Scheme
          </h2>
          <TextField
              hiddenLabel
              id="filled-hidden-label-small"
              variant="filled"
              value={moduleData && moduleData.schemepath ? schemepath : ""}
              // onChange={handleSchemePathChange}
              style={{width: "max-width"}}
            sx={{
              marginLeft: 5,
              marginBottom: 2,
              marginRight: 5,
              "& input": {
                fontSize: "0.7rem", // Adjust the font size to decrease the size of the text box
                padding: "8px 12px", // Adjust the padding to match the new font size
              },
            }}
            />
            <div style={{width:"auto", display:"flex", justifyContent:"right"}}><InputFileUploadButton onFileSelect={handleSelectedFileChange} text = "Change Marking Scheme" />
</div>
            
        </div>
      

        <div
          style={{
            marginTop: "50px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {/* <Button sx={{marginLeft:'15px',color:'#7894DB',backgroundColor:'white', border: '1px solid #7894DB','&:hover': { backgroundColor: '#7894DB', color: 'white' }}}>Cancel</Button> */}

          <Link to="/MyModulePage" style={{ textDecoration: "none" }}>
            <Button
              sx={{
                marginLeft: "15px",
                color: "#7894DB",
                backgroundColor: "white",
                border: "1px solid #7894DB",
                "&:hover": { backgroundColor: "#7894DB", color: "white" },
              }}
            >
              Cancel
            </Button>
          </Link>

          <Button
            onClick={handleSubmit}
            sx={{
              marginLeft: "15px",
              color: "#7894DB",
              backgroundColor: "white",
              border: "1px solid #7894DB",
              "&:hover": { backgroundColor: "#7894DB", color: "white" },
            }}
          >
            Save
          </Button>
        </div>
      </MainRightPane>
    </div>
  );
};

export default EditAssignment;
