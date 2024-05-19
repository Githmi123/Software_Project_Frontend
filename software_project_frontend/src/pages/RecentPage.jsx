import React, { useState, useEffect } from "react";
import MainLeftPane from "../components/MainLeftPane/MainLeftPane";
import MainRightPane from "../components/MainRightPane/MainRightPane";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button } from "@mui/material";
import refreshAccessToken from "../services/AuthService";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import SearchAppBar from "../components/Other/SearchBar/SearchBar";
import { useParams } from "react-router-dom";
import "../styles/RecentPage.css";
import UserProfileBar from "../components/UserProfileBar/UserProfileBar";

const headers = ["Assignment", "Batch", "Date Created"];

const RecentPage = () => {
  const [selectedRecentModule, setSelectedRecentModule] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [moduleData, setModuleData] = useState([]);
  const [batchData, setBatchData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // await refreshAccessToken();
        const modulesResponse = await axios.get(
          "http://localhost:3500/modules",
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("accessToken")}`,
            },
          }
        );
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
            `http://localhost:3500/batch/${module.modulecode}`,
            {
              headers: {
                Authorization: `Bearer ${Cookies.get("accessToken")}`,
              },
            }
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
            `http://localhost:3500/assignment/${batch.moduleCode}/${batch.batch}`,
            {
              headers: {
                Authorization: `Bearer ${Cookies.get("accessToken")}`,
              },
            }
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
      }
    };

    fetchData();
  }, []);

  return (
    <div className="align1">
      <MainLeftPane/>
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
        <h1 id="heading">Recents</h1>
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
              {assignments.length > 0 ? (
                assignments.map((assignment, index) => (
                  <tr
                    key={index}
                    className="table-data"
                    onClick={() => setSelectedRecentModule(assignment)}
                    style={{
                      backgroundColor:
                        selectedRecentModule === assignment
                          ? "#7894DB"
                          : "#E3DDE8",
                      color:
                        selectedRecentModule === assignment ? "white" : "black",
                      border: "7px solid white",
                      borderRadius: "10px",
                    }}
                  >
                    {" "}
                    <td>
                      <Link
                        to={`/AnswerScripts/batch/${assignment.batch}/modulecode/${assignment.moduleCode}/assignmentid/${assignment.assignmentId}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        {assignment.moduleCode} {assignment.moduleName} -{" "}
                        {assignment.assignment}
                      </Link>
                    </td>
                    <td>{assignment.batch}</td>
                    {/* <td>{assignment.assignmentId}</td> */}
                    <td>{assignment.dateCreated}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No assignments found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
      </MainRightPane>
    </div>
  );
};

export default RecentPage;
