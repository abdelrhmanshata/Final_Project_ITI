import React, { useCallback, useEffect, useState } from "react";
import { axiosInstance } from "api/config";
import CourseStudent from "./CourseStudent";

export default function ListStudentCourses() {
  const [paymentCourses, setPaymentCourses] = useState([]);
  const getPaymentCourses = useCallback(async () => {
    try {
      await axiosInstance
        .get(`api/paymentCourses/${localStorage.getItem("User_ID")}`)
        .then((res) => {
          if (typeof res.data.message != "string") {
            setPaymentCourses(res.data.message);
          } else {
            setPaymentCourses([]);
          }
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }, []);

  const [enrollCourses, setEnrollCourses] = useState([]);
  const getEnrollCourses = useCallback(async () => {
    try {
      await axiosInstance
        .get(`review/enrollCourses/${localStorage.getItem("User_ID")}`)
        .then((res) => {
          if (typeof res.data.message != "string") {
            setEnrollCourses(res.data.message);
          } else {
            setEnrollCourses([]);
          }
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getPaymentCourses();
    getEnrollCourses();
  }, []);

  return (
    <div
      className="d-flex flex-wrap gap-2"
      style={{ justifyContent: "space-around" }}
    >
      {paymentCourses.map((item) => (
        <CourseStudent data={item} type={"Payment"} />
      ))}
      {enrollCourses.map((item) => (
        <CourseStudent data={item} type={"Enroll"} />
      ))}
    </div>
  );
}
