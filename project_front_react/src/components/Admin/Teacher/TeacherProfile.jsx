import React, { useCallback, useEffect, useState } from "react";
import "../../../styles/profile.css";
import { BiChalkboard } from "react-icons/bi";
import { axiosInstance } from "api/config";

export default function TeacherProfile({ data }) {
  const [teacherCourses, setTeacherCourses] = useState([]);
  const getData = useCallback(async () => {
    try {
      await axiosInstance
        .get(`course/teacherCourses/${data.id}`)
        .then((res) => {
          if (typeof res.data.message != "string")
            setTeacherCourses(res.data.message);
          else setTeacherCourses([]);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }, [data]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <>
      {data.id && (
        <div className="profile">
          <div className="user--profile">
            {/* Header */}
            <div className="user--detail">
              <img src={`http://127.0.0.1:9000/${data.image}`} alt="" />
              <h3 className="username">{data.name}</h3>
              <span className="profession">Teacher</span>
            </div>

            <div className="user--courses">
              {teacherCourses.map((course, index) => (
                <div key={index} className="course--item">
                  <div className="course--detail">
                    <div className="course--cover">
                      <BiChalkboard />
                    </div>
                    <div className="course--name">
                      <h5 className="title">{course.courseName}</h5>
                      <span className="duration">
                        {course.courseDescription} h
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
