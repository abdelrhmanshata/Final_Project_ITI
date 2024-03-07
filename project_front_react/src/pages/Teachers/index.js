import React, { useState } from "react";
import { Pagination } from "@mui/material";

import Navbar from "components/Navbar";
import Footer from "components/Footer";
import TeacherItem from "./TeacherItem";
import SearchLayout from "components/Layout/SearchLayout";
import FormControlLayout from "components/Layout/FormControlLayout";

export default function TeachersPage() {
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");

  const searchTeacher = () => {
    console.log(search);
  };

  const getTeachersByCategory = (value) => {
    setCategory(value);
    console.log(value);
  };

  const teachers = [
    {
      id: "1",
      name: "AbdElrhman",
      image: require("../../assets/img/team-3.jpg"),
      category: "Developer",
      rating: 4,
    },
    {
      id: "2",
      name: "Nohaa Mohamed",
      image: require("../../assets/img/team-2.jpg"),
      rating: 5,
      category: "Designer",
    },
    {
      id: "3",
      name: "Youssif",
      image: require("../../assets/img/team-1.jpg"),
      rating: 3,
      category: "Travel Bloger",
    },
  ];

  return (
    <>
      <Navbar active={"Teachers"} />

      {/* Search Layout */}
      <SearchLayout text={setSearch} action={searchTeacher} />

      {/* FormControl Start */}
      <FormControlLayout
        text={"We Found 80 Teachers Available"}
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
      <div
        className="container d-flex p-5"
        style={{ justifyContent: "center" }}
      >
        <Pagination count={10} color="primary" />
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}
