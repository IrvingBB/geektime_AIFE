import React, { FC, useEffect } from "react";
import styles from "./index.css";

const Switch = (props) => {
  const { position = { "left": 400, "top": 300 } } = props;
  useEffect(() => {
    console.log("Button comp mount");
  }, []);
  return <div className="Switch" style={position}>Switch</div>;
};

export default Switch;