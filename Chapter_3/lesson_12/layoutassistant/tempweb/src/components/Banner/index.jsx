import React, { FC, useEffect } from "react";
import styles from "./index.css";
import bannerpic from "../images/banner.png";

const Banner = (props) => {
  return <div> <img src={bannerpic} alt=""  style={{width:"100%", borderRadius:"10px"}}/> </div>;
};

export default Banner