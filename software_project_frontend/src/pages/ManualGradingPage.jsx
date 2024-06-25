import React, { useState, useEffect } from "react";
import MainLeftPane from "../components/MainLeftPane/MainLeftPane";
import MainRightPane from "../components/MainRightPane/MainRightPane";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { AlignHorizontalCenter, Check, Close } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import answerscript1 from "../images/answerscript1.png";
import "../styles/ManualGradingPage.css";
import refreshAccessToken from "../services/AuthService";
import { useParams, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    padding: "2px 4px",
    fontSize: 8,
    textAlign: "center",
  },
  [`&.${tableCellClasses.body}`]: {
    padding: "2px 4px",
    fontSize: 8,
    textAlign: "center",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const ManualGradingPage = () => {
  const { selectedModuleCode, batch, assignmentid, studentid } = useParams();
  const [gradeData, setGradeData] = useState("");

  useEffect(() => {
    const handleGrades = async () => {
      try {

        const response = await axios.get(
          `http://localhost:3500/answerscript/batch/${batch}/modulecode/${selectedModuleCode}/assignmentid/${assignmentid}/studentid/${studentid}`
        );

        console.log("Details of the answer scripts :", response.data);
        console.log(typeof response.data);
        setGradeData(response.data);
      } catch (error) {
        console.error("Error displaying answer scripts:", error);
      }
    };

    handleGrades();
  }, [batch, selectedModuleCode, assignmentid, studentid]);

  const renderTable = (questions) => {
    if (!questions || questions.length === 0) {
      return <p>No data available</p>;
    }
    const firstColumn = questions.slice(0, 25);
    const secondColumn = questions.slice(25, 50);

    return (
      <div
        id="column-div"

      >
       
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 200 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Question Number</StyledTableCell>
                <StyledTableCell align="right">Student Answer</StyledTableCell>
                <StyledTableCell align="right">Correct Answer</StyledTableCell>
                
              </TableRow>
            </TableHead>
            <TableBody>
              {firstColumn.map((item, index) => (
                <StyledTableRow key={index}>
                  
                  <StyledTableCell align="right">
                    {item.questionnumber}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {Number(item.student_answer) + 1}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {Number(item.correct_answer) + 1}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 200 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Question Number</StyledTableCell>
                <StyledTableCell align="right">Student Answer</StyledTableCell>
                <StyledTableCell align="right">Correct Answer</StyledTableCell>
              
              </TableRow>
            </TableHead>
            <TableBody>
              {secondColumn.map((item, index) => (
                <StyledTableRow key={index}>
               
                  <StyledTableCell align="right">
                    {item.questionnumber}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {Number(item.student_answer) + 1}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {Number(item.correct_answer) + 1}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
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
          BACK
        </Button>
        {gradeData &&
          gradeData.infoResult &&
          gradeData.infoResult.length > 0 && (
            <h5
              style={{
                textAlign: "center",
                marginLeft: "5vh",
                marginTop: "-5vh",
              }}
            >
              Answer Script - {gradeData.infoResult[0].studentid}
            </h5>
          )}
    
        <div id="graded-answerscript">
          <img
            id="paper-image"
            src={gradeData.scriptUrl}
            alt="Answer Script"
         
          />
          <div id="marks-columns-div">{renderTable(gradeData.jsonAnswers)}</div>
        </div>
      </MainRightPane>
    </div>
  );
};

export default ManualGradingPage;
