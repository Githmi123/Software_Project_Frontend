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
import { useSnackbar } from "notistack";

const EditModule = () => {
  const { selectedModuleCode } = useParams();
  const [moduleData, setModuleData] = useState({
    modulecode: "",
    modulename: "",
    credits: "",
  });


  const {enqueueSnackbar} = useSnackbar();

  useEffect(() => {
    const fetchModuleDetails = async () => {
      try {
        // await refreshAccessToken();

        console.log("selected module code :", selectedModuleCode);
        const response = await axios.get(
          `http://localhost:3500/modules/view/${selectedModuleCode}`
        );
        setModuleData(response.data);
      } catch (error) {
        console.error("Error fetching module:", error);
      }
    };

    fetchModuleDetails();
  }, [selectedModuleCode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setModuleData({
      ...moduleData,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  const submit = async () => {
    await axios.post(
      `http://localhost:3500/modules/edit/${selectedModuleCode}`,
      moduleData
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // await refreshAccessToken();
      await submit();
      
      enqueueSnackbar(`Edited module successfully`, { variant: 'success' });
      navigate("/MyModulePage");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        const newAccessToken = await refreshAccessToken();
        console.log("New access token: ", newAccessToken);

        if (newAccessToken) {
          try {
            // await refreshAccessToken();
            await submit();
          } catch (error) {
            if (error.response && error.response.status === 400) {
              enqueueSnackbar('No changes made', { variant: 'info' });
            } 
            else {
              enqueueSnackbar(`Error editing module`, { variant: 'error' });
            }
            
          }
        }
      } 
      else if (error.response && error.response.status === 400) {
        enqueueSnackbar('No changes made', { variant: 'info' });
      } 
      else {
        enqueueSnackbar(`Error editing module`, { variant: 'error' });
      }
    }
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
        <h1 id="heading">Edit Module: {selectedModuleCode}</h1>
        <div className="alignment">
          <h2
            style={{
              fontSize: "19px",
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
            name="modulecode"
            value={moduleData.modulecode}
            onChange={handleChange}
            style={{ width: "max-width" }}
            sx={{
              marginLeft: 5,
              marginTop: 0,
              marginRight: 5,
              "& input": {
                fontSize: "1rem", // Adjust the font size to decrease the size of the text box
                padding: "8px 12px", // Adjust the padding to match the new font size
              },
            }}
          >
            Module Code
          </TextField>

          <h2
            style={{
              fontSize: "19px",
              marginLeft: "35px",
              marginTop: "5vh",
              color: "black",
            }}
          >
            Module Name
          </h2>
          <TextField
            hiddenLabel
            id="filled-hidden-label-small"
            variant="filled"
            // defaultValue="Module Code"
            placeholder="Module Name"
            name="modulename"
            value={moduleData.modulename}
            onChange={handleChange}
            style={{ width: "max-width" }}
            sx={{
              marginLeft: 5,
              marginTop: 0,
              marginRight: 5,
              "& input": {
                fontSize: "1rem", // Adjust the font size to decrease the size of the text box
                padding: "8px 12px", // Adjust the padding to match the new font size
              },
            }}
          >
            Module Name
          </TextField>

          <h2
            style={{
              fontSize: "19px",
              marginLeft: "35px",
              marginTop: "5vh",
              color: "black",
            }}
          >
            Credits
          </h2>
          <TextField
            hiddenLabel
            id="filled-hidden-label-small"
            variant="filled"
            // defaultValue="Module Code"
            placeholder="Credits"
            name="credits"
            value={moduleData.credits}
            onChange={handleChange}
            style={{ width: "max-width" }}
            sx={{
              marginLeft: 5,
              marginTop: 0,
              marginRight: 5,
              "& input": {
                fontSize: "1rem", // Adjust the font size to decrease the size of the text box
                padding: "8px 12px", // Adjust the padding to match the new font size
              },
            }}
          >
            Credits
          </TextField>
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

export default EditModule;
