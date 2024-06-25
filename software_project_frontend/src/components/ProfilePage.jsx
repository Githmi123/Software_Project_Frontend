import React from 'react';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import axios from "axios";
import image from "../images/image.png";
import { Button, CircularProgress, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import setting from "../images/settings.png";


import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem
} from 'mdb-react-ui-kit';
import refreshAccessToken from '../services/AuthService';
import InputFileUploadButton from './Buttons/InputFileUploadButton';
import InputImageButton from './Buttons/InputImageButton';
import { useSnackbar } from 'notistack';

export default function ProfilePage() {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [designation, setDesignation] = useState("");
  const [email, setEmail] = useState("");
  const [preEmail, setPreEmail] = useState("");
  const [imageSRC, setImageSRC] = useState(image);
  const [profileData, setProfileData] = useState("");
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [emailChanged, setEmailChanged] = useState(false);
  const [taken, setTaken] = useState(false);

  const [tempFirstName, setTempFirstName] = useState("");
  const [tempLastName, setTempLastName] = useState("");
  const [tempDesignation, setTempDesignation] = useState("");

  const {enqueueSnackbar} = useSnackbar();
  const navigate = useNavigate();

  const handleEdit = () => {
    setEdit(true);
  };

  const handleEmailChange = (newEmail) => {
    console.log('Pre Email:', preEmail);
    console.log('Current Email:', email);
    console.log('New Email:', newEmail);
    
    if (newEmail !== preEmail) {
      setEmail(newEmail);
      setEmailChanged(true);
      console.log('Email changed:', newEmail);
    } else {
      if(taken){
        setEmailChanged(false);
        setTaken(false);
      console.log('Email not changed:', newEmail);
      }
      else{
        setEmail(preEmail);
      // Email is not changed
      setEmailChanged(false);
      console.log('Email not changed:', newEmail);
      }
      
    }
  }
  
  

  const save = async () => {
    setLoading(true);
    const data = {firstName: firstName,
      lastName: lastName,
      designation: designation
    }
    const response = await axios.post("http://localhost:3500/user", data);
    // setEdit(true);
    setTempFirstName(firstName);
    setTempLastName(lastName);
    setTempDesignation(designation);
    if (emailChanged) {
      await handleSaveEmail(); // Call handleSaveEmail if email has changed
      setEmailChanged(false); // Reset emailChanged flag
    }
    setEdit(false);
    setLoading(false);
    
  };

  const handleSaveEmail = async () => {
    try{
      setLoading(true);
    const response = await axios.put("http://localhost:3500/user", {newmail: email});

    console.log("saved : ", response.data);
    setLoading(false);
    // setEdit(false);
    enqueueSnackbar('Email changed. Please log in again.', { variant: 'warning' });
    navigate('/');
    }
    
    catch(error){
      if (error.response && error.response.status === 409) {
        setLoading(false);
        setTaken(true);
        setEmail(preEmail);
        setEdit(true);
        enqueueSnackbar('This email is already taken!', { variant: 'error' });
      } else {
        setLoading(false);
        // setLoading(false);
        setEdit(true);
        setEmail(preEmail);
        enqueueSnackbar('Failed to edit profile. Please enter all the details', { variant: 'error' }); 
      }
    }
  };

  const handleSave = async() => {
    try {
      // await refreshAccessToken();
      await save();

      
      
    } catch (error) {
      if(error.response && error.response.status === 401){
        const newAccessToken = await refreshAccessToken();
        console.log("New access token: ", newAccessToken);

        if(newAccessToken){
          try {
            // await refreshAccessToken();
            await save();
            enqueueSnackbar('Profile edited successfully!', { variant: 'success' });
          } catch (error) {
            console.error("Error saving data:", error);
            setLoading(false);
            enqueueSnackbar('Failed to edit profile. Please enter all the details', { variant: 'error' });            
          }
        }
      }
      else{
        console.error("Error saving data:", error);
        setLoading(false);
        enqueueSnackbar('Failed to edit profile. Please enter all the details', { variant: 'error' }); 
      }
    }
  };


  const getData = async () => {
    setLoading(true);
    const response = await axios.get("http://localhost:3500/user");
    setProfileData(response.data);
    console.log("profile data : ", response.data);
    setEmail(response.data.email);
    setPreEmail(response.data.email);
    setLoading(false);
  }

  useEffect(() => {
    async function getProfileData() {
      try {
        // await refreshAccessToken();
        await getData();
        
      } catch (error) {
        if(error.response && error.response.status === 401){
          const newAccessToken = await refreshAccessToken();
          console.log("New access token: ", newAccessToken);
  
          if(newAccessToken){
            try {
              // await refreshAccessToken();
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
    }
    getProfileData();
  }, []);


  const getData2 = async () => {
    setLoading(true);
    console.log("Fetching data");
    // await refreshAccessToken();
    console.log("after refresh");
    const userResponse = await axios.get(
      "http://localhost:3500/user"
    );
    const user = userResponse.data;

    setFirstName(user.firstName);
    setLastName(user.lastName);
    setDesignation(user.designation);
    setTempFirstName(user.firstName);
    setTempLastName(user.lastName);
    setTempDesignation(user.designation);
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
            await getData2();
            // {
            //   const imageBytes = new Uint8Array(user.profilepic.image.data);
            //   const blob = new Blob([imageBytes], { type: 'image/jpeg' }); // Adjust the type as per your image format
            //   const imageURL = URL.createObjectURL(blob);
            
            //   console.log(imageURL);
            // }
          } catch (error) {
            if(error.response && error.response.status === 401){
              const newAccessToken = await refreshAccessToken();
              console.log("New access token: ", newAccessToken);
      
              if(newAccessToken){
                try {
                  // await refreshAccessToken();
                  await getData2();
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
      }, [email]);


      const handleProfilePicChange = async (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append("image", file);
    
        try {
          setLoading(true);
          const response = await axios.post("http://localhost:3500/user/profile", formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });

          window.location.reload();
        console.log(response.data);
    
          if (response.data.profilePicUrl) {
            setImageSRC(response.data.profilePicUrl);
          }
          if (response.data.profilePicUrl) {
            setImageSRC(response.data.profilePicUrl);
          }
    
          setLoading(false);
          enqueueSnackbar('Profile picture successfully changed!', { variant: 'success' });
          
        } catch (error) {
          console.error("Error uploading profile picture:", error);
          setLoading(false);
          enqueueSnackbar('Failed to change profile picture', { variant: 'error' });
        }
      };

      
  return (
    <section style={{ backgroundColor: 'transparent'}}>
      <MDBContainer style={{ flexDirection:"column", justifyContent:"center", display:"flex", height:"100%", alignContent:"flex-start", margin:"0" }}>
      {/* <Button
          id = "back-button"
          startIcon={<ArrowBackIcon />}
          onClick={() => window.history.back()}
        >
          Back
        </Button>
        <h1 id="heading">My Profile</h1> */}
        <div id="setting-title-container">
          {/* <img src={setting} id="setting-image" /> */}
          <div id="setting-titles">
            <h3 id="settings-title">Hello, {tempFirstName}!</h3>
            <h5 id="settings-sub-title">
            Manage your personal information and preferences.
            </h5>
            <p id="setting-para">
            Edit and maintain your personal details for optimal service.
            </p>
          </div>
        </div>
        <h6 id="heading" color='black' fontWeight= "bolder" style={{marginTop:"20px"}}>Basic Information</h6>

        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src={imageSRC}
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '150px' }}
                  fluid />
                  {loading ? (
            <div style={{display:"flex", justifyContent: "center"}}><CircularProgress/></div>
          ):
                <p className="text-muted mb-1">{tempFirstName} {tempLastName}</p>
        }
                <p className="text-muted mb-4">{tempDesignation}</p>
        
                <div className="d-flex justify-content-center mb-2">
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleProfilePicChange} 
                    style={{ display: 'none' }} 
                    id="upload-profile-pic" 
                  />
                  <label htmlFor="upload-profile-pic">
                    <InputImageButton onFileSelect={handleProfilePicChange} text = "Change Profile Picture"/> 
                    {/* <MDBBtn>Change Profile Picture</MDBBtn> */}
                  </label>
                </div>
              </MDBCardBody>
            </MDBCard>

            
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>First Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    {edit ? ( <TextField id="standard-basic" defaultValue={`${firstName}`} variant="standard" onChange={(e) => setFirstName(e.target.value)}/> ):(<MDBCardText className="text-muted">{firstName}</MDBCardText>)}
                  {/**/}
                    
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Last Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    {edit ? ( <TextField id="standard-basic" defaultValue={`${lastName}`} variant="standard" onChange={(e) => setLastName(e.target.value)}/> ):(<MDBCardText className="text-muted">{lastName}</MDBCardText>)}
                  {/**/}
                    
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                  {edit ? ( <TextField id="standard-basic" defaultValue={`${email}`} variant="standard" onChange={(e) => handleEmailChange(e.target.value)}/> ):(<MDBCardText className="text-muted">{email}</MDBCardText>)}
                    
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Designation</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                  {edit ? ( <TextField id="standard-basic" defaultValue={`${designation}`} variant="standard" onChange={(e) => setDesignation(e.target.value)}/> ):(<MDBCardText className="text-muted">{designation}</MDBCardText>)}
                    
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                {edit ? ('') : (<Button style={{backgroundColor:"#4169E1", color:"white", fontSize:"10px", width:"auto" }} onClick={handleEdit}>Edit Profile</Button>)}
                  
                  {/* <MDBBtn style={{width:"auto"}} >Edit Profile</MDBBtn> */}
                  {edit ? (<Button style={{backgroundColor:"#4169E1", color:"white", fontSize:"10px", width:"auto" }} onClick={handleSave}>Save</Button>) : ("")}
                  {/* <MDBCol sm="3">
                    <MDBCardText>Mobile</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">(098) 765-4321</MDBCardText>
                  </MDBCol> */}
                {/* </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Address</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">Bay Area, San Francisco, CA</MDBCardText>
                  </MDBCol> */}
                </MDBRow>
              </MDBCardBody>
            </MDBCard>

            
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}