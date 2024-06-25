import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import CustomButton from "../Buttons/CustomButton";
import refreshAccessToken from "../../services/AuthService";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import "../ChangePassword/ChangePassword.css";

export const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChangeCurrentPassword = (e) => {
    setCurrentPassword(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleChangeConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };

  const save = async () => {
    setLoading(true);
    if (password === confirmPassword) {
      console.log("Trying to save password");
      const response = await axios.put("http://localhost:3500/user/password", {
        oldPassword: currentPassword,
        newPassword: password,
      });
      console.log("Finished sending request");

      navigate("/Dashboard");

    } else {
      console.log("Please re-enter password correctly");
    }

    setLoading(false);
  };

  const handleSave = async () => {
    try {
      await save();
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
          Current password
        </h2>
        <TextField
          hiddenLabel
          id="filled-hidden-label-small"
          variant="filled"
          type="password"
          name="currentPassword"
          value={currentPassword}
          onChange={handleChangeCurrentPassword}

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
            marginTop: "5vh",
            color: "black",
          }}
        >
          New password
        </h2>
        <TextField
          hiddenLabel
          id="filled-hidden-label-small"
          variant="filled"
          type="password"
          name="password"
          value={password}
          onChange={handleChangePassword}

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
            marginTop: "5vh",
            color: "black",
          }}
        >
          Confirm password
        </h2>
        <TextField
          hiddenLabel
          id="filled-hidden-label-small"
          variant="filled"
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChangeConfirmPassword}
          sx={{
            marginTop: 0,
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
        {loading && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </div>
        )}
      </div>
    </div>
  );
};
