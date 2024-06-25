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
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function Help() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpansion = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
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
              width: "100%",
            }}
          >
            <div id="faq-image-container">
              <div
                id="help-image-container-2"
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
                  Thi system uses automated grading algorithms to quickly and
                  accurately assess student submissions, reducing the need for
                  manual grading.
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
                  The system provides a visualization graph to help teachers
                  analyze student performance by displaying data on class
                  averages.
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
                  The system can automatically grade multiple-choice questions.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      </MainRightPane>
    </div>
  );
}

export default Help;
