import React, { useCallback, useEffect, useState } from "react";
import { Pagination } from "@mui/material";
import Navbar from "components/Navbar";
import CourseItem from "./CourseItem";
import Footer from "components/Footer";
import SearchLayout from "components/Layout/SearchLayout";
import FormControlLayout from "components/Layout/FormControlLayout";
import { axiosInstance } from "api/config";

export default function CoursesPage() {
  const [numPage, setNumPage] = useState(0);
  const [limit] = useState(10);
  const [allCourses, setAllCourses] = useState([]);
  const [courses, setCourses] = useState([]);
  const [category, setCategory] = useState("");
  const getData = useCallback(async () => {
    try {
      await axiosInstance
        .get(`course/listAllCourses`)
        .then((res) => {
          setAllCourses(res.data.message);
          setCourses(res.data.message.slice(0, limit));
          setNumPage(Math.ceil(res.data.message.length / limit));
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

  const handelPagination = (event, value) => {
    showCourses(value);
  };

  const showCourses = (page) => {
    const start = (page - 1) * limit;
    const end = limit + (page - 1) * limit;
    setCourses(allCourses.slice(start, end));
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
      <div className="container p-5 ">
        <div
          className="d-flex flex-wrap gap-4"
          style={{ justifyContent: "center" }}
        >
          {courses.map((item, index) => (
            <CourseItem key={item.id} data={item} />
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div
        className="container d-flex my-5"
        style={{ justifyContent: "center" }}
      >
        <Pagination
          count={numPage}
          color="primary"
          onChange={handelPagination}
        />
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}
