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

const EditModule = () => {
  const { selectedModuleCode } = useParams();
  const [moduleData, setModuleData] = useState({
    modulecode: "",
    modulename: "",
    credits: "",
  });

  useEffect(() => {
    const fetchModuleDetails = async () => {
      try {
        await refreshAccessToken();
        const accessToken = Cookies.get("accessToken");
        if (!accessToken) {
          console.error("Access token not available");
          return;
        }

        console.log("selected module code :", selectedModuleCode);
        const response = await axios.get(
          `http://localhost:3500/modules/view/${selectedModuleCode}`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("accessToken")}`,
            },
          }
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const accessToken = Cookies.get("accessToken");
      if (!accessToken) {
        console.error("Access token not available");
        return;
      }
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      await axios.post(
        `http://localhost:3500/modules/edit/${selectedModuleCode}`,
        moduleData,
        config
      );
      navigate("/MyModulePage");
    } catch (error) {
      console.error("Error editing module:", error);
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
          Home
        </Button>
        <h1>Edit Page {selectedModuleCode}</h1>
        <h2
          style={{
            fontSize: "19px",
            marginLeft: "35px",
            marginTop: "5px",
            color: "black",
          }}
        >
          Module Code
        </h2>
        <TextField
          name="modulecode"
          value={moduleData.modulecode}
          onChange={handleChange}
          sx={{
            marginLeft: 5,
            marginTop: 3,
            marginRight: 5,
            "& input": {
              fontSize: "0.8rem", // Adjust the font size to decrease the size of the text box
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
            marginTop: "15px",
            color: "black",
          }}
        >
          Module Name
        </h2>
        <TextField
          name="modulename"
          value={moduleData.modulename}
          onChange={handleChange}
          sx={{
            marginLeft: 5,
            marginTop: 3,
            marginRight: 5,
            "& input": {
              fontSize: "0.8rem", // Adjust the font size to decrease the size of the text box
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
            marginTop: "15px",
            color: "black",
          }}
        >
          Credits
        </h2>
        <TextField
          name="credits"
          value={moduleData.credits}
          onChange={handleChange}
          sx={{
            marginLeft: 5,
            marginTop: 3,
            marginRight: 5,
            "& input": {
              fontSize: "0.8rem", // Adjust the font size to decrease the size of the text box
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
