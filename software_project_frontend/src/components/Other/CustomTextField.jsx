import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

const CustomTextField = ({ label, vector }) => {
  return (
    <TextField
      id="standard-basic"
      label={label}
      variant="standard"
      style={{
        position: 'absolute',
        width: '489px',
        height: '55px',
        left: '188px',
        top: '389px',
        color: '#000000',
      }}
      InputProps={{
        style: {
          boxSizing: 'border-box',
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          borderBottom: '4px solid #5932EA',
          borderRadius: '8px',

        },
        startAdornment: (
          <InputAdornment position="start" style={{
            position: 'absolute',
            left: '4.38%',
            right: '92.9%',
            top: '34.55%',
            bottom: '34.55%',
            background: '#000000',
          }}>
            {vector}
          </InputAdornment>
        ),
      }}
      InputLabelProps={{
        style: {
          position: 'absolute',
          left: '1.23%',
          right: '70.56%',
          top: '-50%',
          bottom: '27.27%',
          fontFamily: 'Roboto',
          fontStyle: 'normal',
          fontWeight: 800,
          fontSize: '20px',
          lineHeight: '23px',
          display: 'flex',
          alignItems: 'center',
          color: '#000000',
        },
      }}
    />
  );
};

export default CustomTextField;
