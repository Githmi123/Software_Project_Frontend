import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Button, Tooltip } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import './CustomNewButton.css';

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "relative",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const InputFileUploadButton = ({ onFileSelect, text }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedFile(file);
      onFileSelect(file); 
    }
  };

  return (
    <>
    <Tooltip title = {text} arrow>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        className="custom-upload-button"
        startIcon={<CloudUploadIcon />}
      >
        {text ? text : "Upload"}
        <VisuallyHiddenInput
          type="file"
          accept=".xlsx, .xls, .csv, .jpg, .jpeg, .png"
          onChange={handleFileSelect}
        />
      </Button>
      </Tooltip>
    </>
  );
};

export default InputFileUploadButton;
