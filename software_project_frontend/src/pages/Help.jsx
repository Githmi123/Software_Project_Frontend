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

  // const handleExpansion = () => {
  //   setExpanded((prevExpanded) => !prevExpanded);
  // };

  const handleExpansion = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
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
        <h3 id="heading">Contact Us</h3>
        <div id="help-backgroud">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* <h3>Contact Us</h3> */}

            {/* <h5>We're here to assist you</h5> */}
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
        <p>apgs@gmail.com</p>
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
        <p>+123 456 7890</p>
      </div>
    </div>
  </div>
</div>

          <div
            id="faq-up"
            style={{
              backgroundColor: "#AFAFAF",
              // marginTop: "5vh",
              width: "100%",
            }}
          >
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
          <div style={{ width: "100%", margin: "auto" }}>
            {" "}
            {/* Adjust width here */}
            <Accordion
              expanded={expanded === "panel1"}
              onChange={handleExpansion("panel1")}
              slotProps={{ transition: { timeout: 400 } }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography>How does the LMS reduce manual grading?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  The LMS uses automated grading algorithms to quickly and
                  accurately assess student submissions, reducing the need for
                  manual grading. Teachers can set up grading rubrics and
                  criteria in advance, allowing the system to handle the bulk of
                  the grading process.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel2"}
              onChange={handleExpansion("panel2")}
              slotProps={{ transition: { timeout: 400 } }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <Typography>
                  How can teachers visualize student performance?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  The LMS provides a range of visualization tools, including
                  charts and graphs, to help teachers analyze student
                  performance. These tools can display data on individual
                  student progress, class averages, and trends over time, making
                  it easier to identify areas where students may need additional
                  support.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel3"}
              onChange={handleExpansion("panel3")}
              slotProps={{ transition: { timeout: 400 } }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3-content"
                id="panel3-header"
              >
                <Typography>
                  What types of assignments can be graded automatically?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  The LMS can automatically grade multiple-choice questions,
                  true/false questions, short answer questions, and even some
                  types of coding assignments. For assignments that require
                  subjective evaluation, such as essays, teachers can use the
                  system to provide guided grading support.
                </Typography>
              </AccordionDetails>
            </Accordion>
            {/* <Accordion
              expanded={expanded === "panel4"}
              onChange={handleExpansion("panel4")}
              slotProps={{ transition: { timeout: 400 } }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel4-content"
                id="panel4-header"
              >
                <Typography>
                  Can teachers customize the grading criteria?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Yes, teachers can customize grading criteria and rubrics for
                  different types of assignments. The LMS allows for detailed
                  configuration of grading parameters, ensuring that the grading
                  process aligns with the teacher's expectations and educational
                  standards.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel5"}
              onChange={handleExpansion("panel5")}
              slotProps={{ transition: { timeout: 400 } }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel5-content"
                id="panel5-header"
              >
                <Typography>How secure is the data within the LMS?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  The LMS employs robust security measures to protect student
                  and teacher data. This includes encryption, regular security
                  audits, and compliance with data protection regulations. User
                  data is stored securely, and access is restricted to
                  authorized personnel only.
                </Typography>
              </AccordionDetails>
            </Accordion> */}
          </div>
        </div>
      </MainRightPane>
    </div>
  );
}

export default Help;
