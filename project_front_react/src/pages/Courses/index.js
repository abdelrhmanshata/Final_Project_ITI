import React, { useCallback, useEffect, useState } from "react";
import { Pagination } from "@mui/material";
import Navbar from "components/Navbar";
import CourseItem from "./CourseItem";
import Footer from "components/Footer";
import SearchLayout from "components/Layout/SearchLayout";
import FormControlLayout from "components/Layout/FormControlLayout";
import { axiosInstance } from "api/config";

export default function CoursesPage() {
  const [allCourses, setAllCourses] = useState([]);
  const [courses, setCourses] = useState([]);
  const [category, setCategory] = useState("");
  const getData = useCallback(async () => {
    try {
      await axiosInstance
        .get(`course/listAllCourses`)
        .then((res) => {
          setCourses(res.data.message);
          setAllCourses(res.data.message);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  const searchCourses = (value) => {
    const filteredData = allCourses.filter((item) =>
      item.courseName.toLowerCase().includes(value.toLowerCase())
    );
    setCourses(filteredData);
  };

  const getCoursesByCategory = (value) => {
    setCategory(value);
    const filteredData = allCourses.filter((item) =>
      item.courseType.toLowerCase().includes(value.toLowerCase())
    );
    setCourses(filteredData);
  };

  return (
    <>
      <Navbar active={"Courses"} />

      {/* Search  */}
      <SearchLayout action={searchCourses} />

      {/* FormControl Start */}
      <FormControlLayout
        text={`We found ${allCourses.length} courses available for you`}
        value={category}
        select={getCoursesByCategory}
      />
      {/* Content */}
      <div className="container p-5">
        <div
          className="d-flex flex-wrap gap-4"
          style={{ justifyContent: "space-around" }}
        >
          {courses.map((item) => (
            <CourseItem data={item} />
          ))}
        </div>
      </div>

      {/* Pagination */}
      {/* <div
        className="container d-flex p-5"
        style={{ justifyContent: "center" }}
      >
        <Pagination count={10} color="primary" />
      </div> */}

      {/* Footer */}
      <Footer />
    </>
  );
}
