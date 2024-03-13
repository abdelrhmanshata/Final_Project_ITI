import { Typography } from "@mui/material";
import { axiosInstance } from "api/config";
import React, { useCallback, useEffect, useState } from "react";
import { BiCheckCircle } from "react-icons/bi";

export default function Overview({ course }) {
  const [requirements, setRequirements] = useState([]);
  const [skills, setSkills] = useState([]);
  const getRequirementsData = useCallback(async () => {
    try {
      await axiosInstance
        .get(`course/${course.id}/getAllRequirements/`)
        .then((res) => {
          if (typeof res.data.message != "string")
            setRequirements(res.data.message);
          else {
            setRequirements([]);
          }
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }, [course.id]);

  const getSkillsData = useCallback(async () => {
    try {
      await axiosInstance
        .get(`course/${course.id}/getAllWhatYoullLearns/`)
        .then((res) => {
          if (typeof res.data.message != "string") {
            setSkills(res.data.message);
          } else {
            setSkills([]);
          }
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }, [course.id]);

  useEffect(() => {
    getRequirementsData();
    getSkillsData();
  }, [course.id]);

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
          {skills.map((skill, index) => (
            <div key={index} className="col-md-6 col-12">
              <BiCheckCircle fontSize={20} color="black" />
              <span> {skill.whatYoullLearnDescription}</span>
            </div>
          ))}
        </div>
      </Typography>
      {/*Requirements */}
      <Typography component="div" className="d-flex flex-column py-3 gap-1">
        <Typography gutterBottom variant="h4" component="div">
          Requirements
        </Typography>
        <div className="row d-flex flex-wrap ">
          {requirements.map((requirement, index) => (
            <div key={index} className="col-md-6 col-12">
              <BiCheckCircle fontSize={20} color="black" />
              <span> {requirement.requirementDescription}</span>
            </div>
          ))}
        </div>
      </Typography>
    </>
  );
}
