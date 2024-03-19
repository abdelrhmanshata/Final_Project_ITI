import React, { useCallback, useEffect, useState } from "react";
import "../../../styles/profile.css";
import { BiChalkboard } from "react-icons/bi";
import { axiosInstance } from "api/config";
const courses = [
  { title: "Arabic", duration: "2 Hours" },
  { title: "English", duration: "4 Hours" },
  { title: "Math", duration: "6 Hours" },
  { title: "Math", duration: "6 Hours" },
];

export default function StudentProfile({ data }) {
  const [paymentCourses, setPaymentCourses] = useState([]);
  const getPaymentCourses = useCallback(async () => {
    try {
      await axiosInstance
        .get(`api/paymentCourses/${data.id}`)
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
  }, [data]);

  const [enrollCourses, setEnrollCourses] = useState([]);
  const getEnrollCourses = useCallback(async () => {
    try {
      await axiosInstance
        .get(`review/enrollCourses/${data.id}`)
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
  }, [data]);

  useEffect(() => {
    getPaymentCourses();
    getEnrollCourses();
  }, [data]);

  return (
    <>
      {data.id && (
        <div className="profile">
          <div className="user--profile">
            {/* Header */}
            <div className="user--detail">
              <img src={`http://127.0.0.1:9000/${data.image}`} alt="" />
              <h3 className="username">{data.name}</h3>
              <span className="profession">Student</span>
            </div>
            <div className="d-flex flex-row gap-2">
              <div className="user--courses">
                <span className="profession">Enroll Courses</span>
                {enrollCourses.map((course, index) => (
                  <div key={index} className="course--item">
                    <div className="course--detail">
                      <div className="course--cover">
                        <BiChalkboard />
                      </div>
                      <div className="course--name">
                        <h5 className="title">{course.courseName}</h5>
                        <span className="duration">{course.courseDate}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="user--courses">
                <span className="profession">Payment Courses</span>
                {paymentCourses.map((course, index) => (
                  <div key={index} className="course--item">
                    <div className="course--detail">
                      <div className="course--cover">
                        <BiChalkboard />
                      </div>
                      <div className="course--name">
                        <h5 className="title">{course.courseName}</h5>
                        <span className="duration">{course.courseDate}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
