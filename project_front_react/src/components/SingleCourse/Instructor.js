import { Avatar, ListItemAvatar, Typography } from "@mui/material";
import { axiosInstance } from "api/config";
import React, { useCallback, useEffect, useState } from "react";

export default function Instructor({ course }) {
  const [instructor, setInstructor] = useState({ ...course.teacher });
  // const getData = useCallback(async () => {
  //   try {
  //     await axiosInstance
  //       .get(`user/Get_Specific_User/${course.userID}`)
  //       .then((res) => {
  //         setInstructor(res.data.data);
  //       })
  //       .catch((err) => console.log(err));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, []);

  // useEffect(() => {
  //   getData();
  // }, [getData]);

  return (
    <Typography component="div" className="d-flex flex-column py-4 gap-2 mt-3">
      <div className="row d-flex align-items-center">
        <div
          className="col-md-4 col-sm-12 d-flex mb-3"
          style={{ justifyContent: "center" }}
        >
          {/* <ListItemAvatar className="p-2 border border-5 rounded-circle"> */}
          <Avatar
            alt={instructor.name}
            src={`http://127.0.0.1:9000/${instructor.image}`}
            sx={{ width: 120, height: 120 }}
          />
          {/* </ListItemAvatar> */}
        </div>
        <div className="col-md-8 col-12 d-flex flex-column">
          <div className="col-12 d-flex ">
            <div className="col-6 text-center">
              <Typography variant="h5">{instructor.name}</Typography>
              <Typography variant="body2">{instructor.phonenumber}</Typography>
            </div>

            <div className="col-6 text-center">
              <Typography variant="h5">Subject</Typography>
              <Typography variant="body1">{instructor.subject}</Typography>
            </div>
          </div>
          <hr />
          <div className="col-12 d-flex flex-column mt-3">
            <Typography variant="h5">Description</Typography>
            <Typography variant="body1">{instructor.description}</Typography>
          </div>
        </div>
      </div>
    </Typography>
  );
}
