import React from "react";
import { Button, Fab, Paper } from "@mui/material";
import { Image } from "react-bootstrap";
import { BiBookReader, BiSolidRightArrow } from "react-icons/bi";
import {
  MdOutlineAccessTime,
  MdOutlineGTranslate,
  MdOutlineOndemandVideo,
} from "react-icons/md";
import { TbCertificate } from "react-icons/tb";
import { BsCalendarDate } from "react-icons/bs";
import { VscSettings } from "react-icons/vsc";

export default function CourseDetails({ data }) {
  return (
    <>
      <Paper className="p-2">
        <div className="position-relative">
          <Image
            width={"100%"}
            height={250}
            src={`http://127.0.0.1:9000/course/get_image/${data.id}`}
            rounded
            className="border border-2 border-primary"
          />
          <div className="position-absolute top-50 start-50 translate-middle">
            <Fab color="primary">
              <BiSolidRightArrow size={24} />
            </Fab>
          </div>
        </div>
        <div className="d-flex flex-column p-4 gap-3">
          <Button className="bg-primary" variant="contained">
            Buy Now
          </Button>
          <Button variant="contained" color="warning">
            Enroll
          </Button>
        </div>
        <div className="d-flex flex-column p-4 gap-3">
          <div className="d-flex align-items-center gap-2">
            <MdOutlineAccessTime size={20} />
            <span className="w-50">Duration</span>
            <span className="w-50 text-end">43 weeks</span>
          </div>
          <div className="d-flex align-items-center gap-2">
            <MdOutlineOndemandVideo size={20} />
            <span className="w-50">Lectures</span>
            <span className="w-50 text-end">{data.courseLessons}</span>
          </div>
          <div className="d-flex align-items-center gap-2">
            <BiBookReader size={20} />
            <span className="w-50">Enrolled</span>
            <span className="w-50 text-end">1982 students</span>
          </div>
          <div className="d-flex align-items-center gap-2">
            <MdOutlineGTranslate size={20} />
            <span className="w-50">Language</span>
            <span className="w-50 text-end">English</span>
          </div>
          <div className="d-flex align-items-center gap-2">
            <VscSettings size={20} />
            <span className="w-50">Skill level</span>
            <span className="w-50 text-end">beginner</span>
          </div>
          <div className="d-flex align-items-center gap-2">
            <BsCalendarDate size={20} />
            <span className="w-50">Deadline</span>
            <span className="w-50 text-end">06 April 2020</span>
          </div>
          <div className="d-flex align-items-center gap-2">
            <TbCertificate size={20} />
            <span className="w-50">Certificate</span>
            <span className="w-50 text-end">Yes</span>
          </div>
        </div>
      </Paper>
    </>
  );
}
