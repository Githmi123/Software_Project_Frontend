import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Button, InputAdornment, TextField } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

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
      onFileSelect(file); // Pass the selected file to the parent component
    }
  };

  return (
    <>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        style={{ margin: "0", borderRadius: 5, width:"auto", fontSize:"1.5vh" }}
        startIcon={<CloudUploadIcon />}
      >
        {text ? text : "Upload"}
        <VisuallyHiddenInput
          type="file"
          accept=".xlsx, .xls, .csv"
          onChange={handleFileSelect}
        />
      </Button>
    </>
  );
};

export default InputFileUploadButton;
