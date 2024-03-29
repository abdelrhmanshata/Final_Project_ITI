import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Grid, Rating } from "@mui/material";
import { Link } from "react-router-dom";

export default function TeacherItem({ data }) {
  return (
    <Card sx={{ width: 350, maxWidth: 345 }}>
      <CardActionArea>
        <Link to={`/single/${data.id}`}>
          <CardMedia
            component="img"
            height="250"
            image={`http://127.0.0.1:9000/${data.image}`}
            alt="Instructor Image"
          />
        </Link>

        <CardContent>
          <Typography variant="h6">{data.name}</Typography>
          <Typography variant="body2">{data.phonenumber}</Typography>
          <Grid className="my-0" container spacing={2}>
            <Grid item xs={6}>
              <div className="d-flex align-items-center ">
                <small className="overflow-hidden">
                  {data.subject} Teacher
                </small>
              </div>
            </Grid>
            <Grid item xs={6}>
              <Rating
                name="read-only"
                value={data.teacher_avg_score}
                readOnly
              />
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
