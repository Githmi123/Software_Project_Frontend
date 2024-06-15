import React from "react";
import MainLeftPane from "../components/MainLeftPane/MainLeftPane";
import MainRightPane from "../components/MainRightPane/MainRightPane";
import "../styles/Help.css";
import help from "../images/help.png";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Fade from "@mui/material/Fade";

import Footer from "../components/Footer/Footer";

function Help() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  return (
    <div className="align1">
      <MainRightPane>
        {/* <div style={{display:"flex", justifyContent: "space-evenly", alignItems:"center", flexDirection:"row", margintop:"10vh", height: "100%"}}>
                <div style={{display:"flex", justifyContent:"center", flexDirection:"column", alignItems:"center", width:"40%"}}>
                    <h1>Support Center</h1>
                    <p style={{color:"black", textAlign:"justify"}}>If you need assistance with uploading, grading, or managing answer scripts, please contact our support team for further guidance. Our goal is to ensure you have a smooth and efficient experience using our system.</p>
                </div>
                
                <img src={help} id = "helpImage"/>
            </div> */}
        <div id="help-backgroud">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h3>Contact Us</h3>
            <h5>We're here to assist you</h5>
          </div>

          <div id="help-support-options">
            <div className="help-support-options-container">
              <div className="help-support-options-circles">
                <ContactMailIcon fontSize="large" color="primary" />
              </div>
              <div className="help-container-paragraph">
                <p className="container-title">Chat</p>
                <p>We’re here.</p>
                <div className="help-contact-detail">
                  <p>rapidscore123@gmail.com</p>
                </div>
              </div>
            </div>
            <div className="help-support-options-container">
              <div className="help-support-options-circles">
                <OndemandVideoIcon fontSize="large" color="primary" />
              </div>
              <div className="help-container-paragraph">
                <p className="container-title">Our Tutorials</p>
                <p>Helpful tutorials</p>
                <div className="help-contact-detail">
                  <p>view on youtube</p>
                </div>
              </div>
            </div>
            <div className="help-support-options-container">
              <div className="help-support-options-circles">
                <AddIcCallIcon fontSize="large" color="primary" />
              </div>
              <div className="help-container-paragraph">
                <p className="container-title">Call Us</p>
                <p>Reach out to us</p>
                <div className="help-contact-detail">
                  <p>(+94 11) 3243 223</p>
                </div>
              </div>
            </div>
          </div>
          <div style={{ backgroundColor: "#ffdd95", marginTop: "5   vh" }}>
            <div id="faq-image-container">
              <div
                id="help-image-container-2"
                // style={{
                //   width: "80%",
                //   alignItems: "center",
                //   display: "flex",
                //   flexDirection: "row",
                //   marginBottom: "5vh",
                // }}
              >
                <div id="faq-image-para">
                  <p id="faq-title">FAQ</p>
                  <p style={{ fontFamily: "Poppins" }}>
                    Have questions? Here you'll find the answers most valued by
                    our partners, along with access to step-by-step instructions
                    and support.
                  </p>
                </div>
                <img src={help} id="helpImage" alt="Help" />
              </div>
            </div>
          </div>
          <Accordion
            expanded={expanded}
            onChange={handleExpansion}
            // slots={{ transition: Fade }}
            slotProps={{ transition: { timeout: 400 } }}
            // sx={{
            //   "& .MuiAccordion-region": { height: expanded ? "auto" : 0 },
            //   "& .MuiAccordionDetails-root": {
            //     display: expanded ? "block" : "none",
            //   },
            // }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography>Custom transition using Fade</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <Typography>Default transition using Collapse</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </MainRightPane>
    </div>
  );
}

export default Help;
