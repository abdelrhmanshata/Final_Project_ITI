import React, { useState } from "react";
import image1 from "../../../assets/img/course-1.jpg";
import image2 from "../../../assets/img/course-2.jpg";
import image3 from "../../../assets/img/course-3.jpg";
import CourseItem from "./CourseItem";
const courses = [
  {
    title: "Web Development",
    description:
      "Some quick example text to build on the card title and make up the bulk of the card's content. Some quick example text to build on the",
    image: image1,
  },
  {
    title: "Web Development",
    description: "Some quick example text to build on the",
    image: image2,
  },
  {
    title: "Web Development",
    description:
      "Some quick example text to build on the Some quick example text to build on theSome quick example text to build on theSome quick example text to build on thecard title and make up the bulk of the card's content. Some quick example text to build on the",
    image: image3,
  },
  {
    title: "Web Development",
    description: "Some quick example text to build on the",
    image: image1,
  },
  {
    title: "Web Development",
    description: "Some quick example text to build on the",
    image: image2,
  },
  {
    title: "Web Development",
    description: "Some quick example text to build on the",
    image: image3,
  },
  {
    title: "Web Development",
    description: "Some quick example text to build on the",
    image: image1,
  },
  {
    title: "Web Development",
    description: "Some quick example text to build on the",
    image: image2,
  },
  {
    title: "Web Development",
    description: "Some quick example text to build on the",
    image: image3,
  },
  {
    title: "Web Development",
    description: "Some quick example text to build on the",
    image: image1,
  },
  {
    title: "Web Development",
    description: "Some quick example text to build on the",
    image: image1,
  },
  {
    title: "Web Development",
    description: "Some quick example text to build on the",
    image: image1,
  },
];

export default function CourseList() {
  const [course, setCourse] = useState(courses[0]);

  const selectCourse = (courseSelect) => {
    setCourse(courseSelect);
  };
  return (
    <>
      <div className="d-flex text-center gap-5 p-2">
        <div
          className="d-flex flex-row flex-wrap w-50 justify-content-space-between gap-3 p-3"
          style={{
            height: "100vh",
            overflowY: "scroll",
            justifyContent: "space-between",
          }}
        >
          {courses.map((item) => (
            <CourseItem data={item} onSelect={selectCourse} />
          ))}
        </div>
        <div className="row flex-wrap justify-content-center w-50 ">
          <div>
            <img
              src={course.image}
              style={{
                width: "95%",
                height: "300px",
                borderRadius: "2%",
              }}
              alt=""
            />
            <div>
              <h2>{course.title}</h2>
            </div>
            <div>
              <p>{course.description}</p>
            </div>
            <div className="accordion" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    Section 1
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  className="accordion-collapse collapse show"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <strong>This is the first item's accordion body.</strong> It
                    is shown by default, until the collapse plugin adds the
                    appropriate classNamees that we use to style each element.
                    These classNamees control the overall appearance, as well as
                    the showing and hiding via CSS transitions. You can modify
                    any of this with custom CSS or overriding our default
                    variables. It's also worth noting that just about any HTML
                    can go within the <code>.accordion-body</code>, though the
                    transition does limit overflow.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    Section 2
                  </button>
                </h2>
                <div
                  id="collapseTwo"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <strong>This is the second item's accordion body.</strong>{" "}
                    It is hidden by default, until the collapse plugin adds the
                    appropriate classNamees that we use to style each element.
                    These classNamees control the overall appearance, as well as
                    the showing and hiding via CSS transitions. You can modify
                    any of this with custom CSS or overriding our default
                    variables. It's also worth noting that just about any HTML
                    can go within the <code>.accordion-body</code>, though the
                    transition does limit overflow.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseThree"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                  >
                    Section 3
                  </button>
                </h2>
                <div
                  id="collapseThree"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <strong>This is the third item's accordion body.</strong> It
                    is hidden by default, until the collapse plugin adds the
                    appropriate classNamees that we use to style each element.
                    These classNamees control the overall appearance, as well as
                    the showing and hiding via CSS transitions. You can modify
                    any of this with custom CSS or overriding our default
                    variables. It's also worth noting that just about any HTML
                    can go within the <code>.accordion-body</code>, though the
                    transition does limit overflow.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
