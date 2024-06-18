import React, { useState, useEffect } from "react";
import { Button, CircularProgress } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MainLeftPane from "../components/MainLeftPane/MainLeftPane";
import MainRightPane from "../components/MainRightPane/MainRightPane";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import refreshAccessToken from "../services/AuthService";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import { Delete, Edit } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import CustomNewButton2 from "../components/Buttons/CustomNewButton2/CustomNewButton2";

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
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const columns = [
    { field: "modulecode", headerName: "Module Code", width: 150 },
    { field: "modulename", headerName: "Module Name", width: 300 },
    { field: "credits", headerName: "Credits", width: 150 },
  ];

  const getData = async () => {
    console.log("Fetching modules data");
    setLoading(true);

    const response = await axios.get("http://localhost:3500/modules");
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

    setLoading(false);
  };

  useEffect(() => {
    const fetchModules = async (e) => {
      try {
        await getData();
      } catch (error) {
        if (error.message.includes("ERR_CONNECTION_REFUSED")) {
          enqueueSnackbar(
            "Failed to load resource: net::ERR_CONNECTION_REFUSED",
            { variant: "error" }
          );
        } else if (error.response && error.response.status === 401) {
          const newAccessToken = await refreshAccessToken();
          console.log("New access token: ", newAccessToken);

          if (newAccessToken) {
            try {
              // await refreshAccessToken();
              await getData();
            } catch (error) {
              console.error("Error fetching data:", error);
            }
          }
        } else {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchModules();
  }, [enqueueSnackbar]);

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

    navigate(`/EditModule/${modulecode}`);
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

  const handleEditAssignment = (assignment) => {
    // navigate(`/EditAssignment/${assignment.moduleCode}/${assignment.assignment}/${assignment.batch}/${assignment.assignmentId}`);
  };

  const handleDeleteAssignment = (assignment) => {
    // navigate(`/EditAssignment/${assignment.moduleCode}/${assignment.assignment}/${assignment.batch}/${assignment.assignmentId}`);
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

  const handleSelectedModule = (modulecode) => {
    console.log("Selected module code:", modulecode);
    setSelectedModule(modulecode);
    navigate(`/Batches/${modulecode}`);
  };
  // const handleSelection = (assignment) => {
  //   setSelectedRecentModule(assignment);
  //   navigate(`/AnswerScripts/batch/${assignment.batch}/modulecode/${assignment.moduleCode}/assignmentid/${assignment.assignmentId}`);
  // };
  // answerScripts
  //console.log("module code", selectedModule);

  return (
    <div className="align1">
      <MainRightPane>
        {/* <Button
        {/* <Button
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
        </Button> */}
        {/* <h3 id="heading-mymodules">My Modules</h3> */}
        <h3 id="heading">My Modules</h3>

        <div
          style={{
            // display: "flex",
            // flexDirection: "row",
            // alignItems: "center",
            // justifyContent: "space-evenly",
            // marginRight: "2vw",
            width: "100%",
          }}
        >
          {/* <Link to={`/Batches/${selectedModule}`}>
            <CustomNewButton text="View Module" />
          </Link> */}

          <Link to="/NewModule" id="add-new-module-button">
            {/* <CustomNewButton text="New Module" onClick={handleNewModule} /> */}
            <CustomNewButton2 text="New Module" onClick={handleNewModule} />
          </Link>

          {/* <Link to={`/EditModule/${selectedModule}`}>
            <CustomNewButton onClick = {handleEditModule} text="Edit Module" />
          </Link> */}

          {/* <Link to={`/DeleteModule/${selectedModule}`}>
            <CustomNewButton onClick = {handleDeleteModule} text="Delete Module" />
          </Link> */}
        </div>
        <div
          className="columnModules"
          // style={{
          //   width: "80%",
          //   display: "flex",
          //   justifyContent: "center",
          //   alignItems: "center",
          // }}
        >
          {loading ? (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </div>
          ) : tableDataModules.length === 0 ? (
            <h5>No modules created</h5>
          ) : (
            <List
              sx={{
                width: "100%",
                bgcolor: "background.paper",
                overflow: "auto",
                height: "80%",
              }}
            >
              {tableDataModules.map((module, index) => (
                <ListItem
                  key={module.modulecode}
                  secondaryAction={
                    <div>
                      <IconButton
                        edge="end"
                        aria-label="edit"
                        onClick={() => handleEditModule(module.modulecode)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleDeleteModule(module.modulecode)}
                      >
                        <Delete />
                      </IconButton>
                    </div>
                  }
                  disablePadding
                >
                  <ListItemButton
                    onClick={() => handleSelectedModule(module.modulecode)}
                  >
                    <ListItemText
                      primaryTypographyProps={{ style: { fontSize: "2vh" } }}
                      // secondaryTypographyProps={{ style: {  } }}
                      primary={`${module.modulecode} - ${module.modulename}`}
                      secondary={<span>Credits: {module.credits}</span>}
                      secondaryTypographyProps={{
                        component: "span",
                        style: { display: "inline", fontSize: "1.5vh" },
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          )}
        </div>
        {/* <div className="columnModules">
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
        </div> */}
      </MainRightPane>
    </div>
  );
};

export default MyModulesPage;
