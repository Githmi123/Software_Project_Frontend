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

const DeleteModule = () => {
  const { selectedModuleCode } = useParams();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    setOpenDialog(true); // Open the dialog when the component mounts
  }, []);

  const handleDeleteConfirmation = async () => {
    try {
      await refreshAccessToken();
      const response = await axios.delete(
        `http://localhost:3500/modules/delete/${selectedModuleCode}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        }
      );
      console.log("Module is deleted !");
      navigate("/MyModulePage");
    } catch (error) {
      console.error("Error deleting module:", error);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
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
