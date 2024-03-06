import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Lottie from "react-lottie";
import animationData from "../data.json";
const styles = () => ({
  svg: {
    background: "none"
  },
  wrapper: {
    alignItems: "center",
    display: "flex",
    height: "75vh",
    justifyContent: "center",
    flexDirection: "column"
  },
  message: {
    marginTop: "20px"
  }
});

export default function PageLoading() {
const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    };

 
 

    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Lottie options={defaultOptions} height={400} width={400} className="loading" />
      </div>
    );
  }

