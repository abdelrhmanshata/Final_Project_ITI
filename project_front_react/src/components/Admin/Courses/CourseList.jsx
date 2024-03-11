import React, { useCallback, useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import { axiosInstance } from "api/config";
import Curriculum from "components/SingleCourse/CourseCurriculum";

export default function CourseList() {
  const [course, setCourse] = useState({});
  const [courses, setCourses] = useState([]);

  const getData = useCallback(async () => {
    try {
      await axiosInstance
        .get(`course/listAllCourses`)
        .then((res) => {
          setCourses(res.data.message);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  const selectCourse = (courseSelect) => {
    setCourse(courseSelect);
    console.log(courseSelect.id);
  };
  return (
    <>
      <div className="d-flex text-center gap-5 p-2">
        <div
          className="d-flex flex-row flex-wrap justify-content-space-between p-2"
          style={{
            overflowY: "scroll",
            justifyContent: "space-between",
            width: "70%",
          }}
        >
          {courses.map((item) => (
            <CourseCard data={item} onSelect={selectCourse} />
          ))}
        </div>

        {course.id && (
          <div className="row flex-wrap justify-content-center w-50 ">
            <div>
              <img
                src={`http://127.0.0.1:9000/${course.courseImage}`}
                style={{
                  width: "95%",
                  height: "300px",
                  borderRadius: "2%",
                }}
                alt=""
              />
              <div>
                <h2>{course.courseName}</h2>
              </div>
              <div>
                <p>{course.courseDescription}</p>
              </div>
              <Curriculum course={course} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
