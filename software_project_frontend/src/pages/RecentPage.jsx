import React, { useState, useEffect } from "react";
import MainLeftPane from "../components/MainLeftPane/MainLeftPane";
import MainRightPane from "../components/MainRightPane/MainRightPane";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button } from "@mui/material";
import refreshAccessToken from "../services/AuthService";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import SearchAppBar from "../components/Other/SearchBar/SearchBar";
import { useParams } from "react-router-dom";
import "../styles/RecentPage.css";
import UserProfileBar from "../components/UserProfileBar/UserProfileBar";
import { DataGrid } from "@mui/x-data-grid";
import CustomNewButton from "../components/Buttons/CustomNewButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import CommentIcon from "@mui/icons-material/Comment";
import { Delete, Edit } from "@mui/icons-material";
import Avatar from "@mui/material/Avatar";
import CustomNewButton2 from "../components/Buttons/CustomNewButton2/CustomNewButton2";
import PropTypes from "prop-types";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import image from "../images/image.png";

const headers = ["Assignment", "Batch", "Date Created"];

const RecentPage = () => {
  const [selectedRecentModule, setSelectedRecentModule] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [moduleData, setModuleData] = useState([]);
  const [batchData, setBatchData] = useState([]);
  const [profileData, setProfileData] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [value, setValue] = React.useState(dayjs());
  const [progress, setProgress] = React.useState(10);
  const [loading, setLoading] = useState(false);
  const [imageSRC, setImageSRC] = useState(image);
  const [marked, setMarked] = useState("");

  const navigate = useNavigate();

  const columns = [
    { field: "assignment", headerName: "Assignment", width: 150 },
    { field: "batch", headerName: "Batch", width: 300 },
    { field: "dateCreated", headerName: "Date Created", width: 150 },
  ];
  const getData = async () => {
    setLoading(true);
    console.log("No need to refresh");

    try {
      const modulesResponse = await axios.get("http://localhost:3500/modules");
      const modules = modulesResponse.data;
      const formattedModules = modules.map((module) => ({
        moduleCode: module.modulecode,
        moduleName: module.modulename,
        moduleCredits: module.credits,
      }));
      setModuleData(formattedModules);

      console.log("Module Data", formattedModules);

      const allBatches = [];
      for (const module of modules) {
        const batchResponse = await axios.get(
          `http://localhost:3500/batch/${module.modulecode}`
        );
        const batches = batchResponse.data.map((batch) => ({
          moduleCode: module.modulecode,
          batch: batch.batch,
          moduleName: module.modulename,
        }));
        allBatches.push(...batches);
      }
      setBatchData(allBatches);

      console.log("Batch Data", allBatches);

      const allAssignments = [];
      for (const batch of allBatches) {
        const assignmentResponse = await axios.get(
          `http://localhost:3500/assignment/${batch.moduleCode}/${batch.batch}`
        );
        const assignmentsData = assignmentResponse.data;

        if (
          typeof assignmentsData === "object" &&
          assignmentsData !== null &&
          Array.isArray(assignmentsData.rows)
        ) {
          const formattedAssignments = assignmentsData.rows.map(
            (assignment) => ({
              assignment: assignment.assignmenttitle,
              moduleName: batch.moduleName,
              moduleCode: batch.moduleCode,
              batch: batch.batch,
              assignmentId: assignment.assignmentid,
              dateCreated: new Date(
                assignment.assignmentdate
              ).toLocaleDateString(),
            })
          );

          allAssignments.push(...formattedAssignments);
        } else {
          console.error("Invalid assignmentsData:", assignmentsData);
        }
      }
      setAssignments(allAssignments);
      console.log("Assignments Data", allAssignments);

    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getProfileData = async () => {
    setLoading(true);
    const userResponse = await axios.get("http://localhost:3500/user");
    const user = userResponse.data;

    setFirstName(user.firstName);
    setLastName(user.lastName);
    console.log(user);

    if (user.profilepic) {
      setImageSRC(user.profilepic);
    }
    setLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
    
        await getData();
        await getProfileData();
      } catch (error) {
        if (error.response && error.response.status === 401) {
          const newAccessToken = await refreshAccessToken();
          console.log("New access token: ", newAccessToken);

          if (newAccessToken) {
            try {
           
              await getData();
              await getProfileData();
            } catch (error) {
              console.error("Error fetching data:", error);
            }
          }
        } else {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, []);


  const targetProgress = (2 / 3) * 100;
  useEffect(() => {
    const increment = targetProgress / 100;
    const interval = 50;

    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + increment;
        if (newProgress >= targetProgress) {
          clearInterval(timer);
          return targetProgress;
        }
        return newProgress;
      });
    }, interval);

    return () => {
      clearInterval(timer);
    };
  }, [targetProgress]);

  const handleSelection = (assignment) => {
    setSelectedRecentModule(assignment);
    navigate(
      `/AnswerScripts/batch/${assignment.batch}/modulecode/${assignment.moduleCode}/assignmentid/${assignment.assignmentId}`
    );
  };

  const handleEditAssignment = (assignment) => {
    navigate(
      `/EditAssignment/${assignment.moduleCode}/${assignment.assignment}/${assignment.batch}/${assignment.assignmentId}`
    );
  };

  const handleDeleteAssignment = (assignment) => {
    navigate(
      `/DeleteAssignment/${assignment.moduleCode}/${assignment.batch}/${assignment.assignmentId}`
    );
  };

  const newLocal = "space";

  return (
    <div className="align1">

      <MainRightPane>
       
        <h3 id="heading">Dashboard</h3>
        <div id="dashboard">
          <div style={{ width: "100%" }}>
            <Link to={"/NewAssignment"} id="add-new-assignment-button">
           
              <CustomNewButton2 text="New Assignment" />
            </Link>

            <div id="recent-assignments">
              <div
                id="dashbord-recent-assignment-table"
                style={
                  {
                    
                  }
                }
              >
                {loading ? (
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <CircularProgress />
                  </div>
                ) : assignments.length === 0 ? (
                  <h5>No assignments created</h5>
                ) : (
                  <List
                    sx={{
                      width: "100%",
                      bgcolor: "background.paper",
                      overflow: "auto",
                      height: "80%",
                    }}
                  >
                    {assignments.map((assignment, index) => (
                      <ListItem
                        key={assignment.assignmentId}
                        secondaryAction={
                          <div>
                            <IconButton
                              edge="end"
                              aria-label="edit"
                              onClick={() => handleEditAssignment(assignment)}
                            >
                              <Edit />
                            </IconButton>
                            <IconButton
                              edge="end"
                              aria-label="delete"
                              onClick={() => handleDeleteAssignment(assignment)}
                            >
                              <Delete />
                            </IconButton>
                          </div>
                        }
                        disablePadding
                      >
                        <ListItemButton
                          onClick={() => handleSelection(assignment)}
                        >
                          <ListItemText
                            primaryTypographyProps={{
                              style: { fontSize: "2vh" },
                            }}
                    
                            primary={`${assignment.assignment} - ${assignment.moduleCode}`}
                            secondary={
                              <span>
                                {assignment.batch} - {assignment.dateCreated}
                              </span>
                            }
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
            </div>
          </div>
        
        </div>
      </MainRightPane>
    </div>
  );
};

export default RecentPage;
