import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Button, InputAdornment, TextField } from '@mui/material';
// import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'relative',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const InputFileUploadButton = ({onFileSelect}) => {

    // const [selectedFile, setSelectedFile] = useState(null);

    const handleFileSelect = (event) => {
        if (event.target && event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            // setSelectedFile(file);
            onFileSelect(file);
        }
    };
    

  return (
    
    <>
        <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            // type='image'
            //   startIcon={<CloudUploadIcon />}
            style={{ margin: "0", borderRadius: 5}}
        >
            <CloudUploadIcon />
            <VisuallyHiddenInput type="file" accept="image/*" onChange={handleFileSelect}/>
        </Button>
        {/* {selectedFile && (
                <TextField
                    value={selectedFile.name}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">Selected: </InputAdornment>
                        ),
                    }}
                    variant="outlined"
                    fullWidth
                    disabled
                />
        )} */}
    </>
  );
}

export default InputFileUploadButton;