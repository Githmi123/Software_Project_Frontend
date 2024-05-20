import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import axios from "axios";
import image from "../images/image.png";

export default function AccountMenu() {
  const [firstName, setFirstName] = useState("ABC");
  const [lastName, setLastName] = useState("Perera");
  const [designation, setDesignation] = useState("Lecturer");
  const [imageSRC, setImageSRC] = useState(image);
  const [selectedOption, setSelectedOption] = useState("");
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfile = () => {
    navigate('/UserProfile');
  }

  const handleLogout = async () => {
    console.log("Logging out");

    await axios.get("http://localhost:3500/logout", {
      headers: {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
    }
  );

  Cookies.remove("accessToken");
  navigate("/");

  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data");
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

        setFirstName(user.firstName);
        setLastName(user.lastName);
        setDesignation(user.designation);
        console.log(user);

        if(user.profilepic)
          {
            setImageSRC(user.profilepic);
          }
        // {
        //   const imageBytes = new Uint8Array(user.profilepic.image.data);
        //   const blob = new Blob([imageBytes], { type: 'image/jpeg' }); // Adjust the type as per your image format
        //   const imageURL = URL.createObjectURL(blob);
        
        //   console.log(imageURL);
        // }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Typography sx={{ minWidth: 90 }}></Typography>
        <Typography sx={{ minWidth: 90, color:"black" }}></Typography>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}><img src = {imageSRC} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}/></Avatar>
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
            width:"30vw",
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: "20vw",
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:"10vh"}}>
          <Typography sx={{color:"black", fontSize:"3vh"}}>{firstName} {lastName}</Typography>
          <Typography>{designation}</Typography>
        </div>
        
        <Divider />
        <MenuItem onClick={handleProfile}>
        
            <img src={imageSRC} style={{ width: '25px', height: '25px', objectFit: 'cover', borderRadius: '50%' }} alt="Avatar" />
            <div style={{width:"10px"}}/>
          Profile
        </MenuItem>
        {/* <MenuItem onClick={handleClose}>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem> */}
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
