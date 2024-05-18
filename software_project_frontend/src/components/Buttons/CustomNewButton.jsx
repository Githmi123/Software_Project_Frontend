import AddCircleIcon from "@mui/icons-material/AddCircle";
import React, { useState, useRef } from "react";
import { styled } from "@mui/material/styles";
import { Button, InputAdornment, TextField } from "@mui/material";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  whiteSpace: "nowrap",
  width: 1,
});

const CustomNewButton = ({ text, onFileSelect }) => {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click(); // Click the file input element when the button is clicked
  };

  const handleFileSelect = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      onFileSelect(file); // Pass the selected file to the parent component
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Button
        sx={{
          
          width: "auto",
          padding: "3vh",
          height: "2vh",
          color: "black",
          fontWeight: "bold",
          textTransform: "none",
          backgroundColor: "#C3D3FB",
          borderRadius: "2vh",
          fontSize:"1.5vh"
        }}
        startIcon={<AddCircleIcon />}
        className="new-module-button"
        onClick={handleButtonClick}
      >
        {text}
      </Button>
      {/* VisuallyHiddenInput is now rendered next to the button */}
      <VisuallyHiddenInput
        ref={fileInputRef}
        type="file"
        accept=".jpeg, .png, .jpg"
        onChange={handleFileSelect}
      />
    </div>
  );
};

export default CustomNewButton;
