import { Link } from "react-router-dom";
import image1 from "../../assets/img/cat-1.jpg";
import image2 from "../../assets/img/cat-5.jpg";
import image3 from "../../assets/img/cat-3.jpg";
import image4 from "../../assets/img/cat-4.jpg";
import { useCallback, useEffect, useState } from "react";
import { axiosInstance } from "api/config";
export default function Categories() {
  const [cats] = useState(["Arabic", "Science", "Computer Science", "English"]);
  const [categoryCourses] = useState([]);
  const getData = useCallback(() => {
    cats.forEach(async (item) => {
      try {
        await axiosInstance
          .get(`course/listCategoryCourses/${item}`)
          .then((res) => {
            console.log(res.data.message.length);
            categoryCourses.push(res.data.message.length);
          })
          .catch((err) => console.log(err));
      } catch (error) {
        console.log(error);
      }
    });
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <>
      {/* <!-- Categories Start --> */}
      <div className="container-xxl py-5 category">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title bg-white text-center text-primary px-3">
              Categories
            </h6>
            <h1 className="mb-5">Courses Categories</h1>
          </div>
          <div className="row g-3">
            <div className="col-lg-7 col-md-6">
              <div className="row g-3">
                <div
                  className="col-lg-12 col-md-12 wow zoomIn"
                  data-wow-delay="0.1s"
                >
                  <Link
                    className="position-relative d-block overflow-hidden"
                    to="/courses"
                  >
                    <img className="img-fluid" src={image1} alt="" />
                    <div
                      className="bg-white text-center position-absolute bottom-0 end-0 py-2 px-3"
                      style={{ margin: "1px" }}
                    >
                      <h5 className="m-0">Arabic</h5>
                      <small className="text-primary">
                        {categoryCourses[0]} Courses
                      </small>
                    </div>
                  </Link>
                </div>
                <div
                  className="col-lg-6 col-md-12 wow zoomIn"
                  data-wow-delay="0.3s"
                >
                  <Link
                    className="position-relative d-block overflow-hidden"
                    to="/courses"
                  >
                    <img className="img-fluid" src={image2} alt="" />
                    <div
                      className="bg-white text-center position-absolute bottom-0 end-0 py-2 px-3"
                      style={{ margin: "1px" }}
                    >
                      <h5 className="m-0">Science</h5>
                      <small className="text-primary">
                        {categoryCourses[1]} Courses
                      </small>
                    </div>
                  </Link>
                </div>
                <div
                  className="col-lg-6 col-md-12 wow zoomIn"
                  data-wow-delay="0.5s"
                >
                  <Link
                    className="position-relative d-block overflow-hidden"
                    to="/courses"
                  >
                    <img className="img-fluid" src={image3} alt="" />
                    <div
                      className="bg-white text-center position-absolute bottom-0 end-0 py-2 px-3"
                      style={{ margin: "1px" }}
                    >
                      <h5 className="m-0">Computer Science</h5>
                      <small className="text-primary">
                        {categoryCourses[2]} Courses
                      </small>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <div
              className="col-lg-5 col-md-6 wow zoomIn"
              data-wow-delay="0.7s"
              style={{ minHeight: "350px" }}
            >
              <Link
                className="position-relative d-block h-100 overflow-hidden"
                to="/courses"
              >
                <img
                  className="img-fluid position-absolute w-100 h-100"
                  src={image4}
                  alt=""
                  style={{ objectFit: "cover" }}
                />
                <div
                  className="bg-white text-center position-absolute bottom-0 end-0 py-2 px-3"
                  style={{ margin: "1px" }}
                >
                  <h5 className="m-0">English</h5>
                  <small className="text-primary">
                    {categoryCourses[3]} Courses
                  </small>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Categories Start --> */}
    </>
  );
}
