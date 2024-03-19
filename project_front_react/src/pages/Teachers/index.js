import React, { useCallback, useEffect, useState } from "react";
import { Pagination } from "@mui/material";

import Navbar from "components/Navbar";
import Footer from "components/Footer";
import TeacherItem from "./TeacherItem";
import SearchLayout from "components/Layout/SearchLayout";
import FormControlLayout from "components/Layout/FormControlLayout";
import { axiosInstance } from "api/config";

export default function TeachersPage() {
  const [numPage, setNumPage] = useState(0);
  const [limit] = useState(10);
  const [allTeachers, setAllTeachers] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [category, setCategory] = useState("");

  const getData = useCallback(async () => {
    try {
      await axiosInstance
        .get(`user/Print_All_Teachers`)
        .then((res) => {
          setAllTeachers(res.data.data);
          setTeachers(res.data.data.slice(0, limit));
          setNumPage(Math.ceil(res.data.data.length / limit));
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  const searchTeacher = (value) => {
    const filteredData = allTeachers.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setTeachers(filteredData);
  };

  const getTeachersByCategory = (value) => {
    setCategory(value);
    const filteredData = allTeachers.filter((item) =>
      item.subject.toLowerCase().includes(value.toLowerCase())
    );
    setTeachers(filteredData);
  };

  const handelPagination = (event, value) => {
    showTeachers(value);
  };

  const showTeachers = (page) => {
    const start = (page - 1) * limit;
    const end = limit + (page - 1) * limit;
    setTeachers(allTeachers.slice(start, end));
  };

  return (
    <>
      <Navbar active={"Teachers"} />

      {/* Search Layout */}
      <SearchLayout action={searchTeacher} />

      {/* FormControl Start */}
      <FormControlLayout
        text={`We Found ${allTeachers.length} Teachers Available`}
        value={category}
        select={getTeachersByCategory}
      />

      {/* Content */}
      <div className="container p-5">
        <div
          className="d-flex flex-wrap gap-4"
          style={{ justifyContent: "space-around" }}
        >
          {teachers.map((item) => (
            <TeacherItem key={item.id} data={item} />
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
