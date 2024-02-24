import React from 'react';
import './UserProfileLeftPane.css';
import ring from '../../images/ring.png'
import user1 from '../../images/user1.png'

export const UserProfileLeftPane = () => {
    return(
        <div className="LeftPane">
            <div id='container'>
                <div id='ringcontainer'>
                    <img src={ring} id='ring'></img>
                    <img src={user1} id = 'user1'></img>
                    
            
                </div>
                <div id='text'>
                    <h1 >Helllo David !</h1>
                    <p>Driving excellence in education with cutting-edge technology</p>
                    
                </div>
                <button id="editProfile">
                    <i className="fas fa-pencil-alt"></i> 
                    
                    <span>Edit Profile</span>
                </button>

                
            
            


            </div>

            <div>
                
            </div>
            

        </div>
    )
}