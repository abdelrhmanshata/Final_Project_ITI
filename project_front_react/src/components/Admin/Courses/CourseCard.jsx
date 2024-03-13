import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export default function CourseCard({ data, onSelect }) {
  return (
    <>
      <Card sx={{ width: 200, height: 250, maxWidth: 200, maxHeight: 250 }}>
        <CardActionArea
          onClick={() => {
            onSelect(data);
          }}
        >
          <CardMedia
            component="img"
            height="140"
            image={`http://127.0.0.1:9000/${data.courseImage}`}
            alt={data.courseName}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {data.courseName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {data.courseDescription}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
}
