import React, { useCallback, useEffect, useState } from "react";
import CardCourse from "./CardCousre";
import { axiosInstance } from "api/config";

export default function ListCourses() {
  const [isUpdate, setIsUpdate] = useState(0);
  const [courses, setCourses] = useState([]);
  const getData = useCallback(async () => {
    try {
      await axiosInstance
        .get(`course/teacherCourses/${localStorage.getItem("User_ID")}`)
        .then((res) => {
          if (typeof res.data.message != "string") {
            setCourses(res.data.message);
          } else {
            setCourses([]);
          }
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [isUpdate]);

  return (
    <div className="d-flex flex-wrap gap-5 p-2" style={{ margin: "auto" }}>
      {courses.map((item) => (
        <CardCourse
          course={item}
          isUpdate={isUpdate}
          setIsUpdate={setIsUpdate}
        />
      ))}
    </div>
  );
}
