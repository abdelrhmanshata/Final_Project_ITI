import React, { useState } from "react";
import { Pagination } from "@mui/material";
import Navbar from "components/Navbar";
import CourseItem from "./CourseItem";
import Footer from "components/Footer";
import SearchLayout from "components/Layout/SearchLayout";
import FormControlLayout from "components/Layout/FormControlLayout";

export default function CoursesPage() {
  const listCourses = [
    {
      id: "1",
      image: require("../../assets/img/course-1.jpg"),
      price: "$250.00",
      rating: 4,
      students_rating: 250,
      course_type: "Development",
      title: "Web Design Course for Beginners",
      description:
        "Do you want to become a UI/UX designer but you don't know where to start? This course will allow you to develop your user interface design skills and you can add UI designer to your CV and start getting clients for your skills.\nHi everyone. I'm Arash and I'm a UI/UX designer. In this course, I will help you learn and master Figma app comprehensively from scratch. Figma is an innovative and brilliant tool for User Interface design. It's used by everyone from entrepreneurs and start-ups to Apple, Airbnb, Facebook, etc.",
      hours: "8h 12m",
      instructor: {
        image: require("../../assets/img/team-0.jpg"),
        name: "AbdElrhman Moahmed",
      },
    },
    {
      id: "2",
      image: require("../../assets/img/course-2.jpg"),
      price: "$150.00",
      rating: 3,
      students_rating: 50,
      course_type: "Development",
      title: "Web Design Course for Beginners",
      description:
        "Do you want to become a UI/UX designer but you don't know where to start? This course will allow you to develop your user interface design skills and you can add UI designer to your CV and start getting clients for your skills.\nHi everyone. I'm Arash and I'm a UI/UX designer. In this course, I will help you learn and master Figma app comprehensively from scratch. Figma is an innovative and brilliant tool for User Interface design. It's used by everyone from entrepreneurs and start-ups to Apple, Airbnb, Facebook, etc.",
      hours: "5h 10m",
      instructor: {
        image: require("../../assets/img/team-1.jpg"),
        name: "Youssif",
      },
    },
    {
      id: "3",
      image: require("../../assets/img/course-3.jpg"),
      price: "$550.00",
      rating: 5,
      students_rating: 350,
      course_type: "Development",
      title: "Web Design Course for Beginners",
      description:
        "Do you want to become a UI/UX designer but you don't know where to start? This course will allow you to develop your user interface design skills and you can add UI designer to your CV and start getting clients for your skills.\nHi everyone. I'm Arash and I'm a UI/UX designer. In this course, I will help you learn and master Figma app comprehensively from scratch. Figma is an innovative and brilliant tool for User Interface design. It's used by everyone from entrepreneurs and start-ups to Apple, Airbnb, Facebook, etc.",
      hours: "5h 10m",
      instructor: {
        image: require("../../assets/img/team-2.jpg"),
        name: "Noha Mohamed",
      },
    },
  ];

  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");

  const searchCourses = () => {
    console.log(search);
  };

  const getCoursesByCategory = (value) => {
    setCategory(value);
    console.log(value);
  };

  return (
    <>
      <Navbar active={"Courses"} />

      {/* Search  */}
      <SearchLayout text={setSearch} action={searchCourses} />

      {/* FormControl Start */}
      <FormControlLayout
        text={"We found 432 courses available for you"}
        value={category}
        select={getCoursesByCategory}
      />

      {/* Content */}
      <div className="container p-5">
        <div
          className="d-flex flex-wrap gap-4"
          style={{ justifyContent: "space-around" }}
        >
          {listCourses.map((item) => (
            <CourseItem data={item} />
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
