import React, { useState, useEffect } from "react";
import MainLeftPane from "../components/MainLeftPane/MainLeftPane";
import MainRightPane from "../components/MainRightPane/MainRightPane";
import {
  Button,
  TextField,
  colors,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import Cookies from "js-cookie";

import "../styles/MyModulesPage.css";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import refreshAccessToken from "../services/AuthService";
import { useSnackbar } from "notistack";

const DeleteAssignment = () => {
  const { selectedModuleCode, batch, selectedAssignmentId } = useParams();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const columns = [
    { field: "modulecode", headerName: "Module Code", width: 150 },
    { field: "modulename", headerName: "Module Name", width: 150 },
    { field: "credits", headerName: "Credits", width: 150 },
  ];

  useEffect(() => {
    setOpenDialog(true); // Open the dialog when the component mounts
  }, []);

  const deleteAssignment = async () => {
    setLoading(true);
    const response = await axios.delete(
      `http://localhost:3500/assignment/${selectedModuleCode}/${batch}/${selectedAssignmentId}`
    );
    console.log("Assignment is deleted !");
    enqueueSnackbar("Assignment deleted successfully!", { variant: "success" });
    navigate("/Dashboard");
    setLoading(false);
  };

  const handleDeleteConfirmation = async () => {
    console.log("Trying to delete assignment");
    try {
      await deleteAssignment();
    } catch (error) {
      if (error.response && error.response.status === 401) {
        const newAccessToken = await refreshAccessToken();
        console.log("New access token: ", newAccessToken);

        if (newAccessToken) {
          try {
            // await refreshAccessToken();
            await deleteAssignment();
          } catch (error) {
            console.error("Error fetching data:", error);
            enqueueSnackbar("Failed to delete assignment.", {
              variant: "error",
            });
          }
        }
      } else {
        console.error("Error fetching data:", error);
        enqueueSnackbar("Failed to delete assignment.", { variant: "error" });
      }
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    navigate("/Dashboard");
  };

  return (
    <div>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{"Delete Assignment"}</DialogTitle>
        <DialogContent>
          <div>Do you really want to delete this assignment?</div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            No
          </Button>
          <Button onClick={handleDeleteConfirmation} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteAssignment;
