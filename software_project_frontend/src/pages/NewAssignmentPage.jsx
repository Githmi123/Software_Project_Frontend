import React, { useState } from 'react'
import MainLeftPane from '../components/MainLeftPane/MainLeftPane'
import MainRightPane from '../components/MainRightPane/MainRightPane'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Button, InputAdornment, TextField } from '@mui/material'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { Link } from 'react-router-dom';

import '../styles/NewAssignmentPage.css'
import CustomSelect from '../components/Other/CustomSelect';
import InputFileUploadButton from '../components/Buttons/InputFileUploadButton';
import CustomButton from '../components/Buttons/CustomButton';




const NewAssignmentPage = () => {
    const [selectedModule, setSelectedModule] = useState('');
    const [selectedBatch, setSelectedBatch] = useState('');
    const [assignmentName, setAssignmentName] = useState('');
    const [selectedImage, setSelectedImage] = useState('');

    const handleModuleChange = (event) => {
        setSelectedModule(event.target.value);
    };

    const handleBatchChange = (event) => {
        setSelectedBatch(event.target.value);
    };

    const handleAssignmentNameChange = (event) => {
        setAssignmentName(event.target.value);
    };

    const handleSelectedImageChange = (event) => {
        if (event.target && event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            setSelectedImage(file);
          
        }
    };

    const handleCancel = (event) => {
        
    };

    const handlePrevious = (event) => {
        window.history.back(); // Navigate to previous page
    };

    const handleSave = (event) => {
        
    };
    // const onFileSelect = (event) => {
    
    //     console.log("File selected");
    // };


  return (
    <div>
        <MainLeftPane/>
        <MainRightPane>
            <Button  sx={{m:2, width:'100px', height:'50px',color:'black',fontWeight:'bold' }} startIcon={<ArrowBackIcon/>} onClick={() => window.history.back()} >Home</Button>
            <div className='align'>
                <span className='label1'>Module</span>
                <CustomSelect
                    label="Module"
                    value={selectedModule}
                    onChange={handleModuleChange}
                    options={[
                    { value: '', label: 'EE4250 Database Systems' },
                    { value: 10, label: 'EE5262 Design Patterns' },
                    { value: 20, label: 'EE3307 GUI Programming' },
                    ]}
                />

                <span className='label1'>Batch</span>
                
                <CustomSelect
                    label="Batch"
                    value={selectedBatch}
                    onChange={handleBatchChange}
                    options={[
                    { value: '', label: '22th batch' },
                    { value: 10, label: '23rd batch' },
                    { value: 20, label: '24th batch' },
                    { value: 30, label: '25th batch' },
                    ]}
                />

                <span className='label1'>Assignment Name</span>
                <TextField
                    id="outlined-basic"
                    label="Assignment Name"
                    variant="outlined"
                    value={assignmentName}
                    onChange={handleAssignmentNameChange}
                    sx={{ m: 0.5, maxWidth: 400, padding:"0", position:"relative"}}
                />


                <span className='label1'>Marking Scheme</span>
                <div className='center'>
                    <TextField
                        id="outlined-basic"
                        label="Marking Scheme"
                        variant="outlined"
                        value={selectedImage ? selectedImage.name : ''}
                        onChange={handleSelectedImageChange}
                        sx={{ m: 0.5, maxWidth: 400, padding:"0", position:"relative"}}
                    />
                    <InputFileUploadButton onFileSelect={setSelectedImage} />
                    {/* <InputFileUploadButton onFileSelect={onFileSelect}/> */}
                </div>

                
            </div>

            <div className='row'>
                    {/* <CustomButton text = "Cancel" onClick = {handleCancel} backgroundColor = "white" textColor = "#7894DB" /> */}

                    <Link to="/RecentPage" style={{ textDecoration: 'none' }}> {/* Wrap the button with Link */}
                        <CustomButton text="Cancel" onClick={handleCancel} backgroundColor="white" textColor="#7894DB" />
                    </Link>

                    <CustomButton text = "Next" onClick = {handleSave} backgroundColor = "#7894DB" textColor = "white" />

                    {/* <Button variant="contained" style={{margin:"10px", backgroundColor:"white", color:"#7894DB", width : "20vh", textTransform: "capitalize", border: "2px solid #7894DB"}}>Cancel</Button> */}
                    {/* <Button variant="contained" style={{margin:"10px", backgroundColor:"#7894DB", width : "20vh", textTransform: "capitalize"}}>Save</Button> */}
            </div>
        </MainRightPane>
        
      
    </div>
    )
}

export default NewAssignmentPage;
    
                                            {/* {selectedImage && (
                                                <TextField
                                                id="outlined-basic"
                                                label="Marking Scheme"
                                                variant="outlined"
                                                value={selectedImage.name}
                                                sx={{ m: 0.5, maxWidth: 400, padding:"0", position:"relative"}}
                                                InputProps={{
                                                    startAdornment: (
                                                    <InputAdornment position="start">Selected: {selectedImage.name} </InputAdornment>
                                                    ),
                                                }}
                                                />
                                            )} */}
                

                {/* <span className='label1'>Marking Scheme</span>
                <div className='center'>
                    <InputFileUploadButton onFileSelect={onFileSelect} /> */}
                {/* <label htmlFor="contained-button-file">
                <InputFileUploadButton/>
                </label>*/}
                   
                        {/* <TextField
                            id="outlined-basic"
                            label="Marking Scheme"
                            variant="outlined"
                            // type='file'
                            value={selectedImage.name}
                            onChange={handleSelectedImageChange}
                            sx={{ m: 0.5, maxWidth: 400, padding:"0", position:"relative"}}
                            InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">Selected: {selectedImage.name} </InputAdornment>
                                                    ),
                            }}
                            // InputProps={{
                            //     endAdornment: (
                            //         <InputAdornment position='end'>
                                        
                            //         </InputAdornment>
                            //     )
                            // }}
                        
                        /> */}

                    
                    {/* <InputFileUploadButton/> */}
                    {/* <InputFileUploadButton onFileSelect={onFileSelect} /> */}
                
            
                
                
                    
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



            {/* </div> */}
    

