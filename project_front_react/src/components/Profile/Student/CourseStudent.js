import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { CardActionArea, Grid, Rating } from "@mui/material";
import { MdOutlineAccessTime, MdOutlineOndemandVideo } from "react-icons/md";
import { GrCurrency } from "react-icons/gr";

export default function CourseStudent({ data, type }) {
  const navigate = useNavigate();

  return (
    <Card key={data.id} sx={{ width: 350, maxWidth: 345 }}>
      <CardActionArea
        onClick={() => {
          navigate(`/lesson/${data.id}`);
        }}
      >
        <CardMedia
          component="img"
          height="250"
          image={`http://127.0.0.1:9000/${data.courseImage}`}
          alt="Courses Image"
        />

        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={9}>
              <Typography variant="h6">{data.courseName}</Typography>
            </Grid>

            <Grid item xs={3} className="text-center">
              <Typography
                variant="body1"
                color={type === "Payment" ? "green" : "blue"}
              >
                {type}
              </Typography>
            </Grid>
          </Grid>

          <Grid className="my-0" container spacing={2}>
            <Grid item xs={6} className="text-center">
              <div className="d-flex align-items-center gap-2">
                <MdOutlineAccessTime size={20} />
                <span className="w-50">Duration</span>
                <span className="w-50 text-end">{data.courseHours} h </span>
              </div>
            </Grid>

            <Grid item xs={6} className="text-center">
              <div className="d-flex align-items-center gap-2">
                <MdOutlineOndemandVideo size={20} />
                <span className="w-50">Lectures</span>
                <span className="w-50 text-end">{data.courseLessons}</span>
              </div>
            </Grid>
          </Grid>
          <Grid className="my-0" container spacing={2}>
            <Grid item xs={6} className="text-center">
              <div className="d-flex align-items-center gap-2">
                <GrCurrency size={20} />
                <span className="w-50">Price</span>
                <span className="w-50 text-end">{data.coursePrice} $</span>
              </div>
            </Grid>

            <Grid item xs={6} className="text-center">
              <Rating
                name="read-only"
                value={data.courseReviewScore}
                readOnly
              />
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
