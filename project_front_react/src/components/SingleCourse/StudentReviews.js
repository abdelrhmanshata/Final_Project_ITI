import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Rating } from "@mui/material";

export default function StudentReviews() {
  const listReviews = [
    {
      image: require("../../assets/img/team-0.jpg"),
      name: "AbdElrhman",
      review: 4,
      comment:
        "This course was well organized and covered a lot more details han any other Figma courses.",
    },
    {
      image: require("../../assets/img/team-1.jpg"),
      name: "Yossif",
      review: 3,
      comment:
        "This course was well organized and covered a lot more details han any other Figma courses.",
    },
    {
      image: require("../../assets/img/team-2.jpg"),
      name: "Mona",
      review: 5,
      comment:
        "This course was well organized and covered a lot more details han any other Figma courses.",
    },
    {
      image: require("../../assets/img/team-3.jpg"),
      name: "Mohamed",
      review: 2,
      comment:
        "This course was well organized and covered a lot more details han any other Figma courses.",
    },
    {
      image: require("../../assets/img/team-4.jpg"),
      name: "Yara",
      review: 5,
      comment:
        "This course was well organized and covered a lot more details han any other Figma courses.",
    },
  ];

  return (
    <List className="w-100" sx={{ bgcolor: "background.paper" }}>
      {listReviews.map((item, index) => (
        <>
          <ListItem key={index} alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt={item.name} src={item.image} />
            </ListItemAvatar>

            <ListItemText
              primary={item.name}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {item.comment}
                  </Typography>
                </React.Fragment>
              }
            />
            <Rating name="read-only" value={item.review} readOnly />
          </ListItem>
          <Divider variant="inset" component="li" />
        </>
      ))}
    </List>
  );
}
