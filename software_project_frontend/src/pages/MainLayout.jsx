import React from "react";
import { Outlet } from "react-router-dom";
// import { LeftPane } from "./LeftPane/LeftPane";
import '../styles/MainLayout.css'
import MainLeftPane from "../components/MainLeftPane/MainLeftPane";

const MainLayout = () => {
  return (
    <div className="main-layout">
      <MainLeftPane />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
