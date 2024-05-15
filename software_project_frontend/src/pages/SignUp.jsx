// import logo from './logo.svg';
// import './Login.css';
import React from 'react';
import { LeftPane } from '../components/LeftPane/LeftPane';
import { RightPaneSignUp } from '../components/RightPaneSignUp/RightPaneSignUp';
import "../components/RightPane/RightPane.css"
import "../styles/Login.css"
// import "../styles/Login.css"

function SignUp() {


  return (
    <div className = "align1" style={{backgroundColor: "#7894DB"}}>
      
        <LeftPane/>
        <RightPaneSignUp/>
      
        {/* <div id='rectangle1'>

        </div>

        <div id='rectangle2'>

        </div>

        <div id='rectangle3'>

        </div> */}

       {/*  <div id='rectangle4'>

        </div>

        <div id='rectangle5'>

        </div>
      */}

    </div>  
  );
}

export default SignUp;
