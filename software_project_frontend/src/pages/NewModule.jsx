import React, { useState, useEffect } from "react";
import MainLeftPane from "../components/MainLeftPane/MainLeftPane";
import MainRightPane from "../components/MainRightPane/MainRightPane";
import { Button, TextField, colors } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import Cookies from "js-cookie";

import "../styles/MyModulesPage.css";
// import "../styles/NewAssignmentPage.css";
import { Link, useNavigate } from "react-router-dom";
import refreshAccessToken from "../services/AuthService";

const NewModule = () => {
  const [moduleData, setModuleData] = useState({
    modulecode: "",
    modulename: "",
    credits: "",
  });

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

      const config = {
        headers: {
          Authorization: `Bearer ${Cookies.get('accessToken')}`,
        },
      };

      await axios.post("http://localhost:3500/modules", moduleData, config);

      console.log("Module is created!");

      navigate("/MyModulePage");
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
            style={{width: "max-width"}}
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
            style={{width:"max-width"}}
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
            style={{width: "max-width"}}
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
                  // marginLeft: "15px",
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
        
        </div>
      </MainRightPane>
    </div>
  );
};

export default NewModule;
