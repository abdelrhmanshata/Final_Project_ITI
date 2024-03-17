import React, { useCallback, useEffect, useState } from "react";
import CardCourse from "./CardCousre";
import { axiosInstance } from "api/config";
import { useDispatch, useSelector } from "react-redux";

export default function ListCourses() {
  // const dispatch = useDispatch();
  const isUpdate = useSelector((state) => state.update.isUpdate);
  // dispatch(updateState(isUpdate + 1));

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
        <CardCourse key={item.id} course={item} />
      ))}
    </div>
  );
}
