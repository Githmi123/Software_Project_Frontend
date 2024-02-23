// import logo from './logo.svg';
// import './Login.css';
import React from 'react';
import { Link } from 'react-router-dom';

import "../components/RightPane/RightPane.css"

import { LeftPane } from '../components/LeftPane/LeftPane';
import { RightPane } from '../components/RightPane/RightPane';
import { UserProfileLeftPane } from '../components/UserProfileLeftPane/UserProfileLeftPane';


function UserProfile() {


  return (
    <div  style={{backgroundColor: "#7894DB"}}>
      <UserProfileLeftPane/>
  
       
        

    </div>
  );
}

export default UserProfile;
