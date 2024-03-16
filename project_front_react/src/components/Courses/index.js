import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { axiosInstance } from "api/config";
import { Rating } from "@mui/material";
import ShowItemCourse from "./ShowItemCourse";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const getData = useCallback(async () => {
    try {
      await axiosInstance
        .get(`course/listAllCourses`)
        .then((res) => {
          const allCourses = res.data.message.sort(
            (a, b) => b.courseReviewScore - a.courseReviewScore
          );
          setCourses(allCourses.slice(0, 4));
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getData();
  }, []);

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
          <div className="row g-4 flex-wrap justify-content-center">
            {courses.map((item) => (
              <ShowItemCourse key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
      {/* <!-- Courses End --> */}
    </>
  );
}
