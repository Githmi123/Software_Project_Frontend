import React, { useState } from "react";
import MainLeftPane from "../components/MainLeftPane/MainLeftPane";
import MainRightPane from "../components/MainRightPane/MainRightPane";
import { Button, Checkbox } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import { CheckCircle } from "@mui/icons-material";
import { Edit } from "@mui/icons-material";
import { TrendingUp } from "@mui/icons-material";
import CustomNewButton from "../components/Buttons/CustomNewButton";
import { Link } from "react-router-dom";
import "../styles/AssignmentsPage.css";
import RemoveFileButton from "../components/Buttons/RemoveFileButton";
import GradingButton from "../components/Buttons/GradingButton";
import DashboardIcon from "@mui/icons-material/Dashboard";

const AnswerScriptsPage = () => {
  const [selectedAssignmentNos, setSelectedAssignmentNos] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleNewAnswerScript = (file) => {
    setSelectedFiles((prevSelectedFiles) => [...prevSelectedFiles, file]);
  };

  const handleToggleAssignmentNo = (regNo) => {
    setSelectedAssignmentNos((prevSelectedAssignmentNos) => {
      if (prevSelectedAssignmentNos.includes(regNo)) {
        return prevSelectedAssignmentNos.filter((no) => no !== regNo);
      } else {
        return [...prevSelectedAssignmentNos, regNo];
      }
    });
  };

  const handleGradeAllFiles = (event) => {};

  const handleGradeSelectedFiles = (event) => {};

  const handleGradeManually = (event) => {};

  const handleVisualizeAGraph = (event) => {};

  const handleRemove = (regNo) => {
    setSelectedFiles((prevSelectedFiles) =>
      prevSelectedFiles.filter((file) => file.name !== regNo)
    );
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
        <h1 id="heading">Uploaded Answer Scripts</h1>
        <div>
          <CustomNewButton
            text="Upload Answer Script"
            onFileSelect={handleNewAnswerScript}
          />
        </div>

        <div className="columnAnswerScripts">
          <table className="tableStyle2">
            <tbody>
              {selectedFiles.map((file) => (
                <tr
                  key={file.name}
                  className="trStyleAnswerScript"
                  style={{
                    backgroundColor: selectedAssignmentNos.includes(file.name)
                      ? "#F0F0F0"
                      : "#E3DDE8",
                  }}
                >
                  <td>
                    <Checkbox
                      color="primary"
                      checked={selectedAssignmentNos.includes(file.name)}
                      onChange={() => handleToggleAssignmentNo(file.name)}
                    />
                  </td>
                  <td onClick={() => handleToggleAssignmentNo(file.name)}>
                    {file.name}
                  </td>
                  <td>{file.lastModified}</td>
                  <td>{file.size}</td>
                  <td>
                    <RemoveFileButton onClick={() => handleRemove(file.name)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div
          style={{
            marginTop: "50px",
            display: "flex",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <GradingButton
            text="Grade all files"
            onClick={handleGradeAllFiles}
            icon={AssignmentTurnedInIcon}
          />
          <GradingButton
            text="Grade selected files"
            onClick={handleGradeSelectedFiles}
            icon={CheckCircle}
          />
          <Link
            to="/ManualGradingPage"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <GradingButton text="Grade manually" icon={Edit} />
          </Link>
          <Link
            to="/DataVisualization"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <GradingButton text="Visualize a graph" icon={TrendingUp} />
          </Link>
          <Link
            to="/Dashboard"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <GradingButton text="Dashboard" icon={DashboardIcon} />
          </Link>
        </div>
      </MainRightPane>
    </div>
  );
};

export default AnswerScriptsPage;
