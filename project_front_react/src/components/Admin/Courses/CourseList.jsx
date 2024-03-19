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
          if (typeof res.data.message != "string") {
            setCourses(res.data.message);
            if (res.data.message.length > 0) setCourse(res.data.message[0]);
          } else {
            setCourse([]);
          }
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
      <div className="d-flex w-100 text-center gap-3 p-0">
        <div
          className="d-flex flex-wrap p-2 gap-2"
          style={{
            width: "70%",
            // overflowY: "scroll",
          }}
        >
          {courses &&
            courses.map((item, index) => (
              <CourseCard key={index} data={item} onSelect={selectCourse} />
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
              <Curriculum course={course} isPlay={false} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
