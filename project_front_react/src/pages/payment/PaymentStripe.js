import { Button, Container, Grid, Paper, Typography } from "@mui/material";
import { axiosInstance } from "api/config";
import Footer from "components/Footer";
import Navbar from "components/Navbar";
import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { BsCalendarDate } from "react-icons/bs";
import { MdOutlineAccessTime, MdOutlineOndemandVideo } from "react-icons/md";
import { useParams } from "react-router-dom";
import { GrCurrency } from "react-icons/gr";

export default function PaymentStripe() {
  const [course, setCourse] = useState({});
  const params = useParams();

  const getCourseData = async () => {
    await axiosInstance
      .get(`course/listAllCourses/${params.courseID}`)
      .then((res) => {
        setCourse(res.data.message[0]);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getCourseData();
  }, []);

  return (
    <>
      <Navbar />
      <Container fixed className="d-flex justify-content-center mt-5">
        <Grid item>
          <Paper className="p-2">
            <Image
              width={"100%"}
              height={250}
              src={`http://127.0.0.1:9000/${course.courseImage}`}
              rounded
              className="border border-2 border-primary"
            />
            <div className="container mt-3">
              <Typography variant="h4" component="h4">
                {course.courseName}
              </Typography>

              <Typography variant="body2">
                {course.courseDescription}
              </Typography>
            </div>
            <div className="d-flex flex-column p-4 gap-3">
              <div className="d-flex align-items-center gap-2">
                <MdOutlineAccessTime size={20} />
                <span className="w-50">Duration</span>
                <span className="w-50 text-end">{course.courseHours} h</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <MdOutlineOndemandVideo size={20} />
                <span className="w-50">Lectures</span>
                <span className="w-50 text-end">{course.courseLessons}</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <BsCalendarDate size={20} />
                <span className="w-50">Created</span>
                <span className="w-50 text-end">{course.courseDate}</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <GrCurrency size={20} />
                <span className="w-50">Price</span>
                <span className="w-50 text-end">{course.coursePrice} $</span>
              </div>
            </div>
            <div className="d-flex justify-content-center m-2 ">
              <form
                action={`http://127.0.0.1:9000/api/create-checkout-session/${course.id}/`}
                method="POST"
              >
                <Button
                  type="submit"
                  className="bg-primary"
                  variant="contained"
                >
                  Checkout
                </Button>
              </form>
            </div>
          </Paper>
        </Grid>
      </Container>
      <br />
      <br />
      <Footer />
    </>
  );
}
