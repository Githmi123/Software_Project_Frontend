import React, { useState, useEffect } from "react";
import MainLeftPane from "../components/MainLeftPane/MainLeftPane";
import MainRightPane from "../components/MainRightPane/MainRightPane";
import { Button, CircularProgress, TextField, colors } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import Cookies from "js-cookie";

import CustomSelect from "../components/Other/CustomSelect";


import "../styles/MyModulesPage.css";
import { Link, useNavigate } from "react-router-dom";
import refreshAccessToken from "../services/AuthService";
import { useSnackbar } from "notistack";

const NewModule = () => {
  const [moduleData, setModuleData] = useState({
    modulecode: "",
    modulename: "",
    credits: "",
  });
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [selectedUser, setSelectedUser] = useState("");
  const [userOptions, setUserOptions] = useState([]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        await refreshAccessToken();

        const userResponse = await axios.get("http://localhost:3500/user/all");
        const users = userResponse.data;
        console.log("useres", users);

        const userOptions = users.map((user) => ({
          key: user.userid,
          value: user.email,
          label: user.firstname + " " + user.lastname,
        }));
        setUserOptions(userOptions);
        console.log(userOptions);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAllUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setModuleData({
      ...moduleData,
      [name]: value,
    });
  };

  const handleUserChange = (e) => {
    setSelectedUser(e.target.value);
    console.log("Selected user email:", e.target.value);
  };

  const navigate = useNavigate();

  const submit = async () => {
    setLoading(true);
    try {
      // Create module
      await axios.post("http://localhost:3500/modules", moduleData);
      console.log("Module is created!", moduleData);

      console.log(moduleData.modulecode);
      await axios.post(
        `http://localhost:3500/modules/view/${moduleData.modulecode}/user`,
        { usertoAdd: selectedUser }
      );
      console.log("User added to module!");

      setLoading(false);
      navigate("/MyModulePage");
      enqueueSnackbar("Module created successfully and user added!", {
        variant: "success",
      });
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);

      if (error.response) {
        if (error.response.status === 401) {
          enqueueSnackbar("Unauthorized access. Please log in again.", {
            variant: "error",
          });
        } else if (error.response.status === 409) {
          enqueueSnackbar("Module already exists.", { variant: "error" });
        } else if (error.response.status === 404) {
          enqueueSnackbar("User not found.", { variant: "error" });
        } else {
          enqueueSnackbar("An error occurred while processing the request.", {
            variant: "error",
          });
        }
      } else {
        enqueueSnackbar("An error occurred. Please try again later.", {
          variant: "error",
        });
      }
    }
  };

  const handleSubmit = async (e) => {
    if (
      moduleData.modulecode === "" ||
      moduleData.modulename === "" ||
      moduleData.credits === ""
    ) {
      enqueueSnackbar("Please enter all the details.", { variant: "error" });
    } else {
      e.preventDefault();
      try {
        await submit();
      } catch (error) {
        if (error.response && error.response.status === 401) {
          const newAccessToken = await refreshAccessToken();
          console.log("New access token: ", newAccessToken);


          if (newAccessToken) {
            try {
              // await refreshAccessToken();
              await submit();
            } catch (error) {
              // if (error.response && error.response.status === 400) {
              //   setLoading(false);
              //   // enqueueSnackbar('Please enter all the details.', { variant: 'error' });
              // }

              if (error.response && error.response.status === 409) {
                setLoading(false);
                enqueueSnackbar("Module already exists.", { variant: "error" });
              } else {
                setLoading(false);
                console.error("Error fetching data:", error);
                enqueueSnackbar(
                  "An error occurred while creating the module.",
                  { variant: "error" }
                );
              }

            }
          }
        } else if (error.response && error.response.status === 409) {
          setLoading(false);
          enqueueSnackbar("Module already exists.", { variant: "error" });
        } else {
          setLoading(false);
          console.error("Error fetching data:", error);
          enqueueSnackbar("An error occurred while creating the module.", {
            variant: "error",
          });
        }
      }
    }
  };

  return (
    <div className="align1">
      <MainRightPane>
        <Button
          sx={{
            // m: 2,
            width: "100px",
            height: "50px",
            color: "black",
            fontWeight: "bold",
            marginBottom: "2vh",
          }}
          startIcon={<ArrowBackIcon />}
          onClick={() => window.history.back()}
        >
          Back
        </Button>

        <div className="alignment">
          <h2
            style={{
              fontSize: "19px",
              marginLeft: "35px",
              marginTop: "5vh",
              color: "black",
            }}
          >
            Module Code
          </h2>
          <TextField
            hiddenLabel
            id="filled-hidden-label-small"
            variant="filled"
            placeholder="Module Code"
            name="modulecode"
            value={moduleData.modulecode}
            onChange={handleChange}
            style={{ width: "max-width" }}
            sx={{
              marginLeft: 5,
              marginTop: 0,
              marginRight: 5,
              "& input": {
                fontSize: "1rem",
                padding: "8px 12px",
              },
            }}
          >
            Module Code
          </TextField>

          <h2
            style={{
              fontSize: "19px",
              marginLeft: "35px",
              marginTop: "5vh",
              color: "black",
            }}
          >
            Module Name
          </h2>
          <TextField
            hiddenLabel
            id="filled-hidden-label-small"
            variant="filled"
            placeholder="Module Name"
            name="modulename"
            value={moduleData.modulename}
            onChange={handleChange}
            style={{ width: "max-width" }}
            sx={{
              marginLeft: 5,
              marginTop: 0,
              marginRight: 5,
              "& input": {
                fontSize: "1rem",
                padding: "8px 12px",
              },
            }}
          >
            Module Name
          </TextField>

          <h2
            style={{
              fontSize: "19px",
              marginLeft: "35px",
              marginTop: "5vh",
              color: "black",
            }}
          >
            Credits
          </h2>
          <TextField
            hiddenLabel
            id="filled-hidden-label-small"
            variant="filled"
            placeholder="Credits"
            name="credits"
            value={moduleData.credits}
            onChange={handleChange}
            style={{ width: "max-width" }}
            sx={{
              marginLeft: 5,
              marginTop: 0,
              marginRight: 5,
              "& input": {
                fontSize: "1rem",
                padding: "8px 12px",
              },
            }}
          >
            Credits
          </TextField>

          {/* <span id="add-user-label">Add User</span> */}
          <h2
            style={{
              fontSize: "19px",
              marginLeft: "35px",
              marginTop: "5vh",
              color: "black",
            }}
          >
            Add User
          </h2>
          <div id="user-div-center">
            <div>
              <CustomSelect
                label="User"
                value={selectedUser}
                onChange={handleUserChange}
                options={userOptions.map((option) => ({
                  key: option.key,
                  value: option.value,
                  label: option.label,
                }))}
              />
            </div>
          </div>

          <div
            style={{
              marginTop: "50px",
              display: "flex",
              justifyContent: "center",
            }}
          >
         
            <Link to="/MyModulePage" style={{ textDecoration: "none" }}>
              <Button
                sx={{
  
                  color: "#7894DB",
                  backgroundColor: "white",
                  border: "1px solid #7894DB",
                  "&:hover": { backgroundColor: "#7894DB", color: "white" },
                  marginBottom:"15px "
                }}
              >
                Cancel
              </Button>
            </Link>

            <Button
              data-testid="save-button"
              onClick={handleSubmit}
              sx={{
                marginLeft: "15px",
                color: "#7894DB",
                backgroundColor: "white",
                border: "1px solid #7894DB",
                "&:hover": { backgroundColor: "#7894DB", color: "white" },
                marginBottom:"15px "
              }}
            >
              Save
            </Button>
          </div>
          {loading && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </div>
          )}
        </div>
      </MainRightPane>
    </div>
  );
};

export default NewModule;