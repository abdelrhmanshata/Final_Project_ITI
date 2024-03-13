import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import Typography from "@mui/material/Typography";
import courseImage from "../../assets/img/course-1.jpg";
import { useNavigate } from "react-router-dom";

export default function CourseStudent({ data }) {
  const navigate = useNavigate();

  return (
    <Card sx={{ maxWidth: 345 }} onClick={() => navigate(`/lesson/${data.id}`)}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={courseImage}
      />
      <CardContent>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography gutterBottom variant="h7" component="div">
            Web Design
          </Typography>
          <Typography variant="h7" color="text.primary">
            $149.00
          </Typography>
        </div>
        <Typography variant="body2" color="text.secondary">
          This course web design for beginner
        </Typography>
      </CardContent>

      {/* <CardActions style={{ width: "100%" }}></CardActions> */}
    </Card>
  );
}
