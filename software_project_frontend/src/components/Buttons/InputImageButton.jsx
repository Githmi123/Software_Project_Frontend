import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Button, } from "@mui/material";
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

const InputImageButton = ({text }) => {
    return (
      <Button style={{backgroundColor:"#4169E1", color:"white", fontSize:"10px"}} onClick={() => document.getElementById('upload-profile-pic').click()}>
        {text ? text : "Upload"}
        <VisuallyHiddenInput
          type="file"
          accept=".jpg, .jpeg, .png"
         
        />
      </Button>
    );
  };
  
  export default InputImageButton;