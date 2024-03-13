import { Avatar, ListItemAvatar, Typography } from "@mui/material";
import { axiosInstance } from "api/config";
import React, { useCallback, useEffect, useState } from "react";
import { BiMessageRoundedEdit, BiMoviePlay, BiStar } from "react-icons/bi";
import { PiStudentBold } from "react-icons/pi";

export default function Instructor({ course }) {
  const [instructor, setInstructor] = useState({});
  const getData = useCallback(async () => {
    try {
      await axiosInstance
        .get(`user/Get_Specific_User/${course.userID}`)
        .then((res) => {
          setInstructor(res.data.data);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <Typography component="div" className="d-flex flex-column py-4 gap-2 mt-3">
      <div className="d-flex align-items-center gap-4">
        <ListItemAvatar className="p-2 border border-5 rounded-circle">
          <Avatar
            alt={instructor.name}
            src={`http://127.0.0.1:9000/${instructor.image}`}
            sx={{ width: 120, height: 120 }}
          />
        </ListItemAvatar>
        <div className="d-flex flex-column ">
          <Typography variant="h4">{instructor.name}</Typography>
          <Typography variant="body2">{instructor.phonenumber}</Typography>
          <br />
          <Typography variant="h5">Subject</Typography>
          <Typography variant="body1">{instructor.subject}</Typography>
          <br />
          <Typography variant="h5">Description</Typography>
          <Typography variant="body1">{instructor.description}</Typography>
        </div>
      </div>
      {/* <div className="d-flex justify-content-between align-items-center my-4">
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
      </div> */}
    </Typography>
  );
}
