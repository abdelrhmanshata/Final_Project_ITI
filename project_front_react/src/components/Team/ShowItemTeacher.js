import { Rating } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function ShowItemTeacher({ item }) {
  return (
    <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
      <div className="team-item bg-light">
        <div className="d-flex justify-content-center">
          <Link to={`/single/${item.id}`}>
            <img
              className="img-fluid"
              src={`http://127.0.0.1:9000/${item.image}`}
              alt={item.name}
            />
          </Link>
        </div>
        <div
          className="position-relative d-flex justify-content-center"
          style={{ marginTop: "-23px" }}
        >
          <div className="bg-light d-flex justify-content-center pt-2 px-1">
            <Link className="btn btn-sm-square btn-primary mx-1" to="">
              <i className="fab fa-facebook-f"></i>
            </Link>
            <Link className="btn btn-sm-square btn-primary mx-1" to="">
              <i className="fab fa-twitter"></i>
            </Link>
            <Link className="btn btn-sm-square btn-primary mx-1" to="">
              <i className="fab fa-instagram"></i>
            </Link>
          </div>
        </div>
        <div className="text-center p-4">
          <h5 className="mb-0" style={{ height: "25px", overflow: "hidden" }}>
            {item.name}
          </h5>
          <div>
            <Rating name="read-only" value={item.teacher_avg_score} readOnly />
          </div>
          <small style={{ height: "20px", overflow: "hidden" }}>
            {item.subject} Teacher
          </small>
          <br />
          <small style={{ height: "20px", overflow: "hidden" }}>
            {item.email}
          </small>
          <br />
          <small style={{ height: "20px", overflow: "hidden" }}>
            {item.phonenumber}
          </small>
        </div>
      </div>
    </div>
  );
}
