import React, { useState, useEffect } from "react";
import MainLeftPane from "../components/MainLeftPane/MainLeftPane";
import MainRightPane from "../components/MainRightPane/MainRightPane";
import { Button, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CustomNewButton from "../components/Buttons/CustomNewButton";

import { Link, useParams } from "react-router-dom";
import refreshAccessToken from "../services/AuthService";
import axios from "axios";
import Cookies from "js-cookie";

import "../styles/BatchesPage.css";

const BatchesPage = () => {
  const { selectedModuleCode } = useParams();
  const [batches, setBatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
        await refreshAccessToken();
        const response = await axios.get(
          `http://localhost:3500/batch/${selectedModuleCode}`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("accessToken")}`,
            },
          }
        );
        setBatches(response.data);
        console.log("batches", response.data);
        //console.log(selectedModuleCode);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching module data:", error);
      }
    }

    fetchData();
  }, []);

  const handleNewBatch = (event) => {};

  const handleSelectedBatch = (batch) => {
    setBatches(batch);
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
        <div>
          <Link to={`/NewBatchPage/${selectedModuleCode}`}>
            <CustomNewButton text="New Batch" />
          </Link>
          <Link to={`/EditModule/${selectedModuleCode}`}>
            <CustomNewButton text="Edit Module" />
          </Link>

          <CustomNewButton text="Delete Module" />
        </div>

        <div className="column">
          {isLoading ? (
            <Typography>Loading...</Typography>
          ) : batches.length === 0 ? (
            <Typography>No batches available.</Typography>
          ) : (
            batches.map((batch) => (
              <Link
                to={`/Assignments/${selectedModuleCode}/${batch.batch}`}
                key={batch.batchId}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Button
                  variant="contained"
                  style={{
                    margin: "10px",
                    backgroundColor: "#E3DDE8",
                    color: "black",
                    width: "60vh",
                    textTransform: "capitalize",
                    borderRadius: "2vh",
                    border: "0px solid #7894DB",
                  }}
                >
                  {batch.batch}
                </Button>
              </Link>
            ))
          )}
        </div>
      </MainRightPane>
    </div>
  );
};

export default BatchesPage;
