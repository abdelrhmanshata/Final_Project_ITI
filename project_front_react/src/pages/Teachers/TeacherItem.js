import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Grid, Rating } from "@mui/material";

export default function TeacherItem({ data }) {
  return (
    <Card key={data.id} sx={{ width: 350, maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="250"
          image={data.image}
          alt="Instructor Image"
        />
        <CardContent>
          <Typography variant="h6">{data.name}</Typography>
          <Grid className="my-0" container spacing={2}>
            <Grid item xs={6}>
              <div className="d-flex align-items-center ">
                <small className="overflow-hidden">{data.category}</small>
              </div>
            </Grid>
            <Grid item xs={6}>
              <Rating name="read-only" value={data.rating} readOnly />
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}