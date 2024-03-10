import React from "react";
import { BiLogoHtml5 } from "react-icons/bi";
// import { BiBuilding, BiLogoAndroid, BiLogoHtml5 } from "react-icons/bi";

// const course = [
//   { title: "Web Development", duration: "2 Hours", icon: <BiLogoHtml5 /> },
//   { title: "App Development", duration: "2 Hours", icon: <BiLogoAndroid /> },
//   { title: "UI & UX", duration: "2 Hours", icon: <BiBuilding /> },
// ];

const Card = ({ data }) => {
  return (
    <div className="card--container">
      <div className="card--item">
        <div className="cardCover--item">
          <BiLogoHtml5 />
        </div>
        <div className="cardTitle--item">
          <h4>{data.title}</h4>
        </div>
      </div>
    </div>
  );
};

export default Card;
