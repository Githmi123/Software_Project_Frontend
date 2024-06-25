import { Button } from '@mui/material';
import React from 'react';
import './CustomButton.css';

const CustomButton = ({ text, onClick, backgroundColor, textColor }) => {
  return (
    <div>
      <Button
        variant="contained"
        className="button"
        style={{ backgroundColor, color: textColor }}
        onClick={onClick}
      >
        {text}
      </Button>
    </div>
  );
};

export default CustomButton;
