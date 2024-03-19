import { Rating } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function ShowItemCourse({ item }) {
  return (
    <div key={item.id} className="col-lg-3 col-md-6">
      <div className="course-item bg-light" style={{ borderRadius: "5%" }}>
        {/* Course Image */}
        <div
          className="position-relative overflow-hidden justify-content-center "
          style={{ borderRadius: "5%" }}
        >
          <div className="d-flex justify-content-center align-items-center ">
            <img
              style={{ height: "200px" }}
              className="img-fluid"
              src={`http://127.0.0.1:9000/${item.courseImage}`}
              alt={item.courseName}
            />
          </div>
          <div className="w-100 d-flex justify-content-center position-absolute bottom-0 start-0 mb-2">
            <Link
              to={`/course/${item.id}`}
              className="flex-shrink-0 btn btn-sm btn-primary px-3 border-end"
              style={{ borderRadius: "30px 0 0 30px" }}
            >
              Read More
            </Link>
            <Link
              to={`/payment/${item.id}`}
              className="flex-shrink-0 btn btn-sm btn-primary px-3"
              style={{ borderRadius: "0 30px 30px 0" }}
            >
              Buy Now
            </Link>
          </div>
        </div>
        {/* Course Title */}
        <div className="text-center">
          {/* Title */}
          <h5 className="m-2" style={{ height: "24px", overflow: "hidden" }}>
            {item.courseName}
          </h5>
          <p className="m-2" style={{ overflow: "hidden" }}>
            {item.courseDescription}
          </p>
          {/* Rating */}
          <div
            className="d-flex mb-3 align-items-center"
            style={{ justifyContent: "space-around" }}
          >
            <Rating name="read-only" value={item.courseReviewScore} readOnly />
            {/* Price */}
            <h5 className="m-1">{item.coursePrice} $</h5>
          </div>
        </div>
        {/* Info */}
        <div className="d-flex border-top py-1 justify-content-space-between">
          <div className="w-50 text-center border-end">
            <small className="p-2">
              <i className="fa fa-book text-primary me-2"></i>
              {item.courseLessons} Lessons
            </small>
          </div>

          <div className="w-50 text-center border-start">
            <small className="flex-fill text-center py-2">
              <i className="fa fa-clock text-primary me-2"></i>
              {item.courseHours} Hrs
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}
