import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import Logo from "../images/logo.png";
import "./PageLoading.css";

function PageLoading() {
  const location = useLocation();

  return (
    <div className="pageLoading-container">
      <img src={Logo} alt="PNI" />
      <BeatLoader
        color={"rgb(2, 2, 113)"}
        loading={true}
        width={"420px"}
        style={{ marginTop: "-50px" }}
      />
    </div>
  );
}

export default PageLoading;
