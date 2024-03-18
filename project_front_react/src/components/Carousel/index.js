import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";
export default function CarouselSlider() {
  const [list] = useState([
    {
      image: require("../../assets/img/learing1.jpg"),
      title1: "Best Online Courses",
      title2: "The Best Online Learning Platform",
      description:
        "Vero elitr justo clita lorem. Ipsum dolor at sed stet sit diam no. Kasd rebum ipsum et diam justo clita et kasd rebum sea sanctus eirmod elitr.",
    },
    {
      image: require("../../assets/img/learing2.jpg"),
      title1: "Best Online Courses",
      title2: "The Best Online Learning Platform",
      description:
        "Vero elitr justo clita lorem. Ipsum dolor at sed stet sit diam no. Kasd rebum ipsum et diam justo clita et kasd rebum sea sanctus eirmod elitr.",
    },
    {
      image: require("../../assets/img/learing3.jpg"),
      title1: "Best Online Courses",
      title2: "The Best Online Learning Platform",
      description:
        "Vero elitr justo clita lorem. Ipsum dolor at sed stet sit diam no. Kasd rebum ipsum et diam justo clita et kasd rebum sea sanctus eirmod elitr.",
    },
  ]);
  return (
    <>
      {/* <!-- Carousel Start --> */}
      <Carousel className="bg-primary">
        {list.map((item, index) => (
          <Carousel.Item
            key={index}
            className="owl-carousel-item position-relative"
          >
            <Image
              src={item.image}
              className="img-fluid"
              style={{ height: "85vh", width: "100vw" }}
              alt="..."
            />
            <div
              className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center"
              style={{ background: "rgba(24, 29, 56, .5)" }}
            >
              <div className="container">
                <div className="row justify-content-start">
                  <div className="col-sm-10 col-lg-8">
                    <h5 className="text-primary text-uppercase mb-3 animated slideInDown">
                      {item.title1}
                    </h5>
                    <h1 className="display-3 text-white animated slideInDown">
                      {item.title2}
                    </h1>
                    <p className="fs-5 text-white mb-4 pb-2">
                      {item.description}
                    </p>
                    <Link
                      to="/Aboutus"
                      className="btn btn-primary py-md-3 px-md-5 me-3 animated slideInLeft"
                    >
                      Read More
                    </Link>
                    <Link
                      to="/courses"
                      className="btn btn-light py-md-3 px-md-5 animated slideInRight"
                    >
                      List All
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
      {/* <!-- Carousel End --> */}
    </>
  );
}
