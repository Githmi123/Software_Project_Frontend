import React from 'react';

import './LeftPane.css';

import logo from '../../images/logo.png';

export const LeftPane = () => {
    return(
        <div className="LeftPane" style={{width: "70vh"}}>
            <img src={logo} alt="Logo" id='Logo'></img>
            <h1 className="APGSText"> Automated Paper Grading System </h1>
            <h2 className="subtext-leftpane" > Faculty of Engineering </h2>
            <h2 className="subtext-leftpane"> University of Ruhuna </h2>
        </div>
    )
}