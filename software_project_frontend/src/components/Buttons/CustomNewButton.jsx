import AddCircleIcon from "@mui/icons-material/AddCircle";
import React, { useRef } from "react";
import { styled } from "@mui/material/styles";
import { Button, Tooltip } from "@mui/material";
import "./CustomNewButton.css";

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
    fileInputRef.current.click(); 
  };

  const handleFileSelect = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      onFileSelect(event);
    }
  };

  return (
    <div className="custom-button-container">
      <Tooltip title={text} arrow>
        <Button
          className="custom-button"
          startIcon={<AddCircleIcon />}
          onClick={handleButtonClick}
        >
          {text}
        </Button>
      </Tooltip>
      <VisuallyHiddenInput
        ref={fileInputRef}
        type="file"
        accept=".jpeg, .png, .jpg, .pdf"
        multiple
        onChange={handleFileSelect}
      />
    </div>
  );
};

export default CustomNewButton;
