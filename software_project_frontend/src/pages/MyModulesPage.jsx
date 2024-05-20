import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MainLeftPane from "../components/MainLeftPane/MainLeftPane";
import MainRightPane from "../components/MainRightPane/MainRightPane";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import refreshAccessToken from '../services/AuthService';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

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
  const [moduleData, setModuleData] = useState({
    modulecode: "",
    modulename: "",
    credits: "",
  });

  const navigate = useNavigate();

  const columns = [
    { field: 'modulecode', headerName: 'Module Code', width: 150 },
    { field: 'modulename', headerName: 'Module Name', width: 150 },
    { field: 'credits', headerName: 'Credits', width: 150 },
  ];

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
        console.log(response.data);
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

  const handleEditModule = async (e) => {
    e.preventDefault();
    try {
      console.log("handling edit module");
      console.log(moduleData);
      await refreshAccessToken();

      await axios.post(
          `http://localhost:3500/modules/edit/${selectedModule}`,
          moduleData,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("accessToken")}`,
            },
          }
      )

     
      navigate("/MyModulePage");
    } catch (error) {
      console.error("Error editing module:", error);
    }
  };


  const handleDeleteModule = async (e) => {
    e.preventDefault();
    try {
      console.log("handling delete module");
      console.log(moduleData);
      await refreshAccessToken();

      await axios.post(
          `http://localhost:3500/modules/delete/${selectedModule}`,
          moduleData,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("accessToken")}`,
            },
          }
      )

     
      navigate("/MyModulePage");
    } catch (error) {
      console.error("Error editing module:", error);
    }
  };

  const handleNewModule = (event) => {};

  /* const handleSelectedModule = (moduleCode) => {
    setSelectedModule(moduleCode === selectedModule ? null : moduleCode);
  }; */
  /* const handleSelectedModule = (moduleCode) => {
    setSelectedModule(moduleCode);
  }; */
  // const handleSelectedModule = (moduleCode) => {
  //   setSelectedModule((prevModule) =>
  //     prevModule === moduleCode ? null : moduleCode
  //   );
  // };

  const handleSelectedModule = (moduleCode) => {
    setSelectedModule(moduleCode);
  };
// answerScripts
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
          Back
        </Button>
        <h1 id="heading">My Modules</h1>
        
        <div style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent: "space-evenly", marginRight:"2vw"}}>
          <Link to={`/Batches/${selectedModule}`}>
            <CustomNewButton text="View Module" />
          </Link>
          
          <Link to="/NewModule" style={{ textDecoration: "none" }}>
            <CustomNewButton text="New Module" onClick={handleNewModule} />
          </Link>

          <Link to={`/EditModule/${selectedModule}`}>
            <CustomNewButton onClick = {handleEditModule} text="Edit Module" />
          </Link>

          <Link to={`/DeleteModule/${selectedModule}`}>
            <CustomNewButton onClick = {handleDeleteModule} text="Delete Module" />
          </Link>

        </div>
        <div className="columnModules">
          <Box sx={{ height: '100%', width: '100%', display:"flex", justifyContent:"center" }}>
            <DataGrid
              rows={tableDataModules}
              columns={columns}
              getRowId={(row) => row.modulecode}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5]}
              checkboxSelection
              disableRowSelectionOnClick
              onRowSelectionModelChange={(newSelection) => {
                newSelection.forEach((moduleCode) => {
                  handleSelectedModule(moduleCode);
                });
              }}
              // isRowSelectable={(params) => params.row.moduleCode !== selectedModule}
            />
          </Box>
        </div>
        
      </MainRightPane>
    </div>
  );
};

export default MyModulesPage;
