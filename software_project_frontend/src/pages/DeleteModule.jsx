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
const baseUrl = process.env.REACT_APP_BASE_URL;

const DeleteModule = () => {
  const { selectedModuleCode } = useParams();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const columns = [
    { field: "modulecode", headerName: "Module Code", width: 150 },
    { field: "modulename", headerName: "Module Name", width: 150 },
    { field: "credits", headerName: "Credits", width: 150 },
  ];

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setOpenDialog(true);
  }, []);

  const deleteModule = async () => {
    setLoading(true);
    const response = await axios.delete(
      `${baseUrl}/modules/delete/${selectedModuleCode}`
    );
    console.log("Module is deleted !");
    enqueueSnackbar("Module deleted successfully.", { variant: "success" });
    navigate("/MyModulePage");
    setLoading(false);
  };

  const handleDeleteConfirmation = async () => {
    try {
      await deleteModule();
    } catch (error) {
      if (error.response && error.response.status === 401) {
        const newAccessToken = await refreshAccessToken();
        console.log("New access token: ", newAccessToken);

        if (newAccessToken) {
          try {
            await deleteModule();
          } catch (error) {
            console.error("Error deleting module:", error);
            enqueueSnackbar("Failed to delete module.", { variant: "error" });
          }
        }
      } else {
        console.error("Error deleting module:", error);
        enqueueSnackbar("Failed to delete module.", { variant: "error" });
      }
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    navigate("/MyModulePage");
  };

  return (
    <div>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{"Delete Module"}</DialogTitle>
        <DialogContent>
          <div>Do you really want to delete this module?</div>
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

export default DeleteModule;
