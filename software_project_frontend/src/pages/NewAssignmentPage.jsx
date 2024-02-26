import React, { useState } from 'react'
import MainLeftPane from '../components/MainLeftPane/MainLeftPane'
import MainRightPane from '../components/MainRightPane/MainRightPane'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Button, TextField } from '@mui/material'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import '../styles/NewAssignmentPage.css'
import CustomSelect from '../components/Other/CustomSelect';
import InputFileUploadButton from '../components/Buttons/InputFileUploadButton';




const NewAssignmentPage = () => {
    const [selectedModule, setSelectedModule] = useState('');
    const [selectedBatch, setSelectedBatch] = useState('');
    const [assignmentName, setAssignmentName] = useState('');

    const handleModuleChange = (event) => {
        setSelectedModule(event.target.value);
    };

    const handleBatchChange = (event) => {
        setSelectedBatch(event.target.value);
    };

    const handleAssignmentNameChange = (event) => {
        setAssignmentName(event.target.value);
    };


  return (
    <div>
        <MainLeftPane/>
        <MainRightPane>
            <Button  sx={{m:2, width:'100px', height:'50px',color:'black',fontWeight:'bold' }} startIcon={<ArrowBackIcon/>}>Home</Button>
            <div className='align'>
                <span className='label1'>Module</span>
                <CustomSelect
                    label="Module"
                    value={selectedModule}
                    onChange={handleModuleChange}
                    options={[
                    { value: '', label: 'None' },
                    { value: 10, label: 'Ten' },
                    { value: 20, label: 'Twenty' },
                    { value: 30, label: 'Thirty' },
                    ]}
                />

                <span className='label1'>Batch</span>
                
                <CustomSelect
                    label="Batch"
                    value={selectedBatch}
                    onChange={handleBatchChange}
                    options={[
                    { value: '', label: 'None' },
                    { value: 10, label: 'Ten' },
                    { value: 20, label: 'Twenty' },
                    { value: 30, label: 'Thirty' },
                    ]}
                />

                <span className='label1'>Assignment Name</span>
                <TextField
                    id="outlined-basic"
                    label="Assignment Name"
                    variant="outlined"
                    value={assignmentName}
                    onChange={handleAssignmentNameChange}
                    sx={{ m: 0.5, maxWidth: 400}} // Apply the same height as the CustomSelect
                />


                <span className='label1'>Marking Scheme</span>
                <InputFileUploadButton/>
                
                    
                {/* <div> */}
                    {/* <label htmlFor="dropdown">Choose an option:</label> */}
                    {/* <select id="dropdown" value={selectedValue} onChange={handleChange}>
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                    </select> */}
                    {/* <p>Selected option: {selectedValue}</p> */}
                {/* </div> */}

                
                
                {/* <FormControl sx={{ m: 0.5, maxWidth: 400 }}>
                    <InputLabel id="demo-simple-select-helper-label">Select Module</InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={selectedValue}
                        label="Age"
                        onChange={handleChange}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select> */}
                    {/* <FormHelperText>With label + helper text</FormHelperText> */}
                {/* </FormControl> */}
      {/* <FormControl sx={{ m: 1, minWidth: 120 }}>
        <Select
          value={selectedValue}
          onChange={handleChange}
          label="Select Module"
        
          
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        {/* <FormHelperText>Without label</FormHelperText> */}
      {/* </FormControl> */} 




      

                {/* <div> */}
                    {/* <label htmlFor="dropdown">Choose an option:</label> */}
                    {/* <select id="dropdown" value={selectedValue} onChange={handleChange}>
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                    </select> */}
                    {/* <p>Selected option: {selectedValue}</p> */}
                {/* </div> */}

                
                {/* <FormControl sx={{ m: 0.5, maxWidth: 400 }}>
                    <InputLabel id="demo-simple-select-helper-label">Select Batch</InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={selectedValue}
                        label="Batch"
                        onChange={handleChange}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select> */}
                    {/* <FormHelperText>With label + helper text</FormHelperText> */}
                {/* </FormControl> */}



            </div>
    

        </MainRightPane>
        
      
    </div>
  )
}

export default NewAssignmentPage;
