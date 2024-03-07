import { Avatar, ListItemAvatar, Typography } from "@mui/material";
import React from "react";
import { BiMessageRoundedEdit, BiMoviePlay, BiStar } from "react-icons/bi";
import { PiStudentBold } from "react-icons/pi";

export default function Instructor() {
  return (
    <Typography component="div" className="d-flex flex-column py-4 gap-2">
      <div className="d-flex align-items-center gap-4">
        <ListItemAvatar className="p-2 border border-5 rounded-circle">
          <Avatar
            alt="Remy Sharp"
            src={require("../../assets/img/team-0.jpg")}
            sx={{ width: 120, height: 120 }}
          />
        </ListItemAvatar>
        <div className="d-flex flex-column ">
          <Typography variant="h4">AbdElrhman Mohamed</Typography>
          <Typography variant="body2">
            Android Developer & UI Designer
          </Typography>
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center my-4">
        <div className="d-flex align-items-center gap-1">
          <BiStar size={24} />
          <span>4.87 Rating</span>
        </div>
        <div className="d-flex align-items-center gap-1">
          <BiMessageRoundedEdit size={24} />
          <span>1,533 Reviews</span>
        </div>
        <div className="d-flex align-items-center gap-1">
          <PiStudentBold size={24} />
          <span>23,912 Students</span>
        </div>
        <div className="d-flex align-items-center gap-1">
          <BiMoviePlay size={24} />
          <span>29 Courses</span>
        </div>
      </div>
      <Typography variant="body1">
        I am a UI/UX designer and an iOS developer with having almost six years
        of experience in application development and also ten years of graphic
        design and User Interface design.
      </Typography>
      <br />
      <Typography variant="body1">
        My passion is helping people to learn new skills in a short-term course
        and achieve their goals. I've been designing for more than ten years and
        developing iOS apps for four years. It's my honor if I could help you
        learn to program in a simple word. I currently am teaching iOS 13, Swift
        5, ARKit 3, Sketch 5, Illustrator, Photoshop, Cinema 4D, HTML, CSS,
        JavaScript, etc.
      </Typography>
      <br />
    </Typography>
  );
}
