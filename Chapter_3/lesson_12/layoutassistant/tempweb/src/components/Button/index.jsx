import React, { FC, useEffect } from "react";
import styles from "./index.css";

const Button = (props) => {
  const { position = { "left": 100, "top": 100 },type="default" } = props;
  useEffect(() => {
    console.log("Button comp mount");
  }, []);
  return <div className={`${type}Button`} style={position}>Button</div>;
};

export default Button;