import React, { useEffect } from "react";
import { Button, Fab, Paper, Rating } from "@mui/material";
import { Image } from "react-bootstrap";
import { BiBookReader, BiSolidRightArrow } from "react-icons/bi";
import { MdOutlineAccessTime, MdOutlineOndemandVideo } from "react-icons/md";
import { BsCalendarDate } from "react-icons/bs";
import { GrCurrency } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { FcRating } from "react-icons/fc";
import { useState } from "react";

export default function CourseDetails({ data }) {
  const navigate = useNavigate();

  const [ratingValue, setRatingValue] = useState(0);

  useEffect(() => {
    setRatingValue(data.courseReviewScore);
  }, []);

  return (
    <>
      <Paper className="p-2">
        <div className="position-relative">
          <Image
            width={"100%"}
            height={250}
            src={data.courseImage}
            rounded
            className="border border-2 border-primary"
          />
          <div className="position-absolute top-50 start-50 translate-middle">
            <Fab color="primary" onClick={() => navigate(`/lesson/${data.id}`)}>
              <BiSolidRightArrow size={24} />
            </Fab>
          </div>
        </div>
        <div className="d-flex flex-column p-4 gap-3">
          <Button
            className="bg-primary"
            variant="contained"
            onClick={() => navigate(`/payment/${data.id}`)}
          >
            Buy Now
          </Button>
          <Button
            variant="contained"
            color="warning"
            onClick={() => navigate(`/payment/completed`)}
          >
            Enroll
          </Button>
        </div>
        <div className="d-flex flex-column p-4 gap-3">
          <div className="d-flex align-items-center gap-2">
            <MdOutlineAccessTime size={20} />
            <span className="w-50">Duration</span>
            <span className="w-50 text-end">{data.courseHours} h</span>
          </div>
          <div className="d-flex align-items-center gap-2">
            <MdOutlineOndemandVideo size={20} />
            <span className="w-50">Lectures</span>
            <span className="w-50 text-end">{data.courseLessons}</span>
          </div>

          <div className="d-flex align-items-center gap-2">
            <BsCalendarDate size={20} />
            <span className="w-50">Created</span>
            <span className="w-50 text-end">{data.courseDate}</span>
          </div>
          <div className="d-flex align-items-center gap-2">
            <GrCurrency size={20} />
            <span className="w-50">Price</span>
            <span className="w-50 text-end">{data.coursePrice} $</span>
          </div>

          <div className="d-flex align-items-center gap-2">
            <BsCalendarDate size={20} />
            <span className="w-50">Created</span>
            <span className="w-50 text-end">{data.courseDate}</span>
          </div>

          <div className="d-flex align-items-center gap-2">
            <BiBookReader size={20} />
            <span className="w-50">Enrolled</span>
            <span className="w-50 text-end">1982 students</span>
          </div>
          <div className="d-flex align-items-center gap-2">
            <FcRating size={20} />
            <span className="w-50">Rating</span>
            <span className="w-50 text-end">
              <Rating name="read-only" value={ratingValue} readOnly />
            </span>
          </div>

          {/* <div className="d-flex align-items-center gap-2">
            <MdOutlineGTranslate size={20} />
            <span className="w-50">Language</span>
            <span className="w-50 text-end">English</span>
          </div> */}
          {/* <div className="d-flex align-items-center gap-2">
            <VscSettings size={20} />
            <span className="w-50">Skill level</span>
            <span className="w-50 text-end">beginner</span>
          </div> */}
          {/* <div className="d-flex align-items-center gap-2">
            <BsCalendarDate size={20} />
            <span className="w-50">Deadline</span>
            <span className="w-50 text-end">06 April 2020</span>
          </div> */}
          {/* <div className="d-flex align-items-center gap-2">
            <TbCertificate size={20} />
            <span className="w-50">Certificate</span>
            <span className="w-50 text-end">Yes</span>
          </div> */}
        </div>
      </Paper>
    </>
  );
}
