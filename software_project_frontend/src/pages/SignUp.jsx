// import logo from './logo.svg';
// import './Login.css';
import React from 'react';
import { LeftPane } from '../components/LeftPane/LeftPane';
import { RightPaneSignUp } from '../components/RightPaneSignUp/RightPaneSignUp';
import "../components/RightPane/RightPane.css"


function SignUp() {


  return (
    <div >
      
        <LeftPane/>
        <RightPaneSignUp/>
      
        <div id='rectangle1'>

        </div>

        <div id='rectangle2'>

        </div>

        <div id='rectangle3'>

        </div>

       {/*  <div id='rectangle4'>

        </div>

        <div id='rectangle5'>

        </div>
      */}

    </div>  
  );
}

export default SignUp;
