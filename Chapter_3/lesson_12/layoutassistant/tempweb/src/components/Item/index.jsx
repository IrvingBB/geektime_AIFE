import React, { FC, useEffect } from "react";
import styles from "./index.css";
import itempic1 from "../images/item1.png";
import itempic2 from "../images/item2.png";
import itempic3 from "../images/item3.png";

const Item = (props) => {
  const { position = { "left": 100, "top": 100 }, type="0" } = props;
  const pic = [itempic1, itempic2, itempic3];
  return <div> <img src={pic[type]} alt=""  style={{width:"100%", borderRadius:"10px"}}/> </div>;
};

export default Item;