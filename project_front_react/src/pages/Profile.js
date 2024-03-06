import React from "react";
import { Link } from "react-router-dom";

export default function Profile() {
  return (
    <>
      <div className="row g-4 justify-content-center">
        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
          <div className="course-item bg-light">
            <div className="position-relative overflow-hidden">
              <img
                className="img-fluid"
                src={require("../assets/img/course-1.jpg")}
                alt=""
              />
              <div className="w-100 d-flex justify-content-center position-absolute bottom-0 start-0 mb-4">
                <Link
                  to="/"
                  className="flex-shrink-0 btn btn-sm btn-primary px-3 border-end"
                  style={{ borderRadius: "30px 0 0 30px" }}
                >
                  Read More
                </Link>
                <Link
                  to="/"
                  className="flex-shrink-0 btn btn-sm btn-primary px-3"
                  style={{ borderRadius: "0 30px 30px 0" }}
                >
                  Join Now
                </Link>
              </div>
            </div>
            <div className="text-center p-4 pb-0">
              <h3 className="mb-0">$149.00</h3>
              <div className="mb-3">
                <small className="fa fa-star text-primary"></small>
                <small className="fa fa-star text-primary"></small>
                <small className="fa fa-star text-primary"></small>
                <small className="fa fa-star text-primary"></small>
                <small className="fa fa-star text-primary"></small>
                <small>(123)</small>
              </div>
              <h5 className="mb-4">
                Web Design & Development Course for Beginners
              </h5>
            </div>
            <div className="d-flex border-top">
              <small className="flex-fill text-center border-end py-2">
                <i className="fa fa-user-tie text-primary me-2"></i>John Doe
              </small>
              <small className="flex-fill text-center border-end py-2">
                <i className="fa fa-clock text-primary me-2"></i>1.49 Hrs
              </small>
              <small className="flex-fill text-center py-2">
                <i className="fa fa-user text-primary me-2"></i>30 Students
              </small>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
