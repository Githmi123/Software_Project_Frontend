import React from "react";
import "../MainRightPane/MainRightPane.css";
import { Box, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Footer from "../Footer/Footer";

const MainRightPane = ({ children }) => {
  return (
    <div className="maindiv-right">
      <div className="right-pane-container">{children}</div>
      <div id="footer_main_right_pane">
        <Footer />
      </div>
    </div>
  );
};

export default MainRightPane;
