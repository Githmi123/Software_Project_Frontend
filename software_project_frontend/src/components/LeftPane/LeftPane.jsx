import React from 'react';
import './LeftPane.css';
import logo from '../../images/logo.png';

export const LeftPane = () => {
    return(
        <div className="LeftPane" style={{width: "640px"}}>
            <div>
                <img src={logo} alt="Logo" id='Logo'></img>
            </div>
            <h1 className="APGSText"> Automated Paper Grading System </h1>
            <h2 className="subtext" style={{top: "410px"}}> Faculty of Engineering </h2>
            <h2 className="subtext" style={{top: "440px"}}> University of Ruhuna </h2>
        </div>
    )
}