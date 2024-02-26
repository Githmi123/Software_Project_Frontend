import React from 'react'
import '../MainLeftPane/MainLeftPane.css'
import projectlogo from '../../images/rs.png'
import ButtonSet from '../ButtonSet/ButtonSet'



const MainLeftPane = () => {
  return (
    <div className='maindiv-left'>
        
        <img src={projectlogo}/>
        <ButtonSet/>
        

    </div>
  )
}

export default MainLeftPane
