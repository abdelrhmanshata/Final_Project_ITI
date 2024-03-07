import React from "react";
import { Paper } from "@mui/material";
import { Image } from "react-bootstrap";
export default function CourseDetails() {
  return (
    <>
      <Paper className="p-2">
        <div>
          <Image
            width={"100%"}
            height={250}
            src={require("../../assets/img/course-1.jpg")}
            rounded
          />
        </div>
      </Paper>
    </>
  );
}
