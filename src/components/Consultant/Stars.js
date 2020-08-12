import React from "react";
import ReactStars from "react-stars";

const Stars = ({ setStar = "", ...props }) => {
  return (
    <ReactStars
      edit={props.edit}
      half={true}
      count={5}
      value={props.value}
      size={props.size}
      color1={"#C2C7D0"}
      color2={props.color}
      onChange={(e) => setStar(e)}
    />
  );
};

export default Stars;
