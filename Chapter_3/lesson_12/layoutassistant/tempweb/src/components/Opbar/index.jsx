import React, { FC, useEffect } from "react";
import styles from "./index.css";
import opbarpic from "../images/op_bar.png";

const Opbar = (props) => {
  const { position = { "left": 100, "top": 100 },type="default" } = props;
  useEffect(() => {
    console.log("Button comp mount");
  }, []);
  return <div><img src={opbarpic} alt="" style={{width:"100%"}}/></div>;
};

export default Opbar;