import React from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useState, useRef } from "react";
import { styled } from "@mui/material/styles";
import { Button, InputAdornment, TextField, Tooltip } from "@mui/material";
import "../CustomNewButton2/CustomNewButton2.css";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  whiteSpace: "nowrap",
  width: 1,
});

const CustomNewButton2 = ({ text, onFileSelect }) => {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click(); // Click the file input element when the button is clicked
  };

  const handleFileSelect = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      onFileSelect(event);
    }
  };

  return (
    <div className="custom-button-container-2">
      <Tooltip title={text} arrow>
        <Button
          className="custom-button-2"
          startIcon={<AddCircleIcon />}
          onClick={handleButtonClick}
        >
          {text}
        </Button>
      </Tooltip>
      <VisuallyHiddenInput
        ref={fileInputRef}
        type="file"
        accept=".jpeg, .png, .jpg"
        onChange={handleFileSelect}
      />
    </div>
  );
};

export default CustomNewButton2;
