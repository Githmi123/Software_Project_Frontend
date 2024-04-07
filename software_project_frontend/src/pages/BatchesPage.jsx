import React, { useState, useEffect } from "react";
import MainLeftPane from "../components/MainLeftPane/MainLeftPane";
import MainRightPane from "../components/MainRightPane/MainRightPane";
import { Button, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CustomNewButton from "../components/Buttons/CustomNewButton";

import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

import "../styles/BatchesPage.css";

//const batches = ["22th batch", "23rd batch", "24th batch", "25th batch"];

const BatchesPage = () => {
  const { selectedModuleCode } = useParams();
  const [batches, setBatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //console.log(selectedModuleCode);

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const accessToken = Cookies.get("accessToken");
        if (!accessToken) {
          console.error("Access token not available");
        }

        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };

        const response = await axios.get(
          `http://localhost:3500/batch/${selectedModuleCode}`,
          config
        );
        setBatches(response.data);
        console.log("batches", response.data);
        //console.log(selectedModuleCode);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching batches:", error);
        setIsLoading(false);
      }
    };

    if (selectedModuleCode) {
      fetchBatches();
    }
  }, [selectedModuleCode]);
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
        <h1 id="heading">Module</h1>
        <div>
          <Link to={`/NewBatchPage/${selectedModuleCode}`}>
            <CustomNewButton text="New Batch" onClick={handleNewBatch} />
          </Link>
        </div>

        <div className="column">
          {isLoading ? (
            <Typography>Loading...</Typography>
          ) : batches.length === 0 ? (
            <Typography>No batches available.</Typography>
          ) : (
            batches.map((batch) => (
              <Link
                to={`/Assignments/${batch.batchId}`}
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

        {/* <div id='module-table'>
                    <table>
                        <tr id='module-table-headers' sx={{fontWeight:'bolder'}}>
                        <th>Module Code</th>
                        <th>Module Name</th>
                        </tr>
                        {table_data_modules.map((val,key)=>{
                        return(
                            <tr key={key} style={{backgroundColor:'#E3DDE8', borderRadius:'30px', margin:'0 0 5px 0'}}>
                            <td>{val.Module_Code}</td>
                            <td>{val.Module_Name}</td>
                            </tr>
                        )
                        }
            
                        )
            
                        }
            
                    </table>
                    </div> */}
      </MainRightPane>
    </div>
  );
};

export default BatchesPage;
