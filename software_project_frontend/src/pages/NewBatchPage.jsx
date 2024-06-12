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

  const handleNewBatch = async (e) => {
    e.preventDefault();
    try {
      await refreshAccessToken();
      // const accessToken = Cookies.get("accessToken");

      // //console.log(accessToken);
      // if (!accessToken) {
      //   console.error("Access token not available");
      // }

      const config = {
        headers: {
          Authorization: `Bearer ${Cookies.get('accessToken')}`,
        },
      };

      console.log("batch no value saves", batch);

      await axios.post(
        `http://localhost:3500/batch/${selectedModuleCode}`,
        { batch: batch },
        config
      );

      console.log("Batch is created!");

      navigate(`/Batches/${selectedModuleCode}`);
    } catch (error) {
      console.error("Error creating module:", error);
    }
  };

  return (
    <div className="align1">
  
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

        <h1 id="heading-new-batch-page">New Batch</h1>
        <div id="textfield-set">
          <span id="label1-new-batch-page">Batch Number</span>
          <TextField
            id="outlined-basic"
            label="Batch Number"
            variant="outlined"
            onChange={handleBatchNumberChange}
            //value={assignmentName}
            //onChange={handleAssignmentNameChange}
            sx={{
              m: "2vh",
              width: "100vh",
              maxWidth: "70vh",
              padding: "0",
              position: "relative",
            }}
          />
        </div>
        <Button id="add-button" onClick={handleNewBatch} variant="contained">
          Add
        </Button>
      </MainRightPane>
    </div>
  );
};

export default NewBatchPage;
