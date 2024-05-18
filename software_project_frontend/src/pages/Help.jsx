import React from 'react'
import MainLeftPane from '../components/MainLeftPane/MainLeftPane'
import MainRightPane from '../components/MainRightPane/MainRightPane'
import '../styles/Help.css'
import help from '../images/help.png'

function Help() {
  return (
    <div className = "align1">
        <MainLeftPane/>
        <MainRightPane>
            <div style={{display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"row", margintop:"10vh"}}>
                <h1>Support Center</h1>
                <img src={help} id = "helpImage"/>
            </div>
            
        </MainRightPane>
    </div>
  )
}

export default Help
