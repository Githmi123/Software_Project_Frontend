import React, { useState, useEffect } from "react";
import MainLeftPane from "../components/MainLeftPane/MainLeftPane";
import MainRightPane from "../components/MainRightPane/MainRightPane";
import { Button, CircularProgress, TextField, colors } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import Cookies from "js-cookie";
import "../styles/MyModulesPage.css";
import { Link, useNavigate } from "react-router-dom";
import refreshAccessToken from "../services/AuthService";
import { useSnackbar } from "notistack";

const NewModule = () => {
  const [moduleData, setModuleData] = useState({
    modulecode: "",
    modulename: "",
    credits: "",
  });
  const [loading, setLoading] = useState(false);
  const {enqueueSnackbar} = useSnackbar();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setModuleData({
      ...moduleData,
      [name]: value,
    });
  };

  const navigate = useNavigate();


  const submit = async () => {
    setLoading(true);
    await axios.post("http://localhost:3500/modules", moduleData);


      console.log("Module is created!");
      console.log(moduleData);
      setLoading(false);
      navigate("/MyModulePage");
      enqueueSnackbar('Module created successfully!', { variant: 'success' });
      
  }

  const handleSubmit = async (e) => {
    if(moduleData.modulecode === '' || moduleData.modulename === '' || moduleData.credits === ''){
      enqueueSnackbar('Please enter all the details.', { variant: 'error' });
    }

    else{
      e.preventDefault();
    try {
      await submit();
    } catch (error) {
      if(error.response && error.response.status === 401){
        const newAccessToken = await refreshAccessToken();
        console.log("New access token: ", newAccessToken);

        if(newAccessToken){
          try {
            await submit();
          } catch (error) {
      
            if (error.response && error.response.status === 409) {
              setLoading(false);
              enqueueSnackbar('Module already exists.', { variant: 'error' });
            } else {
              setLoading(false);
              console.error("Error fetching data:", error);
              enqueueSnackbar('An error occurred while creating the module.', { variant: 'error' });
            }
          }
        }
      }
      

      else if (error.response && error.response.status === 409) {
        setLoading(false);
        enqueueSnackbar('Module already exists.', { variant: 'error' });
      } else {
        setLoading(false);
        console.error("Error fetching data:", error);
        enqueueSnackbar('An error occurred while creating the module.', { variant: 'error' });
      }
     
    }
    }
    
  };

  return (
    <div className="align1">
  
      <MainRightPane>
        <Button
          sx={{
            // m: 2,
            width: "100px",
            height: "50px",
            color: "black",
            fontWeight: "bold",
            marginBottom: "2vh",
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
                fontSize: "1rem",
                padding: "8px 12px",
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
                fontSize: "1rem",
                padding: "8px 12px",
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
                fontSize: "1rem",
                padding: "8px 12px",
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
         
            <Link to="/MyModulePage" style={{ textDecoration: "none" }}>
              <Button
                sx={{
  
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
              data-testid="save-button"
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
        {loading && (
        <div style={{display: "flex", justifyContent:"center"}}><CircularProgress/></div>
      )}
        

        </div>
      </MainRightPane>
    </div>
  );
};

export default NewModule;
