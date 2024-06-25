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

const DeleteBatch = () => {
  const { selectedModuleCode, batch } = useParams();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);




  const {enqueueSnackbar} = useSnackbar();

  useEffect(() => {
    setOpenDialog(true); // Open the dialog when the component mounts
  }, []);

  const deleteBatch = async () => {
    setLoading(true);
    const response = await axios.delete(
      `http://localhost:3500/batch/${selectedModuleCode}`,
      { batch: batch }
    );
    console.log("Batch is deleted !");
    enqueueSnackbar('Batch deleted successfully.', { variant: 'success' });
    navigate(`/Batches/${selectedModuleCode}`);
    setLoading(false);
  }

  const handleDeleteConfirmation = async () => {
    try {
      await deleteBatch();
    } catch (error) {
      if(error.response && error.response.status === 401){
        const newAccessToken = await refreshAccessToken();
        console.log("New access token: ", newAccessToken);

        if(newAccessToken){
          try {
            // await refreshAccessToken();
            await deleteBatch();
          } catch (error) {
            console.error("Error deleting batch:", error);
            enqueueSnackbar('Failed to delete batch.', { variant: 'error' });
          }
        }
      }
      else{
        console.error("Error deleting batch:", error);
        enqueueSnackbar('Failed to delete batch.', { variant: 'error' });
      }
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    navigate(`/Batches/${selectedModuleCode}`);
  };

  return (
    <div>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{"Delete Module"}</DialogTitle>
        <DialogContent>
          <div>Do you really want to delete this batch?</div>
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

export default DeleteBatch;
