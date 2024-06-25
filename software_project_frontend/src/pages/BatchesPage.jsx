import React, { useState, useEffect } from "react";
import MainLeftPane from "../components/MainLeftPane/MainLeftPane";
import MainRightPane from "../components/MainRightPane/MainRightPane";
import { Button, CircularProgress, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CustomNewButton from "../components/Buttons/CustomNewButton";

import { Link, useNavigate, useParams } from "react-router-dom";
import refreshAccessToken from "../services/AuthService";
import axios from "axios";
import Cookies from "js-cookie";

import "../styles/BatchesPage.css";
import { Delete, Edit } from "@mui/icons-material";

const BatchesPage = () => {
  const { selectedModuleCode } = useParams();
  const [batches, setBatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(false);

  const [moduleData, setModuleData] = useState(null);

  const navigate = useNavigate();

  const handleEditModule = async (modulecode) => {
    // e.preventDefault();
    // try {
    //   console.log("handling edit module");
    //   console.log(moduleData);
    //   await refreshAccessToken();

    //   await axios.post(
    //       `http://localhost:3500/modules/edit/${selectedModule}`,
    //       moduleData,
    //       {
    //         headers: {
    //           Authorization: `Bearer ${Cookies.get("accessToken")}`,
    //         },
    //       }
    //   )

    navigate(`/EditBatch/${selectedModuleCode}/$`);
   
    // } catch (error) {
    //   console.error("Error editing module:", error);
    // }
  };

  const handleDeleteModule = async (modulecode) => {
    navigate(`/DeleteModule/${modulecode}`);
    // e.preventDefault();
    // try {
    //   console.log("handling delete module");
    //   console.log(moduleData);
    //   await refreshAccessToken();

    //   await axios.post(
    //       `http://localhost:3500/modules/delete/${modulecode}`,
    //       moduleData,
    //       {
    //         headers: {
    //           Authorization: `Bearer ${Cookies.get("accessToken")}`,
    //         },
    //       }
    //   )

    //   navigate("/MyModulePage");
    // } catch (error) {
    //   console.error("Error editing module:", error);
    // }
  };

  const getData = async () =>{
    setIsLoading(true);
    const response = await axios.get(
      `http://localhost:3500/batch/${selectedModuleCode}`
    );
    setBatches(response.data);
    console.log("batches", response.data);
    //console.log(selectedModuleCode);
    setIsLoading(false);
  }

  //console.log(selectedModuleCode);

  // useEffect(() => {
  //   const fetchBatches = async () => {
  //     try {
  //       const accessToken = Cookies.get("accessToken");
  //       if (!accessToken) {
  //         console.error("Access token not available");
  //       }

  //       const config = {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       };

  //       const response = await axios.get(
  //         `http://localhost:3500/batch/${selectedModuleCode}`,
  //         config
  //       );
  //       setBatches(response.data);
  //       console.log("batches", response.data);
  //       //console.log(selectedModuleCode);
  //       setIsLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching batches:", error);
  //       setIsLoading(false);
  //     }
  //   };

  //   if (selectedModuleCode) {
  //     fetchBatches();
  //   }
  // }, [selectedModuleCode]);

  useEffect(() => {
    async function fetchData() {
      try {
        await getData();
        
      } catch (error) {
        if(error.response && error.response.status === 401){
          const newAccessToken = await refreshAccessToken();
          console.log("New access token: ", newAccessToken);

          if(newAccessToken){
            try {
              // await refreshAccessToken();
              await getData();
            } catch (error) {
              console.error("Error fetching data:", error);
            }
          }
        }
        else{
          console.error("Error fetching data:", error);
        }
      }
    }

    fetchData();
  }, []);

  const handleNewBatch = (event) => {};

  const handleSelectedBatch = (batch) => {
    setBatches(batch);
  };

  const getModuleData = async () => {
    setLoading(true);
    const moduleResponse = await axios.get(
      "http://localhost:3500/modules"
    );

    const module = moduleResponse.data.find(
      (module) => module.modulecode === selectedModuleCode
    );
    setModuleData(module); // Set the module data
    setLoading(false);
  }

  useEffect(() => {
    const fetchModuleData = async () => {
      try {
        await getModuleData();

        
      } catch (error) {
        if(error.response && error.response.status === 401){
          const newAccessToken = await refreshAccessToken();
          console.log("New access token: ", newAccessToken);

          if(newAccessToken){
            try {
              // await refreshAccessToken();
              await getModuleData();
            } catch (error) {
              console.error("Error fetching data:", error);
            }
          }
        }
        else{
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchModuleData();
  }, [selectedModuleCode]);

  return (
    <div className="align1">
     
      <MainRightPane>
        <Button id = "back-button"
        
          startIcon={<ArrowBackIcon />}
          onClick={() => window.history.back()}
        >
          Back
        </Button>
        {/* Check if moduleData is available before rendering */}
        <h1 id="heading">
          {moduleData ? (
            <>
              {moduleData.modulecode} - {moduleData.modulename}
            </>
          ) : (
            "Loading..."
          )}
        </h1>
        <div style={{display: "flex", flexDirection:"row", justifyContent:"space-evenly", marginTop:"3vh"}}>
          <Link to={`/NewBatchPage/${selectedModuleCode}`}>
            <CustomNewButton text="New Batch" />
          </Link>

          
        </div>

        <div className="column">
          {isLoading ? (
            <div style={{display:"flex", justifyContent: "center"}}><CircularProgress/></div>
          ) : batches.length === 0 ? (
            <Typography>No batches available.</Typography>
          ) : (
            batches.map((batch) => (
              // <Link
              //   to={`/Assignments/${selectedModuleCode}/${batch.batch}`}
              //   key={batch.batchId}
              //   style={{ textDecoration: "none", color: "inherit" }}
              // >
                <Button
                  variant="contained"
                  className="batch-button"
                  style={{ position: "relative", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}
                  onClick={() => {
                    navigate(`/Assignments/${selectedModuleCode}/${batch.batch}`)
                  }}
                >
                  <span>{batch.batch}</span>
                  <div className="icon-container" style={{ position: "absolute", right: "10px", display: "flex", gap: "8px" }}>
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      onClick={(event) => {
                        event.stopPropagation(); // Stop the click event from propagating
                        navigate(`/EditBatch/${selectedModuleCode}/${batch.batch}`);
                      }}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={(event) => {
                        event.stopPropagation();
                        navigate(`/DeleteBatch/${selectedModuleCode}/${batch.batch}`);
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </div>
                </Button>
              // </Link>



            ))
          )}
        </div>

        <div className="buttonContainer">
          
        </div>
      </MainRightPane>
    </div>
  );
};

export default BatchesPage;
