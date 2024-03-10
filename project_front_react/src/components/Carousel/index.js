import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";
import carousel_1 from "../../assets/img/carousel-2.jpg";
export default function CarouselSlider() {
  const [list] = useState([
    {
      image:
        "https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjU0NmJhdGNoMy1teW50LTM0LWJhZGdld2F0ZXJjb2xvcl8xLmpwZw.jpg",
      title1: "Best Online Courses",
      title2: "The Best Online Learning Platform",
      description:
        "Vero elitr justo clita lorem. Ipsum dolor at sed stet sit diam no. Kasd rebum ipsum et diam justo clita et kasd rebum sea sanctus eirmod elitr.",
    },
    {
      image:
        "https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjU0NmJhdGNoMy1teW50LTM0LWJhZGdld2F0ZXJjb2xvcl8xLmpwZw.jpg",
      title1: "Best Online Courses",
      title2: "The Best Online Learning Platform",
      description:
        "Vero elitr justo clita lorem. Ipsum dolor at sed stet sit diam no. Kasd rebum ipsum et diam justo clita et kasd rebum sea sanctus eirmod elitr.",
    },
    {
      image:
        "https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjU0NmJhdGNoMy1teW50LTM0LWJhZGdld2F0ZXJjb2xvcl8xLmpwZw.jpg",
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
              src={carousel_1}
              className="img-fluid"
              style={{ height: "80vh", width: "100vw" }}
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
                      to="/"
                      className="btn btn-primary py-md-3 px-md-5 me-3 animated slideInLeft"
                    >
                      Read More
                    </Link>
                    <Link
                      to="/"
                      className="btn btn-light py-md-3 px-md-5 animated slideInRight"
                    >
                      Join Now
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
