import React, { useState, useEffect } from "react";
import "./UserProfileRightPane.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CustomButton from "../Buttons/CustomButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import refreshAccessToken from "../../services/AuthService";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export const UserProfileRightPane = () => {
  const [profileData, setProfileData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    designation: "",
  });
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    const response = await axios.get("http://localhost:3500/user");
    setProfileData(response.data);
    console.log("profile data : ", response.data);
    setLoading(false);
  };

  useEffect(() => {
    async function getProfileData() {
      try {
        await getData();
      } catch (error) {
        if (error.response && error.response.status === 401) {
          const newAccessToken = await refreshAccessToken();
          console.log("New access token: ", newAccessToken);

          if (newAccessToken) {
            try {
              await getData();
            } catch (error) {
              console.error("Error fetching data:", error);
            }
          }
        } else {
          console.error("Error fetching data:", error);
        }
      }
    }
    getProfileData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevProfileData) => ({
      ...prevProfileData,
      [name]: value,
    }));
  };

  const handleCancel = (event) => {
    navigate("");
  };

  const save = async () => {
    setLoading(true);
    const body = {
      newmail: profileData.email,
    };
    const response = await axios.put("http://localhost:3500/user", body);
    console.log("Finished sending request");

    console.log("new profile data :", profileData);
    setLoading(false);
  };

  const handleChangeEmail = async (e) => {
    try {
      console.log("Started requesting to change email");

      await save();

      console.log("Trying to save email");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        const newAccessToken = await refreshAccessToken();
        console.log("New access token: ", newAccessToken);

        if (newAccessToken) {
          try {
            await save();
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        }
      } else {
        console.error("Error fetching data:", error);
      }
    }
  };

  const navigate = useNavigate();

  const save2 = async () => {
    setLoading(true);
    const response = await axios.post(
      "http://localhost:3500/user",
      profileData
    );
    console.log("Finished sending request");
    handleChangeEmail();
    navigate("/Dashboard");
    console.log("new profile data :", profileData);
    setLoading(false);
  };

  const handleSave = async (e) => {
    try {
      console.log("Trying to save details");
      await save2();
    } catch (error) {
      if (error.response && error.response.status === 401) {
        const newAccessToken = await refreshAccessToken();
        console.log("New access token: ", newAccessToken);

        if (newAccessToken) {
          try {
            await save2();
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        }
      } else {
        console.error("Error fetching data:", error);
      }
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "left",
        }}
      >
        <h2
          style={{
            fontSize: "15px",
            marginLeft: "1vw",
            color: "black",
          }}
        >
          First Name
        </h2>
        <TextField
          hiddenLabel
          id="filled-hidden-label-small"
          variant="filled"
          placeholder={profileData.firstName}
          name="firstName"
          value={profileData.firstName}
          onChange={handleChange}
          sx={{
            marginTop: 0,
            "& input": {
              fontSize: "1rem",
              padding: "8px 12px",
            },
          }}
        />

        <h2
          style={{
            fontSize: "15px",
            marginLeft: "1vw",
            color: "black",
            marginTop: "1.5vh",
          }}
        >
          Last Name
        </h2>
        <TextField
          hiddenLabel
          id="filled-hidden-label-small"
          variant="filled"
          placeholder={profileData.lastName}
          name="lastName"
          value={profileData.lastName}
          onChange={handleChange}
          sx={{
            marginTop: 0,
            "& input": {
              fontSize: "1rem",
              padding: "8px 12px",
            },
          }}
        />

        <h2
          style={{
            fontSize: "15px",
            marginLeft: "1vw",
            color: "black",
            marginTop: "1.5vh",
          }}
        >
          Email
        </h2>
        <TextField
          hiddenLabel
          id="filled-hidden-label-small"
          variant="filled"
          placeholder={profileData.email}
          name="email"
          value={profileData.email}
          onChange={handleChange}
          sx={{
            "& input": {
              fontSize: "1rem",
              padding: "8px 12px",
            },
          }}
        />

        <h2
          style={{
            fontSize: "15px",
            marginLeft: "1vw",
            color: "black",
            marginTop: "1.5vh",
          }}
        >
          Designation
        </h2>
        <TextField
          hiddenLabel
          id="filled-hidden-label-small"
          variant="filled"
          placeholder={profileData.designation}
          name="designation"
          value={profileData.designation}
          onChange={handleChange}
          sx={{
            "& input": {
              fontSize: "1rem",
              padding: "8px 12px",
            },
          }}
        />
        <div
          style={{ display: "flex", justifyContent: "center" }}
          className="userprofile-buttons2"
        >
          <CustomButton
            className="label1-userprofile-left"
            text="Cancel"
            onClick={() => window.history.back()}
            backgroundColor="white"
            textColor="#7894DB"
          />
          <CustomButton
            className="label1-userprofile-left"
            text="Save"
            onClick={handleSave}
            backgroundColor="#7894DB"
            textColor="white"
          />
        </div>
      </div>
    </div>
  );
};
