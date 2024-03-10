// LogInButton.jsx
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import login from '../../images/login.png'


function SignUpButton() {
  return (
    <div> 
      <Stack spacing={2} direction="row">
      <Button
      variant="text"
      type='submit'
      style={{
        position: 'absolute',
        left: '46%',
        right: '0%',
        top: '85%',
        bottom: '0%',
        background: '#7894DB',
        borderRadius: '12px',
        height: '6%',
        width: '12%'
      }}
    >
      <img src={login} alt="rs" style={{ height: "15px", width: "auto", position: "absolute", left: "15px", top: "10px"}}/>
      <div style={{
          position: 'absolute',
          left: '35.33%',
          right: '27.33%',
          top: '20%',
          width: "70%",
          bottom: '29.09%',
          fontFamily: 'Roboto',
          fontStyle: 'normal',
          fontWeight: 700,
          fontSize: '11px',
          lineHeight: '23px',
          display: 'flex',
          alignItems: 'center',
          color: '#FFFFFF',
        }}>
          
      Sign Up
      
      </div>
      
    </Button>
      
    </Stack>
    </div>
  );
}

export default SignUpButton;
