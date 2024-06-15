import React from 'react';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import axios from "axios";
import image from "../images/image.png";
import { Button, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";


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

export default function ProfilePage() {

  const [firstName, setFirstName] = useState("ABC");
  const [lastName, setLastName] = useState("Perera");
  const [designation, setDesignation] = useState("Lecturer");
  const [imageSRC, setImageSRC] = useState(image);
  const [profileData, setProfileData] = useState("");
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    const response = await axios.get("http://localhost:3500/user");
    setProfileData(response.data);
    console.log("profile data : ", response.data);
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
      }, []);

      
  return (
    <section style={{ backgroundColor: 'transparent'}}>
      <MDBContainer style={{ justifyContent:"center", display:"flex", height:"100%", alignContent:"flex-start", margin:"0" }}>
      <Button
          sx={{
            // m: 2,
            width: "100px",
            height: "50px",
            color: "black",
            fontWeight: "bold",
            marginBottom: "2vh"
          }}
          startIcon={<ArrowBackIcon />}
          onClick={() => window.history.back()}
        >
          Back
        </Button>
        <h1 id="heading">My Profile</h1>
        <h6 id="heading" color='black' fontWeight= "bolder" style={{fontSize:"3vh"}}>Basic Information</h6>

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
                <p className="text-muted mb-1">{firstName} {lastName}</p>
        }
                <p className="text-muted mb-4">{designation}</p>
        
                <div className="d-flex justify-content-center mb-2">
                  <MDBBtn>Change Profile Picture</MDBBtn>
                  {/* <MDBBtn outline className="ms-1">Message</MDBBtn> */}
                </div>
              </MDBCardBody>
            </MDBCard>

            
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{firstName} {lastName}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{profileData.email}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Designation</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{designation}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBBtn style={{width:"auto"}}>Edit Profile</MDBBtn>
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