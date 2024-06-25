import React from 'react';
import { LeftPane } from '../components/LeftPane/LeftPane';
import { RightPaneSignUp } from '../components/RightPaneSignUp/RightPaneSignUp';
import "../components/RightPane/RightPane.css"
import "../styles/Login.css"

function SignUp() {


  return (
    <div className = "align1" style={{backgroundColor: "#7894DB"}}>
      
        <LeftPane/>
        <RightPaneSignUp/>
      

    </div>  
  );
}

export default SignUp;
