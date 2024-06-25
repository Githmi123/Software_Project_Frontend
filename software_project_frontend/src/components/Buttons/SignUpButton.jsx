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
            position: 'relative',
            bottom: '0%',
            background: '#7894DB',
            borderRadius: '12px',
            height: '6%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: "center",
            flexDirection: "row",
            width: 'auto'
          }}
          >
          <img src={login} alt="rs" style={{ height: "15px", width: "auto", position: "relative"}}/>
          <div style={{
            position: 'relative',
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
