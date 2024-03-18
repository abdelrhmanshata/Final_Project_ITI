import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Rating } from "@mui/material";

export default function StudentReviews({ course }) {
  return (
    <List className="w-100" sx={{ bgcolor: "background.paper" }}>
      {course.reviews.map((item, index) => (
        <>
          <ListItem key={index} alignItems="flex-start">
            <ListItemAvatar>
              <Avatar
                alt={item.courseID}
                src={require("../../assets/img/avatar-1.jpg")}
              />
            </ListItemAvatar>

            <ListItemText
              primary={item.studentName}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {item.reviewText}
                  </Typography>
                </React.Fragment>
              }
            />
            <Rating name="read-only" value={item.courseReviewScore} readOnly />
          </ListItem>
          <Divider variant="inset" component="li" />
        </>
      ))}
    </List>
  );
}
