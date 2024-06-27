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
import { useSnackbar } from "notistack";
const baseUrl = process.env.REACT_APP_BASE_URL;

const EditBatch = () => {
  const { selectedModuleCode, batch } = useParams();

  const [batch_, setBatch] = useState("");

  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const handleBatchNumberChange = (e) => {
    const value = e.target.value;
    console.log("Batch Number:", value);
    setBatch(value);
  };

  const sendData = async () => {
    console.log("batch no value saves", batch_);

    await axios.put(`${baseUrl}/batch/${selectedModuleCode}`, {
      newBatch: batch_,
    });

    console.log("Batch is created!", batch_);
    enqueueSnackbar("Batch editted successfully!", { variant: "success" });

    navigate(`/Batches/${selectedModuleCode}`);
  };

  const handleEditBatch = async (e) => {
    e.preventDefault();
    try {
      if (batch_ === batch) {
      } else {
        await sendData();
      }
    } catch (error) {
      if (batch_ === batch) {
      } else if (error.response && error.response.status === 401) {
        const newAccessToken = await refreshAccessToken();
        console.log("New access token: ", newAccessToken);

        if (newAccessToken) {
          try {
            await sendData();
          } catch (error) {
            if (error.response && error.response.status === 409) {
              enqueueSnackbar("Batch already exists.", { variant: "error" });
            } else {
              console.error("Error fetching data:", error);
              enqueueSnackbar("An error occurred while editting the batch.", {
                variant: "error",
              });
            }
          }
        }
      }
      if (error.response && error.response.status === 409) {
        enqueueSnackbar("Batch already exists.", { variant: "error" });
      } else {
        console.error("Error fetching data:", error);
        enqueueSnackbar("An error occurred while editting the batch.", {
          variant: "error",
        });
      }
    }
  };

  return (
    <div className="align1">
      <MainRightPane>
        <Button
          id="back-button"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
        >
          Back
        </Button>

        <h1 id="heading">Edit Batch</h1>
        <div className="alignment">
          <span id="label1-new-batch-page">Batch Number</span>
          <TextField
            id="filled-hidden-label-small"
            placeholder={batch}
            variant="filled"
            onChange={handleBatchNumberChange}
            sx={{
              marginLeft: 5,
              marginTop: 0,
              marginRight: 5,
              "& input": {
                fontSize: "1rem",
                padding: "8px 12px",
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
          <Button id="add-button" onClick={handleEditBatch} variant="contained">
            Edit
          </Button>
        </div>
      </MainRightPane>
    </div>
  );
};

export default EditBatch;
