import React, { FC, useEffect } from "react";
import styles from "./index.css";
import seckillpic from "../images/seckill.png";

const Seckill = (props) => {
  const { position = { "left": 100, "top": 100 },type="default" } = props;
  useEffect(() => {
    console.log("Button comp mount");
  }, []);
  return <div><img src={seckillpic} alt=""  style={{width:"100%", borderRadius:"10px"}}/></div>;
};

export default Seckill;