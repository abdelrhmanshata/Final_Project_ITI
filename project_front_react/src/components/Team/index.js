import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { axiosInstance } from "api/config";
import { Rating } from "@mui/material";
import ShowItemTeacher from "./ShowItemTeacher";
export default function Team() {
  const [teachers, setTeachers] = useState([]);
  const getData = useCallback(async () => {
    try {
      await axiosInstance
        .get(`user/Print_All_Teachers`)
        .then((res) => {
          setTeachers(res.data.data.slice(0, 4));
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
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title bg-white text-center text-primary px-3">
              Instructors
            </h6>
            <h1 className="mb-5">Expert Instructors</h1>
          </div>
          <div className="row g-4 flex-wrap justify-content-center">
            {teachers.map((item) => (
              <ShowItemTeacher key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
