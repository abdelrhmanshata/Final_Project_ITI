import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { axiosInstance } from "api/config";
import { Rating } from "@mui/material";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const getData = useCallback(async () => {
    try {
      await axiosInstance
        .get(`course/listAllCourses`)
        .then((res) => {
          setCourses(res.data.message.slice(0, 4));
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <>
      {/* <!-- Courses Start --> */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title bg-white text-center text-primary px-3">
              Courses
            </h6>
            <h1 className="mb-5">Popular Courses</h1>
          </div>
          <div className="row g-4 justify-content-center">
            {courses.map((item) => (
              <>
                <div key={item.id} className="col-lg-3 col-md-6">
                  <div
                    className="course-item bg-light"
                    style={{ borderRadius: "5%" }}
                  >
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
                          to="/"
                          className="flex-shrink-0 btn btn-sm btn-primary px-3"
                          style={{ borderRadius: "0 30px 30px 0" }}
                        >
                          Join Now
                        </Link>
                      </div>
                    </div>
                    {/* Course Title */}
                    <div className="text-center">
                      {/* Price */}
                      <h5 className="m-1">{item.coursePrice} $</h5>
                      {/* Rating */}
                      <div className="d-flex mb-3 align-items-center justify-content-center ">
                        <Rating
                          name="read-only"
                          value={item.courseReviewScore}
                          readOnly
                        />
                        <small>(152)</small>
                      </div>
                      {/* Title */}
                      <h5
                        className="m-2"
                        style={{ height: "24px", overflow: "hidden" }}
                      >
                        {item.courseName}
                      </h5>
                      <p className="m-2" style={{ overflow: "hidden" }}>
                        {item.courseDescription}
                      </p>
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
              </>
            ))}
          </div>
        </div>
      </div>
      {/* <!-- Courses End --> */}
    </>
  );
}
