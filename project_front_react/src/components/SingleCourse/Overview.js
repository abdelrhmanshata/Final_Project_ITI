import { Typography } from "@mui/material";
import React from "react";
import { BiCheckCircle } from "react-icons/bi";

export default function Overview({ course }) {
  const skillsList = [
    "Become a UI/UX designer.",
    "Build & test a complete mobile app.",
    "will be able to start earning money skills.",
    "Learn to design mobile apps & websites.",
    "Build a UI project from beginning to end.",
    "Design 3 different logos.",
    "Work with colors & fonts.",
    "Create low-fidelity wireframe.",
    "You will create your own UI Kit.",
    "Downloadable exercise files.",
  ];

  const requirements = [
    "We do not require any previous experience or pre-defined skills to take this course. A great orientation would be enough to master UI/UX design.",
    "A computer with a good internet connection.",
    "Adobe Photoshop (OPTIONAL)",
  ];

  return (
    <>
      <Typography component="div" className="d-flex flex-column py-3 gap-1">
        {/*  Course Description */}
        <Typography gutterBottom variant="h4" component="div">
          Course Description
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {course.courseDescription}
        </Typography>
      </Typography>
      {/* What you'll learn */}
      <Typography component="div" className="d-flex flex-column py-3 gap-1">
        <Typography gutterBottom variant="h4" component="div">
          What you'll learn
        </Typography>
        <div className="row d-flex flex-wrap ">
          {skillsList.map((skill, index) => (
            <div key={index} className="col-md-6 col-12">
              <BiCheckCircle fontSize={20} color="black" />
              <span> {skill}</span>
            </div>
          ))}
        </div>
      </Typography>
      {/*Requirements */}
      <Typography component="div" className="d-flex flex-column py-3 gap-1">
        <Typography gutterBottom variant="h4" component="div">
          Requirements
        </Typography>
        <div className="row d-flex flex-wrap gap-3">
          {requirements.map((requirement, index) => (
            <div key={index}>
              <BiCheckCircle fontSize={20} color="black" />
              <span> {requirement}</span>
            </div>
          ))}
        </div>
      </Typography>
    </>
  );
}
