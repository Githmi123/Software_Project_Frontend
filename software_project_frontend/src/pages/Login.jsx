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
        
{/*         
        <div id='rectangle1'>
        </div>

        <div id='rectangle2'>
        </div>

        <div id='rectangle3'>
        </div> */}

       {/*  <div id='rectangle4'>
        </div>

        <div id='rectangle5'>
        </div> */}
        

    </div>
  );
}

export default Login;
