import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import MainLeftPane from "../components/MainLeftPane/MainLeftPane";
import MainRightPane from "../components/MainRightPane/MainRightPane";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CustomButton from "../components/Buttons/CustomButton";
import { Link, useNavigate, useParams } from "react-router-dom";

import axios from "axios";
import Cookies from "js-cookie";

import "../styles/NewAssignmentPage.css";
import "../styles/NewBatchPage.css";
import refreshAccessToken from "../services/AuthService";

const NewBatchPage = () => {
  const { selectedModuleCode } = useParams();
  //console.log("in new batch page:", selectedModuleCode);
  const [batch, setBatch] = useState("");

  const navigate = useNavigate();

  const handleBatchNumberChange = (e) => {
    const value = e.target.value;
    console.log("Batch Number:", value);
    setBatch(value);
  };

  //console.log(batchNumber);

  const sendData = async () => {
    console.log("batch no value saves", batch);

      await axios.post(
        `http://localhost:3500/batch/${selectedModuleCode}`,
        { batch: batch }
      );

      console.log("Batch is created!");

      navigate(`/Batches/${selectedModuleCode}`);
  }

  const handleNewBatch = async (e) => {
    e.preventDefault();
    try {
      await sendData();
      // const accessToken = Cookies.get("accessToken");

      // //console.log(accessToken);
      // if (!accessToken) {
      //   console.error("Access token not available");
      // }

     

      
    } catch (error) {
      if (error.response && error.response.status === 401) {
        const newAccessToken = await refreshAccessToken();
        console.log("New access token: ", newAccessToken);

        if (newAccessToken) {
          try {
            // await refreshAccessToken();
            await sendData();
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        }
      } else {
        console.error("Error fetching data:", error);
      }
    }
  };

  return (
    <div className="align1">
  
      <MainRightPane>
        <Button id = "back-button"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
        >
          Back
        </Button>

        <h1 id="heading">New Batch</h1>
        <div className="alignment">
          <span id="label1-new-batch-page">Batch Number</span>
          <TextField
            id="filled-hidden-label-small"
            label="Batch Number"
            variant="outlined"
            onChange={handleBatchNumberChange}
            //value={assignmentName}
            //onChange={handleAssignmentNameChange}
            sx={{
              marginLeft: 5,
              marginTop: 0,
              marginRight: 5,
              "& input": {
                fontSize: "1rem", // Adjust the font size to decrease the size of the text box
                padding: "8px 12px", // Adjust the padding to match the new font size
              },
            }}
          />
        </div>
        <div
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "center",
            }}
          >
        <Button id="add-button" 
            onClick={handleNewBatch} variant="contained">
          Add
        </Button>
        </div>
      </MainRightPane>
    </div>
  );
};

export default NewBatchPage;
