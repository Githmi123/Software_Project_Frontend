import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MainLeftPane from "../components/MainLeftPane/MainLeftPane";
import MainRightPane from "../components/MainRightPane/MainRightPane";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import refreshAccessToken from '../services/AuthService';

import Cookies from "js-cookie";
import axios from "axios";

import "../styles/MyModulesPage.css";
import CustomNewButton from "../components/Buttons/CustomNewButton";

/*const table_data_modules = [
  { Module_Code: "EE5262", Module_Name: "Database Systems", Credits: 2 },
  { Module_Code: "EE5263", Module_Name: "Database Systems 2", Credits: 2 },
  { Module_Code: "EE5264", Module_Name: "Database Systems 3", Credits: 2 },
  { Module_Code: "EE5265", Module_Name: "Database Systems 4", Credits: 2 },
];*/

const headers = ["Module_Code", "Module_Name", "Credits"];

const MyModulesPage = () => {
  const [selectedModule, setSelectedModule] = useState(null);
  const [tableDataModules, setTableDataModules] = useState([]);

  useEffect(() => {
    const fetchModules = async (e) => {
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

        const response = await axios.get(
          "http://localhost:3500/modules",
          config
        );
        setTableDataModules(response.data);

        console.log(response.data);

        console.log("Checking for duplicate Module_Codes:");
        const moduleCodes = response.data.map(
          (moduledata) => moduledata.modulecode
        );

        console.log(moduleCodes);

        const uniqueModuleCodes = new Set(moduleCodes);
        if (moduleCodes.length !== uniqueModuleCodes.size) {
          console.error("Duplicate Module_Codes detected!");
        } else {
          console.log("No duplicate Module_Codes found.");
        }
      } catch (error) {
        console.error("Error fetching modules:", error);
      }
    };

    fetchModules();
  }, []);

  const handleNewModule = (event) => {};

  /* const handleSelectedModule = (moduleCode) => {
    setSelectedModule(moduleCode === selectedModule ? null : moduleCode);
  }; */
  /* const handleSelectedModule = (moduleCode) => {
    setSelectedModule(moduleCode);
  }; */
  const handleSelectedModule = (moduleCode) => {
    setSelectedModule((prevModule) =>
      prevModule === moduleCode ? null : moduleCode
    );
  };

  //console.log("module code", selectedModule);

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
        <h1 id="heading">My Modules</h1>
        <div>
          <Link to="/NewModule" style={{ textDecoration: "none" }}>
            <CustomNewButton text="New Module" onClick={handleNewModule} />
          </Link>
        </div>
        <div className="column">
          <table className="table">
            <thead className="tablehead">
              <tr>
                {headers.map((header) => (
                  <th key={header}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableDataModules.map((moduledata) => (
                <tr
                  className="table-data"
                  key={moduledata.modulecode}
                  style={{
                    backgroundColor:
                      moduledata.modulecode === selectedModule
                        ? "#7894DB"
                        : "#E3DDE8",
                    color:
                      moduledata.modulecode === selectedModule
                        ? "white"
                        : "black",
                    border: "7px solid white",
                    borderRadius: "10px",
                  }}
                  onClick={() => handleSelectedModule(moduledata.modulecode)}
                >
                  <td>
                    <Link
                      to={`/Batches/${moduledata.modulecode}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      {moduledata.modulecode}
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={`/Batches/${moduledata.modulecode}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      {moduledata.modulename}
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={`/Batches/${moduledata.modulecode}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      {moduledata.credits}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </MainRightPane>
    </div>
  );
};

export default MyModulesPage;
