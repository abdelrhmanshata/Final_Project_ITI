import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  Grid,
  Rating,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { FcClock, FcReading } from "react-icons/fc";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));
export default function CourseItem({ data }) {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Card key={data.id} sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={<Avatar src={data.instructor.image} aria-label="recipe" />}
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title={data.instructor.name}
        subheader="March 05, 2024"
      />
      <CardMedia
        component="img"
        height="194"
        image={data.image}
        alt="Course Image"
      />
      <CardContent sx={{ width: 345 }}>
        <Typography variant="body1">{data.course_type}</Typography>
        <Typography variant="body1" className="fw-bold my-2" color="black">
          {data.title}
        </Typography>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Rating name="read-only" value={data.rating} readOnly />
          <small className="mx-auto">
            {data.rating} ( {data.students_rating} + reviews)
          </small>
        </div>
        <Grid className="my-0" container spacing={2}>
          <Grid item xs={9}>
            <div className="d-flex align-items-center gap-2">
              <FcReading />
              <small> 5 lessons</small>
              <FcClock />
              <small> {data.hours}</small>
            </div>
          </Grid>
          <Grid item xs={3}>
            <small>{data.price}</small>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton aria-label="visibility course">
          <VisibilityIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Course Description</Typography>
          <Typography paragraph>{data.description}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
