import React, { useEffect, useState } from "react";
import MainLeftPane from "../components/MainLeftPane/MainLeftPane";
import MainRightPane from "../components/MainRightPane/MainRightPane";
import { Button, Checkbox, CircularProgress } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { LineChart } from "@mui/x-charts/LineChart";
import refreshAccessToken from "../services/AuthService";
import DownloadIcon from "@mui/icons-material/Download";
import CustomButton from "../components/Buttons/CustomButton";
import CustomNewButton from "../components/Buttons/CustomNewButton";
import "../styles/AssignmentsPage.css";
import ScrollableMainRightPane from "../components/MainRightPane/ScrollableMainRightPane";
import BasicArea from "../components/BasicArea";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { BarChart } from "@mui/x-charts/BarChart";
import FolderList from "../components/FolderList";
import "../styles/DataVisualizationPage.css";
import * as XLSX from "xlsx";

const DataVisualizationPage = () => {
  const { selectedModuleCode, batch, assignmentid } = useParams();
  const [data, setData] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [parameters, setParameters] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [reportData, setReportData] = useState("");
  const [assignmentData, setAssignmentData] = useState("");
  const [assignmentName, setAssignmentName] = useState("");

  const [selectedAssignmentNo, setSelectedAssignmentNo] = useState([]);
  const [tableDataAssignments, setTableDataAssignments] = useState([]);
  const [loading, setLoading] = useState(false);

  function groupData(array) {
    let newData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let num;
    for (let i = 0; i < array.length; i++) {
      if (array[i] % 5 === 0) {
        console.log(array[i]);
        num = array[i] / 5;
        newData[num - 1]++;
      } else {
        console.log(array[i]);
        num = Math.floor(array[i] / 5);
        newData[num]++;
      }
    }
    return newData;
  }

  function findMode(array) {
    let mode = [];
    let count = 0;
    let val;

    for (let i = 0; i < array.length; i++) {
      val = array.filter((v) => v === array[i]).length;
      if (val > count) {
        mode.length = 0;
        mode.push(array[i]);
        count = val;
      } else if (val === count) {
        mode.push(array[i]);
      }
    }
    const set = new Set(mode);
    return set;
  }

  function calculate(array) {
    const filteredArray = array.filter((mark) => mark !== -1);
    if (filteredArray.length === 0) {
      // If no valid marks, return zeros
      return [0, 0, 0, [], 0, 0, 0];
    }
    filteredArray.sort((a, b) => a - b);
    const min = Math.min(...filteredArray);
    const max = Math.max(...filteredArray);
    const mean =
      filteredArray.reduce((acc, val) => acc + val, 0) / filteredArray.length;
    const mode = findMode(filteredArray);
    const median =
      filteredArray.length % 2 === 0
        ? (filteredArray[filteredArray.length / 2 - 1] +
            filteredArray[filteredArray.length / 2]) /
          2
        : filteredArray[Math.floor(filteredArray.length / 2)];
    const variance =
      filteredArray.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) /
      filteredArray.length;
    const standardDeviation = Math.sqrt(variance);

    return [
      min,
      max,
      parseFloat(mean.toFixed(3)),
      mode,
      parseFloat(median.toFixed(3)),
      parseFloat(variance.toFixed(3)),
      parseFloat(standardDeviation.toFixed(3)),
    ];
  }

  const fetch = async () => {
    setLoading(true);
    const response = await axios.get(
      `http://localhost:3500/assignment/${selectedModuleCode}/${batch}`
    );
    if (response.data && typeof response.data.rows === "object") {
      const assignmentData = response.data.rows;

      console.log("Assignment data fine : ", typeof assignmentData);
      console.log("Assignment data fine : ", assignmentData);

      const currentAssignment = assignmentData.find(
        (assignment) => assignment.assignmentid == assignmentid
      );

      if (currentAssignment) {
        setAssignmentName(currentAssignment.assignmenttitle);
      } else {
        console.error("Assignment not found");
      }
    } else {
      console.error("No assignment data found in the response:", response.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    const fetchAssignments = async (e) => {
      try {
        await fetch();
      } catch (error) {
        if (error.response && error.response.status === 401) {
          const newAccessToken = await refreshAccessToken();
          console.log("New access token: ", newAccessToken);

          if (newAccessToken) {
            try {
              await fetch();
            } catch (error) {
              console.error("Error fetching data:", error);
            }
          }
        } else {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchAssignments();
  }, [selectedModuleCode, batch, assignmentid]);

  const getData = async () => {
    setLoading(true);
    const response = await axios.get(
      `http://localhost:3500/report/batch/${batch}/modulecode/${selectedModuleCode}/assignmentid/${assignmentid}`
    );

    console.log("Response : ", response.data);

    const { marks } = response.data;
    if (marks && Array.isArray(marks)) {
      const marksArray = marks.map((marksObject) => marksObject.marks);

      console.log("Array of marks : ", marksArray);
      const data = groupData(marksArray);
      const parameters = calculate(marksArray);
      setData(data);
      console.log(data);
      console.log(parameters);
      setParameters(parameters);
    } else {
      console.error(
        "The response does not contain 'marks' or 'marks' is not an array"
      );
    }
    setLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getData();
      } catch (error) {
        if (error.response && error.response.status === 401) {
          const newAccessToken = await refreshAccessToken();
          console.log("New access token: ", newAccessToken);

          if (newAccessToken) {
            try {
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

  const getAnswerScripts = async () => {
    setLoading(true);
    const answerScriptData = await axios.get(
      `http://localhost:3500/answerscript/batch/${batch}/modulecode/${selectedModuleCode}/assignmentid/${assignmentid}`
    );

    setReportData(answerScriptData.data.rows);

    console.log("report data Json", JSON.stringify(reportData));

    const answerScriptsData = answerScriptData.data.rows;
    console.log("Answer scripts data : ", answerScriptsData);
    setLoading(false);
  };

  useEffect(() => {
    const fetchAnswerScriptData = async () => {
      try {
        await getAnswerScripts();
      } catch (error) {
        if (error.response && error.response.status === 401) {
          const newAccessToken = await refreshAccessToken();
          console.log("New access token: ", newAccessToken);

          if (newAccessToken) {
            try {
              await getAnswerScripts();
            } catch (error) {
              console.error("Error fetching data:", error);
            }
          }
        } else {
          console.error("Error fetching data:", error);
        }
      }
    };
    fetchAnswerScriptData();
  }, [batch, selectedModuleCode, assignmentid]);

  const handleOnExport = () => {
    const filteredData = reportData
      .filter((item) => item.marks !== -1)
      .map(({ studentid, marks }) => {
        const [courseCode, name] = studentid.split("-");
        return {
          StudentID: courseCode.trim(),
          Name: name.trim(),
          Marks: marks,
        };
      });
    var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(filteredData);

    XLSX.utils.book_append_sheet(wb, ws, "MySheet1");

    XLSX.writeFile(
      wb,
      `Marks-${selectedModuleCode}-${batch}-${assignmentName}.xlsx`
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
        <h2 id="heading">
          Distribution curve for {selectedModuleCode} : {assignmentName}
        </h2>
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <div>
              <BarChart
                className="bar-chart"
                xAxis={[
                  {
                    scaleType: "band",
                    data: [
                      "0-5",
                      "6-10",
                      "11-15",
                      "16-20",
                      "21-25",
                      "26-30",
                      "31-35",
                      "36-40",
                      "41-45",
                      "46-50",
                    ],
                    label: "Score",
                  },
                ]}
                yAxis={[{ label: "No.of students" }]}
                series={[
                  {
                    data: data.map((value) =>
                      value === -1 ? "Not Graded" : value
                    ),
                    area: true,
                    label: "No. of Students",
                  },
                ]}
                width={500}
                height={300}
              />

              <Button
                className="export-button"
                startIcon={<DownloadIcon />}
                onClick={handleOnExport}
              >
                Export as excel file
              </Button>
            </div>
            <div className="folders-list">
              <FolderList
                min={parameters[0]}
                max={parameters[1]}
                mean={parameters[2]}
                mode={parameters[3]}
                median={parameters[4]}
                variance={parameters[5]}
                standardDeviation={parameters[6]}
              />
            </div>
          </div>
        )}
      </MainRightPane>
    </div>
  );
};

export default DataVisualizationPage;
