import React, { useCallback, useEffect, useState } from "react";
import CardCourse from "./CardCousre";
import { axiosInstance } from "api/config";

export default function ListCourses() {
  const [courses, setCourses] = useState([]);

  const getData = useCallback(async () => {
    try {
      await axiosInstance
        .get(`course/teacherCourses/${localStorage.getItem("User_ID")}`)
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

  return (
    <div className="container">
      <div
        // ref={divRef}
        className="d-flex flex-wrap gap-2"
        style={{ justifyContent: "space-around" }}
      >
        {courses.map((item) => (
          <CardCourse course={item} />
        ))}
      </div>
    </div>
  );
}
