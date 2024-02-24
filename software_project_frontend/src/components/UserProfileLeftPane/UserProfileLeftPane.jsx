import React from 'react';
import './UserProfileLeftPane.css';
import ring from '../../images/ring.png'
import user1 from '../../images/user1.png'
import stars from '../../images/stars.png'

export const UserProfileLeftPane = () => {
    return(
        <div className="LeftPane">
            
            <div id='container1'>
                
                <div id='ringcontainer'>
                    <img src={ring} id='ring'></img>
                    <img src={user1} id = 'user1'></img>
                    
            
                </div>
                <div id='text'>
                    <h1 >Helllo David !</h1>
                    <p>Driving excellence in education with cutting-edge technology</p>
                    
                </div>
                <button className="greytext">
                    <i className="fas fa-pencil-alt"></i> 
                    
                    <span>Edit Profile</span>
                </button>

                
                
            


            </div>
            
            <div id='container2'>
                <h2>DAVID PERERA</h2>
                <span className='greytext'>Senior Lecturer</span>
                <i className="fas fa-envelope"></i>
                <span className='greytext'>davidperera123@gmail.com</span>
                <i className="fas fa-phone-alt"></i>
                <span className='greytext'>+94772452625</span>
                <i className="fas fa-map-marker-alt"></i>
                <span className='greytext'>No. 47/220, Lake street,
                    Colombo 07</span>
                

            </div>
            <img src={stars} id = 'stars'></img>
            

        </div>
    )
}