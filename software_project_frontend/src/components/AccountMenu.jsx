import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import image from "../images/image.png";
import refreshAccessToken from '../services/AuthService';
import './AccountMenu.css';

export default function AccountMenu() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [designation, setDesignation] = useState("");
  const [imageSRC, setImageSRC] = useState(image);
  const [selectedOption, setSelectedOption] = useState("");
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [loading, setLoading] = useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfile = () => {
    navigate("/UserProfile");
  };

  const logout = async () => {
    setLoading(true);
    console.log("Logging out");


    await axios.get("http://localhost:3500/logout", { withCredentials: true });

    console.log("Deleting access token");
    delete axios.defaults.headers.common['Authorization'];
    console.log("Deleted access token");
  navigate("/");
  setLoading(false);
  }

  const handleLogout = async () => {
    try{
      await logout();
    } catch(error){
      if(error.response && error.response.status === 401){
        const newAccessToken = await refreshAccessToken();
        console.log("New access token: ", newAccessToken);

        if(newAccessToken){
          try {
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
    

  }

  const getData = async () => {
    setLoading(true);
    const userResponse = await axios.get(
      "http://localhost:3500/user"
    );
    const user = userResponse.data;

    setFirstName(user.firstName);
    setLastName(user.lastName);
    setDesignation(user.designation);
    console.log(user);

    if(user.profilepic)
      {
        setImageSRC(user.profilepic);
      }
    setLoading(false);
  }


  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data");


        await getData();

      
      } catch (error) {
        if(error.response && error.response.status === 401){
          const newAccessToken = await refreshAccessToken();
          console.log("New access token: ", newAccessToken);

          if(newAccessToken){
            try { 
        
              await getData();
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

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Typography sx={{ minWidth: 90 }}></Typography>
        <Typography sx={{ minWidth: 90, color: "black" }}></Typography>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>
              <img
                src={imageSRC}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
              />
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            width: "auto",
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mb: 20,
            "& .MuiAvatar-root": {
              width: 40,
              height: "auto",
              ml: 0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "relative",
              width: 0,
              height: "auto",
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "bottom" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <div
          className="account-menu"
          
        >
          
          <Typography id = "account-name">
            {firstName} {lastName}
          </Typography>
          <Typography id = "designation-in-menu">{designation}</Typography>
        </div>

        <Divider />
        <MenuItem onClick={handleProfile}>
        <Tooltip title = "Profile" arrow>
          <img
            src={imageSRC}
            style={{
              width: "25px",
              height: "25px",
              objectFit: "cover",
              borderRadius: "50%",
            }}
            alt="Avatar"
          />
          </Tooltip>
          <div style={{ width: "10px" }} />
          
          <div className="profile-text">Profile</div>

          
          
        </MenuItem>
        <MenuItem onClick={handleLogout}>
        <Tooltip title = "Log Out" arrow>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          </Tooltip>
          <div className="profile-text">Log Out</div>
          
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
