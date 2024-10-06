import React, { FC, useEffect } from "react";
import styles from "./index.css";

const Input = (props) => {
  const { position = { "left": 400, "top": 300 } } = props;
  useEffect(() => {
    console.log("Button comp mount");
  }, []);
  return <input value="this is a Input" className="Input" style={position}></input>;
};

export default Input;