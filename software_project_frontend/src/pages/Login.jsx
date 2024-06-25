import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

import "../components/RightPane/RightPane.css"

import {LeftPane} from '../components/LeftPane/LeftPane';
import { RightPane } from '../components/RightPane/RightPane';
import "../styles/Login.css"


function Login() {


  return (
    <div className = "align1" >
        <LeftPane />
        <RightPane />
        

        

    </div>
  );
}

export default Login;
