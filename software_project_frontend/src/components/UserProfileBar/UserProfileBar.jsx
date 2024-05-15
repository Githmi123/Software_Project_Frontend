import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import refreshAccessToken from '../../services/AuthService';
import Cookies from "js-cookie";
import axios from "axios";
import "./UserProfileBar.css"

function UserProfileBar() {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [designation, setDesignation] = useState("");
  const [imageSRC, setImageSRC] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const space = "    ";

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("You are here");
        // await refreshAccessToken();
        console.log("after refresh");
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
        console.log(user);

        if(user.profilepic && user.profilepic.image && user.profilepic.image.data)
        {
          const imageBytes = new Uint8Array(user.profilepic.image.data);
          const blob = new Blob([imageBytes], { type: 'image/jpeg' }); // Adjust the type as per your image format
          const imageURL = URL.createObjectURL(blob);
          setImageSRC(imageURL);
          console.log(imageURL);
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
      <img src = {imageSRC} style={{height: "8vh"}}/>
      <div id = "barText" style={{width: "10vw"}}> {firstName} {lastName} </div>

      <div>
        <label htmlFor='option'></label>
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
