import React from "react";
// import { Link } from "react-router-dom";
import image from "../../../assets/img/course-1.jpg";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
const CourseItem = ({ data }) => {
  return (
    <>
      <Card border="primary" style={{ borderRadius: "10px" }}>
        <Card.Img variant="top" src={image} style={{ borderRadius: "10px" }} />
        <Card.Body>
          <Card.Title>{data.title}</Card.Title>
          <Button className="text-center" variant="primary">
            Show
          </Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default CourseItem;
