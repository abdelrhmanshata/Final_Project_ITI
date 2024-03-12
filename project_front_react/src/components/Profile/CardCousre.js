import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import ExpandIcon from "./ExpandIcon";

export default function CardCourse({ course }) {
  return (
    <Card sx={{ width: 350, maxWidth: 350 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="150"
        image={`http://127.0.0.1:9000/${course.courseImage}`}
      />
      <CardContent>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography gutterBottom variant="h7" component="div">
            {course.courseName}
          </Typography>
          <Typography variant="h7" color="text.primary">
            $ {course.coursePrice}
          </Typography>
        </div>
        <Typography variant="body2" color="text.secondary">
          {course.courseDescription}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          style={{ marginTop: "10px" }}
        >
          <ExpandIcon courseId={course.id} style={{ width: "100%" }} />
        </Typography>
      </CardContent>
      <CardActions style={{ width: "100%" }} />
    </Card>
  );
}
