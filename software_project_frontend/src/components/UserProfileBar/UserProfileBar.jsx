import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import refreshAccessToken from '../../services/AuthService';
import Cookies from "js-cookie";
import axios from "axios";

function UserProfileBar() {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [designation, setDesignation] = useState("");
  const [imageSRC, setImageSRC] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await refreshAccessToken();
        const userResponse = await axios.get(
          "http://localhost:3500/user",
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("accessToken")}`,
            },
          }
        );
        const user = userResponse.data;

        setFirstName(user.firstname);
        setLastName(user.lastname);
        setDesignation(user.designation);

        if(user.profilepic && user.profilepic.image && user.profilepic.mimetype)
        {
          const image = user.profilepic.image;
          const binaryString = window.atob(image);
          const binaryLength = binaryString.length;
          const bytes = new Uint8Array(binaryLength);
          
          for(let i = 0; i < binaryLength; i++)
          {
            bytes[i] = binaryString.charCodeAt(i);
          }

          const blob = new Blob([bytes], {type: user.profilepic.mimetype});
          const imageURL = URL.createObjectURL(blob);
          setImageSRC(imageURL);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (option) => {
    setSelectedOption(option);

    if(selectedOption == "Option 1")
    {
      navigate('/UserProfile');
    }

    else if(selectedOption == "Option 2")
    {

    }
  }

  return (
    <div id = "profilebar">
      <img src = {imageSRC}/>
      <div>{firstName} {lastName} </div>

      <div>
        <label htmlFor='option'>Here</label>
        <select id = "options" value={selectedOption} onChange={handleChange}>
          <option value="Please Choose an option"></option>
          <option value = "Option 1">My Profile</option>
          <option value = "Option 2">Log Out</option>

        </select>
      </div>
      
    </div>
  )
}

export default UserProfileBar
