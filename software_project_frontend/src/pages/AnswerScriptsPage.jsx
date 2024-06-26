import React, { useState, useEffect } from "react";
import MainLeftPane from "../components/MainLeftPane/MainLeftPane";
import MainRightPane from "../components/MainRightPane/MainRightPane";
import {
  Alert,
  Button,
  Checkbox,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import { CheckCircle, Delete } from "@mui/icons-material";
import { Edit } from "@mui/icons-material";
import { TrendingUp } from "@mui/icons-material";
import CustomNewButton from "../components/Buttons/CustomNewButton";
import { Link } from "react-router-dom";
import "../styles/AssignmentsPage.css";
import RemoveFileButton from "../components/Buttons/RemoveFileButton";
import GradingButton from "../components/Buttons/GradingButton";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { SnackbarProvider, useSnackbar } from "notistack";

import refreshAccessToken from "../services/AuthService";

import { useParams, useNavigate } from "react-router-dom";

import Cookies from "js-cookie";
import axios from "axios";

const AnswerScriptsPage = () => {
  const { selectedModuleCode, batch, assignmentid } = useParams();
  const [selectedAssignmentNos, setSelectedAssignmentNos] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [answerScripts, setAnswerScripts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [gradingSnackbarOpen, setGradingSnackbarOpen] = useState(false);
  const [uploadingSnackbarOpen, setUploadingSnackbarOpen] = useState(false);
  const [markingSnackbarOpen, setMarkingSnackbarOpen] = useState(false);
  const [failedGradingSnackbarOpen, setFailedGradingSnackbarOpen] =
    useState(false);
  const [noSelectionSnackbarOpen, setNoSelectionSnackbarOpen] = useState(false);
  const [selectedStudentIds, setSelectedStudentIds] = useState([]);
  const [noAnswerScripts, setNoAnswerScripts] = useState("");
  const [fileDetails, setFileDetails] = useState([]);

  const columns = [
    { field: "studentid", headerName: "Student ID", width: 90 },
    { field: "assignmentid", headerName: "Assignment ID", width: 150 },
    // { field: "marks", headerName: "Marks", width: 150 },
    {
      field: "marks",
      headerName: "Marks",
      width: 150,
      valueGetter: (params) => {
        // console.log("Params:", params);
        // console.log("Value:", params.value);

        if (params === -1) {
          return "Not Graded";
        }
        return params;
      },
    },
    { field: "batch", headerName: "Batch", width: 150 },
    { field: "modulecode", headerName: "Module Code", width: 150 },
    { field: "fileid", headerName: "File ID", width: 150 },
  ];

  const customLocaleText = {
    ...DataGrid.defaultProps?.localeText, // Use optional chaining to prevent errors
    selectionCount: (count) =>
      `${count} ${count === 1 ? "answer script" : "answer scripts"} selected`,
  };

  // console.log("DataGrid: ", DataGrid);
  // console.log("DataGrid defaultProps: ", DataGrid.defaultProps);

  const handleClick = () => {
    enqueueSnackbar("I love snacks.");
  };

  const { enqueueSnackbar } = useSnackbar();

  const handleCloseGradingSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setGradingSnackbarOpen(false);
  };

  const handleCloseFailedGradingSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setFailedGradingSnackbarOpen(false);
  };

  const handleCloseUploadingSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setUploadingSnackbarOpen(false);
  };

  const handleCloseMarkingSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setMarkingSnackbarOpen(false);
  };

  const handleNoSelectionSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setNoSelectionSnackbarOpen(false);
  };

  console.log("the required data  : ", selectedModuleCode, batch, assignmentid);

  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    console.log("fetching answer scripts");

    const response = await axios.get(
      `http://localhost:3500/answerscript/batch/${batch}/modulecode/${selectedModuleCode}/assignmentid/${assignmentid}`
    );
    console.log("after fetching");
    const answerScriptsData = response.data.rows;
    // console.log("no or added rows:", response.data.rowCount);
    setNoAnswerScripts(response.data.rowCount);

    console.log(response.data);
    if (answerScriptsData) {
      console.log("no answer scripts uploaded");
      setAnswerScripts(answerScriptsData);
    }
    setLoading(false);
  };
  const fetchAnswerscripts = async () => {
    try {
      await fetchData();
    } catch (error) {
      if (error.response && error.response.status === 401) {
        const newAccessToken = await refreshAccessToken();
        console.log("New access token: ", newAccessToken);

        if (newAccessToken) {
          try {
            await fetchData();
          } catch (error) {
            setLoading(false);
            console.error("Error fetching data:", error);

            enqueueSnackbar("Connection Error!", { variant: "error" });
          }
        }
      } else {
        console.error("Error fetching data:", error);
        setLoading(false);
        enqueueSnackbar("Connection Error!", { variant: "error" });
      }
    }
  };

  useEffect(() => {
    fetchAnswerscripts();
  }, []);

  const upload = async () => {
    setLoading(true);
    const formData = new FormData();
    selectedFiles.forEach((file) => formData.append("scripts", file));
    console.log("Form Data: ", formData);
    const response = await axios.post(
      `http://localhost:3500/answerscript/batch/${batch}/modulecode/${selectedModuleCode}/assignmentid/${assignmentid}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("Uploaded Answer Scripts:", response.data);
    fetchAnswerscripts();
    setLoading(false);
  };

  useEffect(() => {
    const uploadNewAnswerscripts = async () => {
      try {
        await upload();
        enqueueSnackbar(
          `${noAnswerScripts} answer scripts uploaded successfully!`,
          {
            variant: "success",
          }
        );
      } catch (error) {
        if (error.response && error.response.status === 401) {
          const newAccessToken = await refreshAccessToken();
          console.log("New access token: ", newAccessToken);

          if (newAccessToken) {
            try {
              await upload();
              enqueueSnackbar("Answer script uploaded successfully!", {
                variant: "success",
              });
            } catch (error) {
              setLoading(false);
              console.error("Error fetching data:", error);
              enqueueSnackbar("Failed to upload answer script!", {
                variant: "error",
              });
            }
          }
        } else {
          setLoading(false);
          console.error("Error fetching data:", error);
          enqueueSnackbar("Failed to upload answer script!", {
            variant: "error",
          });
        }
      }
    };

    if (selectedFiles.length > 0 && assignmentid) {
      uploadNewAnswerscripts();
    }
  }, [selectedFiles, selectedModuleCode, batch, assignmentid]);

  // const handleNewAnswerScript = (event) => {
  //   const files = Array.from(event.target.files);
  //   setSelectedFiles(files);
  // };

  const handleNewAnswerScript = (event) => {
    const files = Array.from(event.target.files);
    const newFileDetails = files
      .map((file) => {
        const fileNameParts = file.name.split("-");

        if (fileNameParts.length < 2) {
          console.error(`Invalid filename format: ${file.name}`);
          return null;
        }

        const id = fileNameParts[0]?.trim();

        const lastNameWithExtension = fileNameParts[1]?.trim();
        const lastName = lastNameWithExtension.slice(
          0,
          lastNameWithExtension.lastIndexOf(".")
        );
        const [firstname, lastname] = lastName.split(" ") ?? ["", ""];

        console.log("id:", id, "firstname:", firstname, "lastname:", lastname);

        return {
          id,
          firstname,
          lastname,
          fileObject: file,
        };
      })
      .filter(Boolean); // Filter out null values from map

    setSelectedFiles(files);
    setFileDetails(newFileDetails);
  };

  const handleSelectionModelChange = (newSelectionModel) => {
    const selectedStudentIds = newSelectionModel
      .map((id) => {
        const script = answerScripts.find((script) => script.fileid === id);
        return script ? script.studentid : null;
      })
      .filter((studentid) => studentid !== null);

    setSelectedStudentIds(selectedStudentIds);
    setSelectedAssignmentNos(newSelectionModel);
  };

  const handleToggleAssignmentNo = (scriptId) => {
    setSelectedAssignmentNos((prevSelectedAssignmentNos) => {
      if (prevSelectedAssignmentNos.includes(scriptId)) {
        return prevSelectedAssignmentNos.filter((id) => id !== scriptId);
      } else {
        return [...prevSelectedAssignmentNos, scriptId];
      }
    });
  };

  const handleToggleAllScripts = () => {
    if (selectedAssignmentNos.length === answerScripts.length) {
      setSelectedAssignmentNos([]);
    } else {
      const allScriptIds = answerScripts.map((script) => script.id);
      setSelectedAssignmentNos(allScriptIds);
    }
  };

  const grade = async () => {
    setLoading(true);
    enqueueSnackbar(
      "Grading is starting. This may take a few minutes. Please wait!",
      { variant: "info" }
    );
    const response = await axios.post(
      `http://localhost:3500/answerscript/batch/${batch}/modulecode/${selectedModuleCode}/assignmentid/${assignmentid}/grade`,
      {}
    );

    console.log("Got Response");
    setLoading(false);
    console.log("Graded all answer scripts", response.data);

    enqueueSnackbar("Grading completed successfully!", { variant: "success" });
  };
  const handleGradeAllFiles = async () => {
    console.log("Started Grading");
    try {
      await grade();
    } catch (error) {
      if (error.response && error.response.status === 401) {
        const newAccessToken = await refreshAccessToken();
        console.log("New access token: ", newAccessToken);

        if (newAccessToken) {
          try {
            await grade();
          } catch (error) {
            setLoading(false);
            console.error("Error fetching data:", error);
            enqueueSnackbar("Error: Grading failed!", { variant: "error" });
          }
        }
      } else {
        setLoading(false);
        console.error("Error fetching data:", error);

        enqueueSnackbar("Error: Grading failed!", { variant: "error" });
      }
    }
  };

  const gradeSelected = async () => {
    setLoading(true);
    enqueueSnackbar(
      "Answer scripts are being graded. This may take a few minutes. Please wait!",
      { variant: "info" }
    );
    console.log("Assignment Nos:", selectedStudentIds);
    const response = await axios.post(
      `http://localhost:3500/answerscript/batch/${batch}/modulecode/${selectedModuleCode}/assignmentid/${assignmentid}/gradeseleted`,
      { fileids: selectedAssignmentNos }
    );

    console.log("Graded selected answer scripts", response.data);
    setLoading(false);
    enqueueSnackbar("Grading completed successfully!", { variant: "success" });
    window.location.reload();
    enqueueSnackbar("Grading completed successfully!", { variant: "success" });
  };

  const handleGradeSelectedFiles = async () => {
    console.log("Started Grading Selected Files");
    if (selectedStudentIds.length === 0) {
      enqueueSnackbar("Please select files to grade!", { variant: "error" });
    } else {
      try {
        await gradeSelected();
      } catch (error) {
        if (error.response && error.response.status === 401) {
          const newAccessToken = await refreshAccessToken();
          console.log("New access token: ", newAccessToken);

          if (newAccessToken) {
            try {
              await grade();
            } catch (error) {
              setLoading(false);
              console.error("Error fetching data:", error);
              enqueueSnackbar("Error: Grading failed!", { variant: "error" });
            }
          }
        } else {
          setLoading(false);
          console.error("Error fetching data:", error);

          enqueueSnackbar("Error: Grading failed!", { variant: "error" });
        }
      }
    }
  };

  const handleGradeManually = (event) => {};

  const handleVisualizeAGraph = (event) => {};

  const handleRemove = (scriptId) => {
    setSelectedFiles((prevSelectedFiles) =>
      prevSelectedFiles.filter((file) => file.id !== scriptId)
    );
  };

  const deleteFiles = async () => {
    setLoading(true);
    console.log("These are selected", selectedAssignmentNos);

    if (selectedAssignmentNos.length > 1) {
      const response = await axios.delete(
        `http://localhost:3500/answerscript/batch/${batch}/modulecode/${selectedModuleCode}/assignmentid/${assignmentid}/fileid`,
        { data: { fileids: selectedAssignmentNos } }
      );
      console.log("These are sent", selectedFiles);
      console.log("These are selected", selectedAssignmentNos);

      console.log("Deleted selected answer scripts", response.data);

      window.location.reload();
      enqueueSnackbar("Answer Script deleted successfully", {
        variant: "success",
      });

      setLoading(false);
    } else {
      const response = await axios.delete(
        `http://localhost:3500/answerscript/batch/${batch}/modulecode/${selectedModuleCode}/assignmentid/${assignmentid}/fileid/${selectedAssignmentNos}`
      );
      console.log("These are sent", selectedFiles);
      console.log("These are selected", selectedAssignmentNos);

      console.log("Deleted selected answer scripts", response.data);
      enqueueSnackbar("Answer Script deleted successfully", {
        variant: "success",
      });
      window.location.reload();

      setLoading(false);
    }
  };

  const handleDeleteFiles = async () => {
    console.log("Started Deleting Selected Files");
    console.log(selectedFiles);
    if (selectedAssignmentNos.length === 0) {
      enqueueSnackbar("Please select files to delete!", { variant: "error" });
    } else {
      try {
        await deleteFiles();
      } catch (error) {
        if (error.response && error.response.status === 401) {
          const newAccessToken = await refreshAccessToken();
          console.log("New access token: ", newAccessToken);

          if (newAccessToken) {
            try {
              await deleteFiles();
            } catch (error) {
              setLoading(false);
              console.error("Error fetching data:", error);
              enqueueSnackbar("Failed to delete answer scripts!", {
                variant: "error",
              });
            }
          }
        } else {
          setLoading(false);
          console.error("Error fetching data:", error);
          enqueueSnackbar("Failed to delete answer scripts!", {
            variant: "error",
          });
        }
      }
    }
  };

  const handleRowClick = (params) => {
    const studentid = params.row.studentid;
    console.log("Row clicked for student ID:", studentid);

    navigate(
      `/ManualGradingPage/batch/${batch}/modulecode/${selectedModuleCode}/assignmentid/${assignmentid}/studentid/${studentid}`
    );
  };

  return (
    <div className="align1">
      <MainRightPane>
        <Button
          id="back-button"
          startIcon={<ArrowBackIcon />}
          onClick={() => window.history.back()}
        >
          Back
        </Button>
        <h1 id="heading">Uploaded Answer Scripts</h1>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginLeft: "5vw",
            marginRight: "5vw",
            marginTop: "2vh",
          }}
        >
          <CustomNewButton text="Upload" onFileSelect={handleNewAnswerScript} />

          <GradingButton
            text="Grade"
            onClick={handleGradeSelectedFiles}
            icon={CheckCircle}
          />
          <Link
            to={`/DataVisualization/batch/${batch}/modulecode/${selectedModuleCode}/assignmentid/${assignmentid}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <GradingButton text="Visualize" icon={TrendingUp} />
          </Link>
          <GradingButton
            text="Delete"
            onClick={handleDeleteFiles}
            icon={Delete}
          />
        </div>

        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "8vh",
            }}
          >
            <CircularProgress />
          </div>
        ) : (
          <div className="columnAnswerScripts">
            <Box sx={{ height: "100%", width: "100%" }}>
              <DataGrid
                rows={answerScripts}
                columns={columns}
                getRowId={(row) => row.fileid}
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
                // localeText={customLocaleText}
                localeText={customLocaleText}
                onRowClick={handleRowClick}
                onRowSelectionModelChange={(newSelection) => {
                  setSelectedAssignmentNos(newSelection);
                  handleSelectionModelChange(newSelection);
                }}
                onSelectionModelChange={handleSelectionModelChange}
              />
            </Box>
          </div>
        )}

        <div
          style={{
            marginTop: "1vh",
            display: "flex",
            justifyContent: "center",
            position: "relative",
          }}
        ></div>

        <Snackbar
          open={gradingSnackbarOpen}
          autoHideDuration={6000}
          onClose={handleCloseGradingSnackbar}
        >
          <Alert
            onClose={handleCloseGradingSnackbar}
            severity="success"
            variant="filled"
            sx={{ width: "100%" }}
          >
            Grading completed successfully!
          </Alert>
        </Snackbar>

        <Snackbar
          open={uploadingSnackbarOpen}
          autoHideDuration={6000}
          onClose={handleCloseUploadingSnackbar}
        >
          <Alert
            onClose={handleCloseUploadingSnackbar}
            severity="success"
            variant="filled"
            sx={{ width: "100%" }}
          >
            Answer script uploaded successfully!
          </Alert>
        </Snackbar>

        <Snackbar
          open={markingSnackbarOpen}
          autoHideDuration={6000}
          onClose={handleCloseMarkingSnackbar}
        >
          <Alert
            onClose={handleCloseMarkingSnackbar}
            severity="info"
            variant="filled"
            sx={{ width: "100%" }}
          >
            Answer scripts are being graded. This may take a few minutes. Please
            wait!
          </Alert>
        </Snackbar>

        <Snackbar
          open={failedGradingSnackbarOpen}
          autoHideDuration={6000}
          onClose={handleCloseFailedGradingSnackbar}
        >
          <Alert
            onClose={handleCloseFailedGradingSnackbar}
            severity="error"
            variant="filled"
            sx={{ width: "100%" }}
          >
            Error: Grading failed!
          </Alert>
        </Snackbar>

        <Snackbar
          open={noSelectionSnackbarOpen}
          autoHideDuration={6000}
          onClose={handleNoSelectionSnackbar}
        >
          <Alert
            onClose={handleNoSelectionSnackbar}
            severity="error"
            variant="filled"
            sx={{ width: "100%" }}
          >
            Please select files to delete!
          </Alert>
        </Snackbar>
      </MainRightPane>
    </div>
  );
};

export default AnswerScriptsPage;
