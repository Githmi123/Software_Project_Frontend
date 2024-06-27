import React, { useState, useEffect } from "react";
import MainLeftPane from "../components/MainLeftPane/MainLeftPane";
import MainRightPane from "../components/MainRightPane/MainRightPane";
import {
  Button,
  CircularProgress,
  IconButton,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CustomNewButton from "../components/Buttons/CustomNewButton";

import { Link, useNavigate, useParams } from "react-router-dom";
import refreshAccessToken from "../services/AuthService";
import axios from "axios";
import Cookies from "js-cookie";
import CustomSelect from "../components/Other/CustomSelect";
import "../styles/BatchesPage.css";
import { Delete, Edit } from "@mui/icons-material";
import { useSnackbar } from "notistack";

const BatchesPage = () => {
  const { selectedModuleCode } = useParams();
  const [batches, setBatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const [userOptions, setUserOptions] = useState([]);
  const [moduleData, setModuleData] = useState(null);
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const handleEditModule = async (modulecode) => {
    navigate(`/EditBatch/${selectedModuleCode}/$`);
  };

  const handleDeleteModule = async (modulecode) => {
    navigate(`/DeleteModule/${modulecode}`);
  };

  const getData = async () => {
    setIsLoading(true);
    const response = await axios.get(
      `${baseUrl}/batch/${selectedModuleCode}`
    );
    setBatches(response.data);
    console.log("batches", response.data);

    setIsLoading(false);
  };

  useEffect(() => {
    async function fetchData() {
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

    fetchData();
  }, []);

  const handleNewBatch = (event) => {};

  const handleSelectedBatch = (batch) => {
    setBatches(batch);
  };

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
          profilePicture: user.profilepic,
        }));
        setUserOptions(userOptions);
        console.log(userOptions);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAllUsers();
  }, []);

  const handleUserChange = (e) => {
    setSelectedUser(e.target.value);
    console.log("Selected user email:", e.target.value);
  };

  const getModuleData = async () => {
    setLoading(true);

    const moduleResponse = await axios.get(
      `${baseUrl}/modules`
    );

    const module = moduleResponse.data.find(
      (module) => module.modulecode === selectedModuleCode
    );
    setModuleData(module);
    setLoading(false);
  };

  useEffect(() => {
    const fetchModuleData = async () => {
      try {
        await getModuleData();
      } catch (error) {
        if (error.response && error.response.status === 401) {
          const newAccessToken = await refreshAccessToken();
          console.log("New access token: ", newAccessToken);

          if (newAccessToken) {
            try {
              await getModuleData();
            } catch (error) {
              console.error("Error fetching data:", error);
            }
          }
        } else {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchModuleData();
  }, [selectedModuleCode]);

  const submit = async () => {
    setLoading(true);
    try {
      console.log(moduleData.modulecode);
      const response = await axios.post(
        `http://localhost:3500/modules/view/${moduleData.modulecode}/user`,
        { usertoAdd: selectedUser }
      );

      setLoading(false);

      if (response.status === 200) {
        console.log("User added to module!");
        enqueueSnackbar("User added successfully!", {
          variant: "success",
        });
        navigate("/MyModulePage");
      } else if (response.status === 201) {
        console.log("User already exists in the module!");
        enqueueSnackbar("User is already in the module.", {
          variant: "info",
        });
      } else {
        console.warn("Unexpected status code:", response.status);
        enqueueSnackbar("An unexpected error occurred.", {
          variant: "error",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);

      if (error.response) {
        if (error.response.status === 401) {
          enqueueSnackbar("Unauthorized access. Please log in again.", {
            variant: "error",
          });
        } else if (error.response.status === 404) {
          enqueueSnackbar("User not found.", {
            variant: "error",
          });
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
            if (error.response && error.response.status === 409) {
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
  };

  return (
    <div className="align1">
      <MainRightPane>
        <Button
          id="back-button"
          startIcon={<ArrowBackIcon />}
          onClick={() => window.history.back()}
        >
          Back
        </Button>

        <h1 id="heading">
          {moduleData ? (
            <>
              {moduleData.modulecode} - {moduleData.modulename}
            </>
          ) : (
            "Loading..."
          )}
        </h1>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginTop: "3vh",
          }}
        >
          <Link to={`/NewBatchPage/${selectedModuleCode}`}>
            <CustomNewButton text="New Batch" />
          </Link>
        </div>

        <div className="column">
          {isLoading ? (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </div>
          ) : batches.length === 0 ? (
            <Typography>No batches available.</Typography>
          ) : (
            batches.map((batch) => (
              <Button
                variant="contained"
                className="batch-button"
                style={{
                  position: "relative",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={() => {
                  navigate(`/Assignments/${selectedModuleCode}/${batch.batch}`);
                }}
              >
                <span>{batch.batch}</span>
                <div
                  className="icon-container"
                  style={{
                    position: "absolute",
                    right: "10px",
                    display: "flex",
                    gap: "8px",
                  }}
                >
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    onClick={(event) => {
                      event.stopPropagation();
                      navigate(
                        `/EditBatch/${selectedModuleCode}/${batch.batch}`
                      );
                    }}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={(event) => {
                      event.stopPropagation();
                      navigate(
                        `/DeleteBatch/${selectedModuleCode}/${batch.batch}`
                      );
                    }}
                  >
                    <Delete />
                  </IconButton>
                </div>
              </Button>
            ))
          )}
        </div>

        <div id="add-user-section">
          <h2
            style={{
              fontSize: "19px",
              marginLeft: "35px",
              marginTop: "5vh",
              color: "black",
            }}
          >
            Add New Lecturer
          </h2>

          <div id="user-div">
            <div>
              <CustomSelect
                label="User"
                value={selectedUser}
                onChange={handleUserChange}
                // options={userOptions.map((option) => ({
                //   key: option.key,
                //   value: option.value,
                //   label: option.label,
                // }))}
                options={userOptions.map((option) => ({
                  key: option.key,
                  value: option.value,
                  label: (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      {option.profilePicture && (
                        <img
                          src={option.profilePicture}
                          alt="Profile"
                          style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "50%",
                            marginRight: "8px",
                          }}
                        />
                      )}
                      {option.label}
                    </div>
                  ),
                }))}
              />
            </div>

            <Button
              data-testid="save-button"
              onClick={handleSubmit}
              sx={{
                width: "5vw",
                marginLeft: "15px",
                marginTop: "1vh",
                color: "#7894DB",
                backgroundColor: "white",
                border: "1px solid #7894DB",
                "&:hover": { backgroundColor: "#7894DB", color: "white" },
                marginBottom: "15px ",
              }}
            >
              Add
            </Button>
          </div>
        </div>
      </MainRightPane>
    </div>
  );
};

export default BatchesPage;
