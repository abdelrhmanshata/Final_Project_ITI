import React, { useCallback, useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { styled } from "@mui/material/styles";
import { FcClock, FcReading } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "api/config";
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
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const getUserData = useCallback(async () => {
    try {
      await axiosInstance
        .get(`user/Get_Specific_User/${data.userID}`)
        .then((res) => {
          setUser(res.data.data);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }, [data.userID]);

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  return (
    <Card key={"" + data.id} sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar
            src={`http://127.0.0.1:9000/${user.image}`}
            aria-label="recipe"
          />
        }
        title={user.name}
        subheader={data.courseDate}
      />
      <CardMedia
        component="img"
        height="200"
        image={`http://127.0.0.1:9000/${data.courseImage}`}
        alt="Course Image"
      />
      <CardContent sx={{ width: 345 }}>
        <Typography variant="body1">{data.courseType}</Typography>
        <Typography variant="body1" className="fw-bold my-2" color="black">
          {data.courseName}
        </Typography>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Rating name="read-only" value={data.courseReviewScore} readOnly />
          <small className="mx-auto">
            {data.courseReviewScore} ( {150} + reviews)
          </small>
        </div>
        <Grid className="my-0" container spacing={2}>
          <Grid item xs={9}>
            <div className="d-flex align-items-center gap-2">
              <FcReading />
              <small>{data.courseLessons} lessons</small>
              <FcClock />
              <small>{data.courseHours}h</small>
            </div>
          </Grid>
          <Grid item xs={3}>
            <small>$ {data.coursePrice}</small>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
        {/* <IconButton aria-label="share">
          <ShareIcon />
        </IconButton> */}
        <IconButton
          aria-label="visibility course"
          onClick={() => {
            navigate(`/course/${data.id}`);
          }}
        >
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
          <Typography paragraph>{data.courseDescription}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
