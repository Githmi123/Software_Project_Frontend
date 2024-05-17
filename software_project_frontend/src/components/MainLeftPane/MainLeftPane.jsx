import React from "react";
import "../MainLeftPane/MainLeftPane.css";
import projectlogo from "../../images/rs.png";
import ButtonSet from "../ButtonSet/ButtonSet";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const MainLeftPane = () => {
  return (
    <div className="maindiv-left">
      <img
        id="main-left-pane-image"
        src={projectlogo}
        style={{ width: "50%" }}
      />

      <ButtonSet />
      <Link to="/UserProfile">
        <div id="bottom-profile-set">
          <img />
          <p>Name</p>
          <p>position</p>
        </div>
      </Link>
    </div>
  );
};

export default MainLeftPane;
