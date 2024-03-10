import React, { useState } from 'react';
import MainLeftPane from '../components/MainLeftPane/MainLeftPane';
import MainRightPane from '../components/MainRightPane/MainRightPane';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Check, Close } from '@mui/icons-material';

import answerscript1 from '../images/answerscript1.png';
import "../styles/ManualGradingPage.css";

const markingSchemeData = [
  { Q1: 1 }, { Q2: 3 }, { Q3: 4 }, { Q4: 2 }, { Q5: 1 }, { Q6: 2 }, { Q7: 4 }, { Q8: 4 }, { Q9: 3 }, { Q10: 1 },
  { Q11: 2 }, { Q12: 4 }, { Q13: 2 }, { Q14: 3 }, { Q15: 2 }, { Q16: 1 }, { Q17: 3 }, { Q18: 3 }, { Q19: 4 }, { Q20: 1 },
  { Q21: 2 }, { Q22: 2 }, { Q23: 3 }, { Q24: 1 }, { Q25: 2 }, { Q26: 3 }, { Q27: 2 }, { Q28: 3 }, { Q29: 4 }, { Q30: 1 },
];

const ManualGradingPage = () => {
  const [selectedAnswers, setSelectedAnswers] = useState(Array(markingSchemeData.length).fill(''));

  const handleSelectedQuestion = (event, questionIndex) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[questionIndex] = event.target.value;
    setSelectedAnswers(newSelectedAnswers);
  }

  const generateSelectOptions = (questionIndex) => {
    return (
      <>
        <MenuItem value="tick"><Check /></MenuItem>
        <MenuItem value="cross"><Close /></MenuItem>
      </>
    );
  };

  const generateSelectComponent = (questionIndex) => {
    const selectedOption = selectedAnswers[questionIndex];
    return (
      <Box sx={{ minWidth: 80, minHeight: '2vh' }}>
        <FormControl fullWidth>
          <InputLabel id={`demo-simple-select-label-${questionIndex}`}>check</InputLabel>
          <Select
            labelId={`demo-simple-select-label-${questionIndex}`}
            id={`demo-simple-select-${questionIndex}`}
            value={selectedOption}
            label="check"
            onChange={(e) => handleSelectedQuestion(e, questionIndex)}
          >
            {generateSelectOptions(questionIndex)}
          </Select>
        </FormControl>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
          {selectedOption === 'tick' && <Check style={{ color: 'green' }} />}
          {selectedOption === 'cross' && <Close style={{ color: 'red' }} />}
        </div>
      </Box>
    );
  };
  

  // Generate table rows for the left side
  const generateTableRows = (startIndex, endIndex) => {
    return markingSchemeData.slice(startIndex, endIndex).map((item, index) => (
      <tr key={index} style={{ padding: '1vh' }}>
        <td className='marking-scheme-tabledata' style={{ padding: '0.1vh', width: '8vh' }}>{`Q${startIndex + index + 1}`}</td>
        <td className='marking-scheme-tabledata' style={{ padding: '0.1vh', width: '6vh' }}>{item[`Q${startIndex + index + 1}`]}</td>
      </tr>
    ));
  };

  // Generate table rows with Select components for the right side
  const generateCheckableTableRows = () => {
    return markingSchemeData.map((item, index) => (
      <tr key={index}>
        <td style={{ padding: '0.1vh', width: '8vh' }}>{`Q${index + 1}`}</td>
        <td>{generateSelectComponent(index)}</td>
      </tr>
    ));
  };

  // Generate tables for the left side
  const generateTables = () => {
    const tables = [];
    const columnSizes = [10, 10, 10];

    let startIndex = 0;
    for (let size of columnSizes) {
      const endIndex = startIndex + size;
      tables.push(
        <div key={startIndex} style={{ marginRight: '1vh' }}>
          <table className='marking-scheme-table'>
            <tbody>
              {generateTableRows(startIndex, endIndex)}
            </tbody>
          </table>
        </div>
      );
      startIndex = endIndex;
    }
    return tables;
  };

  // Generate tables with Select components for the right side
  const generateCheckingTables = () => {
    const tables = [];
    const columnSizes = [10, 10, 10];

    let startIndex = 0;
    for (let size of columnSizes) {
      const endIndex = startIndex + size;
      tables.push(
        <div key={startIndex} style={{ marginRight: '1vh' }}>
          <table>
            <tbody>
              {generateCheckableTableRows(startIndex, endIndex)}
            </tbody>
          </table>
        </div>
      );
      startIndex = endIndex;
    }
    return tables;
  };

  return (
    <div>
      <MainLeftPane />
      <MainRightPane>
        <Button sx={{ m: 2, width: '100px', height: '50px', color: 'black', fontWeight: 'bold' }} startIcon={<ArrowBackIcon />} onClick={() => window.history.back()} >Home</Button>
        <h2 style={{ textAlign: 'center', marginTop: '-5vh' }}>Manual Grading</h2>
        <img id='answer-script-image' src={answerscript1} />
        <div className='content-wrapper'>
          <div className='checking-side-left'>
            <h5>Marking Scheme-left</h5>
            <div id='Marking-scheme' style={{ display: 'flex' }}>
              {generateCheckingTables()}
            </div>
          </div>
          <div className='marking-scheme-right'>
            <h5>Marking Scheme-right</h5>
            <div id='Marking-scheme' style={{ display: 'flex' }}>
              {generateTables()}
            </div>
          </div>
        </div>
      </MainRightPane>
    </div>
  );
}

export default ManualGradingPage;
