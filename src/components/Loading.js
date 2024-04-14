import { AiOutlineLoading } from "react-icons/ai";
import React from "react";
import "./Loading.css";

function Loading({ size }) {
  return (
    <div className="loading_container">
      <AiOutlineLoading className="animate-spin" />
    </div>
  );
}

export default Loading;
