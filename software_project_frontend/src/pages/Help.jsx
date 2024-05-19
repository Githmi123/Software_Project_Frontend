import React from 'react'
import MainLeftPane from '../components/MainLeftPane/MainLeftPane'
import MainRightPane from '../components/MainRightPane/MainRightPane'
import '../styles/Help.css'
import help from '../images/help.png'
import SpeedDialTooltipOpen from '../components/SpeedDial'


function Help() {
  return (
    <div className = "align1">
        <MainLeftPane/>
        <MainRightPane>
            <div style={{display:"flex", justifyContent: "space-evenly", alignItems:"center", flexDirection:"row", margintop:"10vh", height: "100%"}}>
                <div style={{display:"flex", justifyContent:"center", flexDirection:"column", alignItems:"center", width:"40%"}}>
                    <h1>Support Center</h1>
                    <p style={{color:"black", textAlign:"justify"}}>If you need assistance with uploading, grading, or managing answer scripts, please contact our support team for further guidance. Our goal is to ensure you have a smooth and efficient experience using our system.</p>
                </div>
                
                <img src={help} id = "helpImage"/>
            </div>
            
            <SpeedDialTooltipOpen/>
        </MainRightPane>
        
    </div>
  )
}

export default Help
