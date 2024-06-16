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
  const [firstName, setFirstName] = useState("ABC");
  const [lastName, setLastName] = useState("Perera");
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

      const allGrades = [];
      for (const assignment of allAssignments) {
        const { moduleCode, batch, assignmentId } = assignment;

        try {
          await refreshAccessToken();

          const response = await axios.get(
            `http://localhost:3500/answerscript/batch/${batch}/modulecode/${moduleCode}/assignmentid/${assignmentId}/studentid/${studentid}`,
            {
              headers: {
                Authorization: `Bearer ${Cookies.get("accessToken")}`,
              },
            }
          );

          console.log("Details of the answer scripts:", response.data);
          console.log(typeof response.data);

          allGrades.push(response.data);
        } catch (error) {
          console.error("Error displaying answer scripts:", error);
        }
      }
      setMarked(allGrades);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        console.log("Fetching data");
        // await refreshAccessToken();
        console.log("after refresh");
        const userResponse = await axios.get("http://localhost:3500/user");
        const user = userResponse.data;

        setFirstName(user.firstname);
        console.log("First name:", user.firstname); // Log the first name here
        if (user.profilepic) {
          setImageSRC(user.profilepic);
        }
        setLastName(user.lastname);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchProfileData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // await refreshAccessToken();
        await getData();
      } catch (error) {
        if (error.response && error.response.status === 401) {
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

    fetchData();
  }, []);

  // const handleDeleteAssignment = async (assignment) => {
  //   console.log("handling delete assignment");
  //   // e.preventDefault();
  //   try {
  //     console.log("handling delete assignment");
  //     // console.log(moduleData);
  //     // await refreshAccessToken();

  //     // const moduleData = {
  //     //   id : selectedRecentModule.assignmentId,
  //     //   modulecode : selectedRecentModule.moduleCode,
  //     //   batch : selectedRecentModule.batch
  //     // }

  //     await axios.delete(
  //         `http://localhost:3500/assignment/${assignment.moduleCode}/${assignment.batch}/${assignment.assignmentId}`,
  //         // moduleData,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${Cookies.get("accessToken")}`,
  //           },
  //         }
  //     );

  //     setAssignments(assignments.filter((a) => a.assignmentId != assignment.assignmentId));

  //     console.log("Deleted Assignment");

  //     // navigate("/MyModulePage");
  //   } catch (error) {
  //     console.error("Error editing module:", error);
  //   }
  // };

  const targetProgress = (2 / 3) * 100;
  useEffect(() => {
    const increment = targetProgress / 100;
    const interval = 5;

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

  function CircularProgressWithLabel(props) {
    return (
      <Box sx={{ position: "relative", display: "inline-flex" }}>
        <CircularProgress variant="determinate" {...props} />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="caption" component="div" color="white">
            {`${Math.round(props.value)}%`}
          </Typography>
        </Box>
      </Box>
    );
  }

  CircularProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate variant.
     * Value between 0 and 100.
     * @default 0
     */
    value: PropTypes.number.isRequired,
  };

  var day = new Date();
  var hr = day.getHours();

  const newLocal = "space";

  // Create a custom-styled DateCalendar component
  const CustomDateCalendar = styled(DateCalendar)({
    margin: 0,
    // Override any other margins explicitly
    "&.MuiDateCalendar-root": {
      margin: 0,
    },
    "&.css-1rtg91x-MuiDateCalendar-root": {
      margin: 0,
    },
  });

  return (
    <div className="align1">
      {/* <MainLeftPane/> */}

      <MainRightPane>
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
        <div id="dashboard">
          <h3 id="heading-dashboard">Dashboard</h3>

          <div style={{ width: "100%" }}>
            <div
              id="summary-and-calendar-raw"
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                // backgroundColor: "#FFF0CE",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  // marginLeft: "5vh",
                }}
              >
                <div id="hi-container">
                  <Avatar sx={{ width: 55, height: 55 }}>
                    <img
                      src={imageSRC}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "50%",
                      }}
                    />
                  </Avatar>
                  <div id="hi-paragraphs">
                    <p id="name-hi">
                      Hi, {firstName} {lastName}
                    </p>
                    <p id="good-time">
                      {"Good " +
                        (hr < 12
                          ? "Morning"
                          : hr < 18
                          ? "Afternoon"
                          : "Evening")}
                    </p>
                  </div>
                </div>

                <div id="summary-graph">
                  <Box
                    display="flex"
                    // marginLeft="1vw"
                    // marginTop="1vh"
                    // paddingTop="3vh"
                  >
                    <CircularProgressWithLabel
                      value={progress}
                      sx={{ marginLeft: "auto", marginRight: "auto" }}
                    />
                  </Box>
                  <div>
                    <p>You have 60% to be marked</p>
                    <p
                      style={{
                        marginBottom: "1vh",
                        marginTop: "-3vh",
                        fontSize: "1.5rem",
                      }}
                    >
                      5
                    </p>
                    <p style={{ marginBottom: "1vh", marginTop: "-2vh" }}>5</p>
                  </div>
                </div>

                <div id="dashboard-details">
                  {/* <p id="summary-detail">Summary Report</p> */}
                  <p>Modules : {moduleData.length}</p>
                  <p>Assignments : {assignments.length}</p>
                </div>
              </div>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <CustomDateCalendar
                  value={value}
                  onChange={(newValue) => setValue(newValue)}
                  sx={
                    {
                      // Your existing custom styles can be added here if needed
                      // "& .MuiPickersDay-root": {
                      //   color: "white",
                      // },
                      // "& .MuiPickersDay-root.Mui-selected": {
                      //   backgroundColor: "white",
                      //   color: "black",
                      // },
                      // "& .MuiPickersDay-root:hover": {
                      //   backgroundColor: "rgba(255, 255, 255, 0.1)",
                      // },
                      // "& .MuiPickersCalendarHeader-root": {
                      //   color: "white",
                      // },
                      // "& .MuiPickersCalendarHeader-switchViewButton": {
                      //   color: "white",
                      // },
                      // "& .MuiPickersCalendarHeader-label": {
                      //   color: "white",
                      // },
                      // "& .MuiPickersCalendarHeader-iconButton": {
                      //   color: "white",
                      // },
                      // "& .MuiPickersYear-root": {
                      //   color: "white",
                      // },
                      // "& .MuiPickersMonth-root": {
                      //   color: "white",
                      // },
                    }
                  }
                />
              </LocalizationProvider>
            </div>
            <div id="recent-assignments">
              <div id="recent-assignment-title-and-button-raw">
                <p>Recent Assignments</p>
                <Link
                  to={"/NewAssignment"}
                  style={{
                    textDecoration: "none",
                    marginRight: "5vw",
                    marginTop: "2vh",
                  }}
                >
                  <CustomNewButton text="New Assignment" />
                </Link>
              </div>

              <div
                id="dashbord-recent-assignment-table"
                style={
                  {
                    // width: "90%",
                    // display: "flex",
                    // alignItems: "center",
                    // justifyContent: "center",
                  }
                }
              >
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
                          // secondaryTypographyProps={{ style: {  } }}
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
              </div>
            </div>
          </div>
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
          </Button>
          <h1 id="heading">Recents</h1>
          <div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-end",
                justifyContent: "right",
              }}
            >
              <div style={{ width: "10vw" }}></div>
              <Link
                to={`/NewAssignment/${null}/${null}`}
                style={{ textDecoration: "none" }}
              >
                <CustomNewButton text="New Assignment" />
              </Link>
            </div>
            <div className="columnModules" style={{ width: "80%" }}>
              {loading ? (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <CircularProgress />
                </div>
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
                          // secondaryTypographyProps={{ style: {  } }}
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
          </div> */}
        </div>
      </MainRightPane>
    </div>
  );
};

export default RecentPage;
