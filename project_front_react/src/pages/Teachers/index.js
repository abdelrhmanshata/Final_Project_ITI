import React, { useCallback, useEffect, useState } from "react";
import { Pagination } from "@mui/material";

import Navbar from "components/Navbar";
import Footer from "components/Footer";
import TeacherItem from "./TeacherItem";
import SearchLayout from "components/Layout/SearchLayout";
import FormControlLayout from "components/Layout/FormControlLayout";
import { axiosInstance } from "api/config";

export default function TeachersPage() {
  const [allTeachers, setAllTeachers] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [category, setCategory] = useState("");

  const getData = useCallback(async () => {
    try {
      await axiosInstance
        .get(`user/Print_All_Teachers`)
        .then((res) => {
          setTeachers(res.data.data);
          setAllTeachers(res.data.data);
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
            <TeacherItem data={item} />
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
