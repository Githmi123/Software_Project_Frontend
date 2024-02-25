import React from 'react'
import './UserProfileRightPane.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export const UserProfileRightPane = () => {
  return (
    <div id='rightpane'>
        <div className='row'>
            <button id='homeButton'>
                <i className="fas fa-angle-left">
                    <span id='homeText'> Home </span>
                </i>

            </button>
            <button className="notificationButton">
                <i className="fas fa-bell"></i>

            </button>
        </div>

        <div className='row'>
            <div>
                <span className='label1'>First Name</span>
                <div id='space1'>
                    <TextField id="outlined-basic" label="First Name" variant="outlined"/>
                </div>
            </div>

            <div>
                <span className='label2'>Last Name</span>
                <div id='space2'>
                    <TextField id="outlined-basic" label="Last Name" variant="outlined"/>
                </div>
            </div>
        </div>

        <div>
            <span className='label1'>Email</span>
            <div id='space3'>
                <TextField id="outlined-basic" label="Email" variant="outlined" style={{width: "140vh"}}/>
            </div>
        </div>

        <div>
            <span className='label1'>Address</span>
            <div id='space3'>
                <TextField id="outlined-basic" label="Address" variant="outlined" style={{width: "140vh"}}/>
            </div>
        </div>


        <div className='row'>
            <div>
                <span className='label1'>Contact No.</span>
                <div id='space1'>
                    <TextField id="outlined-basic" label="Contact No." variant="outlined"/>
                </div>
            </div>

            <div>
                <span className='label2'>Password</span>
                <div id='space2'>
                    <TextField id="outlined-basic" label="Password" variant="outlined" type='password'/>
                </div>
            </div>
        </div>

        <div>
            <span className='label1'>Educational Background</span>
            <div id='space3' style={{Height: "50vh"}}>
                {/* <TextField id="outlined-basic" label="Educational Background" variant="outlined" style={{width: "140vh", height: "50vh"}}/> */}
                <TextField
                    id="outlined-multiline-static"
                    label="Educational Background"
                    multiline
                    rows={3} // Adjust the number of rows as needed
                    defaultValue="Educational Background"
                    variant="outlined"
                    fullWidth
                    style={{width: "140vh"}}
/>

            </div>
        </div>

        <div className='row' style={{justifyContent:"center"}}>
            <Button variant="contained" style={{margin:"10px", backgroundColor:"white", color:"#7894DB", width : "20vh", textTransform: "capitalize", border: "2px solid #7894DB"}}>Cancel</Button>
            <Button variant="contained" style={{margin:"10px", backgroundColor:"#7894DB", width : "20vh", textTransform: "capitalize"}}>Save</Button>
        </div>
        
        
        
    </div>
  )
}


