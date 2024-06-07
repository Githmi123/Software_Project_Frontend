import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import refreshAccessToken from "../../services/AuthService";
import Cookies from "js-cookie";
import axios from "axios";
import "./UserProfileBar.css";
import Select from "react-select";

function UserProfileBar() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [designation, setDesignation] = useState("");
  const [imageSRC, setImageSRC] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [loading, setLoading] = useState(false);
  const space = "    ";

  const navigate = useNavigate();

  const handleProfile = () => {
    navigate("/UserProfile");
  };

  const logout = async () => {
    setLoading(true);
    console.log("Loggings out");

    await axios.get("http://localhost:3500/logout", { withCredentials: true });

    console.log("Deleting access token");
    delete axios.defaults.headers.common['Authorization'];
    console.log("Deleted access token");
    navigate("/");
    setLoading(false);
  }

  const handleLogin = async () => {
    try {
      // await refreshAccessToken();
      await logout();
      
    } catch (error) {
      if(error.response && error.response.status === 401){
        const newAccessToken = await refreshAccessToken();
        console.log("New access token: ", newAccessToken);

        if(newAccessToken){
          try {
            // await refreshAccessToken();
            await logout();
          } catch (error) {
            console.error("Error logging out:", error);
          }
        }
      }
      else{
        console.error("Error logging out:", error);
      }
      
    }
  };

  const getData = async () => {
    setLoading(true);
    console.log("Fetching data");
        // await refreshAccessToken();
        console.log("after refresh");
        const userResponse = await axios.get("http://localhost:3500/user");
        const user = userResponse.data;

        setFirstName(user.firstname);
        setLastName(user.lastname);
        setDesignation(user.designation);
        console.log(user);

        if (
          user.profilepic &&
          user.profilepic.image &&
          user.profilepic.image.data
        ) {
          const imageBytes = new Uint8Array(user.profilepic.image.data);
          const blob = new Blob([imageBytes], { type: "image/jpeg" }); // Adjust the type as per your image format
          const imageURL = URL.createObjectURL(blob);
          setImageSRC(imageURL);
          console.log(imageURL);
        }

        setLoading(false);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getData();
      } catch (error) {
        if(error.response && error.response.status === 401){
          const newAccessToken = await refreshAccessToken();
          console.log("New access token: ", newAccessToken);
  
          if(newAccessToken){
            try {
              // await refreshAccessToken();
              await logout();
            } catch (error) {
              console.error("Error fetching data:", error);
            }
          }
        }
        else{
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, []);

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    console.log(selectedValue);

    if (selectedValue === "Option 1") {
      handleProfile();
    } else if (selectedValue === "Option 2") {
      handleLogin();
    }
  };

  return (
    <div className="profilebar">
      <img src={imageSRC} style={{ height: "8vh", marginLeft: "1vw" }} />
      <div id="barText" style={{ width: "10vw" }}>
        {" "}
        {firstName} {lastName}{" "}
      </div>

      <div>
        <label htmlFor="option"></label>
        <select
          id="options"
          value={selectedOption}
          onChange={handleChange}
          style={{
            alignContent: "center",
            width: "11vw",
            height: "11vh",
            padding: "2vw 1vh",
          }}
          menuPlacement="top"
        >
          <option value="Please Choose an option"></option>
          <option value="Option 1">My Profile</option>
          <option style={{ height: "10vh" }} value="Option 2">
            Log Out
          </option>
        </select>
      </div>
    </div>
  );
}

export default UserProfileBar;
