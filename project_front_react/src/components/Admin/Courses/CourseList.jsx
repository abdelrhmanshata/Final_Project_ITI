import React, { useState } from "react";
import image from "../../../assets/img/course-1.jpg";
// import CourseItem from "./CourseItem";
import Card from "./Card";
const courses = [
  {
    title: "Web Development",
    description:
      "Some quick example text to build on the card title and make up the bulk of the card's content. Some quick example text to build on the",
  },
  {
    title: "Web Development",
    description: "Some quick example text to build on the",
  },
  {
    title: "Web Development",
    description:
      "Some quick example text to build on the Some quick example text to build on theSome quick example text to build on theSome quick example text to build on thecard title and make up the bulk of the card's content. Some quick example text to build on the",
  },
  {
    title: "Web Development",
    description: "Some quick example text to build on the",
  },
];

export default function CourseList() {
  const [course] = useState(courses[0]);

  return (
    <>
      <div class="d-flex text-center">
        <div class="row flex-wrap justify-content-center w-50">
          {courses.map((item) => (
            <div class="col-5 m-2">
              {/* <CourseItem data={item} /> */}
              <Card data={item}  />
            </div>
          ))}
        </div>
        <div class="row flex-wrap justify-content-center w-50 ">
          <div className="rounded-3 bg-primary p-2">
            <img
              src={image}
              style={{
                width: "95%",
                height: "300px",
                borderRadius: "5%",
              }}
              alt=""
            />
            <div>
              <h2>{course.title}</h2>
            </div>
            <div>
              <p>{course.description}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
