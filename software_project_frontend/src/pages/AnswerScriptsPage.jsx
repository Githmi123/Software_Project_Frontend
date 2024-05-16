import React, { useState, useEffect } from "react";
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

import refreshAccessToken from "../services/AuthService";

import { useParams } from "react-router-dom";

import Cookies from "js-cookie";
import axios from "axios";

const AnswerScriptsPage = () => {
  const { selectedModuleCode, batch, assignmentid } = useParams();
  const [selectedAssignmentNos, setSelectedAssignmentNos] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [answerScripts, setAnswerScripts] = useState([]);

  console.log("the required data  : ", selectedModuleCode, batch, assignmentid);

  useEffect(() => {
    const fetchAnswerscripts = async () => {
      try {
        await refreshAccessToken();
        const config = {
          headers: {
            Authorization: `Bearer ${Cookies.get('accessToken')}`,
          },
        };
        
        const url=  `http://localhost:3500/answerscript/batch/${batch}/modulecode/${selectedModuleCode}/assignmentid/${assignmentid}`;
        
        console.log(url)
        const response = await axios.get(url
         ,config
          
        );

        const answerScriptsData = response.data.rows;

        setAnswerScripts(answerScriptsData);
      } catch (error) {
        console.error("Error fetching answer scripts:", error);
      }
    };

    fetchAnswerscripts();
  }, [selectedModuleCode, batch, assignmentid]);

  useEffect(() => {
    const uploadNewAnswerscripts = async () => {
      try {
        await refreshAccessToken();

        const formData = new FormData();
        selectedFiles.forEach((file) => formData.append("scripts", file));

        const response = await axios.post(
          `http://localhost:3500/answerscript/batch/${batch}/modulecode/${selectedModuleCode}/assignmentid/${assignmentid}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("accessToken")}`,
            },
          }
        );

        console.log("Uploaded Answer Scripts:", response.data);
      } catch (error) {
        console.error("Error uploading answer scripts:", error);
      }
    };

    if (selectedFiles.length > 0 && assignmentid) {
      uploadNewAnswerscripts();
    }
  }, [selectedFiles, selectedModuleCode, batch, assignmentid]);

  const handleNewAnswerScript = (file) => {
    setSelectedFiles((prevSelectedFiles) => [...prevSelectedFiles, file]);
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

  const handleGradeAllFiles = async () => {
    try {
      await refreshAccessToken();
      
      const response = await axios.post(
        `http://localhost:3500/answerscript/batch/${batch}/modulecode/${selectedModuleCode}/assignmentid/${assignmentid}/grade`,{},
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        }
      );

      console.log("Graded all answer scripts", response.data);
    } catch (error) {
      console.error("Error grading answer scripts:", error);
    }
  };

  const handleGradeSelectedFiles = (event) => {};

  const handleGradeManually = (event) => {};

  const handleVisualizeAGraph = (event) => {};

  const handleRemove = (scriptId) => {
    setSelectedFiles((prevSelectedFiles) =>
      prevSelectedFiles.filter((file) => file.id !== scriptId)
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
              {answerScripts &&
                answerScripts.map((script) => (
                  <tr
                    key={script.id}
                    className="trStyleAnswerScript"
                    style={{
                      backgroundColor: selectedAssignmentNos.includes(script.id)
                        ? "#F0F0F0"
                        : "#E3DDE8",
                    }}
                  >
                    <td>
                      <Checkbox
                        color="primary"
                        checked={selectedAssignmentNos.includes(script.id)}
                        onChange={() => handleToggleAssignmentNo(script.id)}
                      />
                    </td>
                    <td onClick={() => handleToggleAssignmentNo(script.id)}>
                      {script.studentid}
                    </td>
                    <td>
                      <RemoveFileButton
                        onClick={() => handleRemove(script.id)}
                      />
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
