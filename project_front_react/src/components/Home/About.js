import image from "../../assets/img/about.jpg";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
export default function About() {
  return (
    <>
      {/* <!-- About Start --> */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-5">
            <div
              className="col-lg-6 wow fadeInUp"
              data-wow-delay="0.1s"
              style={{ minHeight: "400px" }}
            >
              <div className="position-relative h-100">
                <img
                  className="img-fluid position-absolute w-100 h-100"
                  src={image}
                  alt=""
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
            <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.3s">
              <h6 className="section-title bg-white text-start text-primary pe-3">
                About Us
              </h6>
              <h1 className="mb-4">Welcome to eLEARNING</h1>
              <p className="mb-4">
                Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit.
                Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit.
              </p>
              <p className="mb-4">
                Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit.
                Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit,
                sed stet lorem sit clita duo justo magna dolore erat amet
              </p>
              <div className="row gy-2 gx-4 mb-4">
                <div className="col-sm-6">
                  <p className="mb-0">
                    <FaArrowRight className="text-primary me-2" />
                    Skilled Instructors
                  </p>
                </div>
                <div className="col-sm-6">
                  <p className="mb-0">
                    <FaArrowRight className="text-primary me-2" />
                    Online classNamees
                  </p>
                </div>
                <div className="col-sm-6">
                  <p className="mb-0">
                    <FaArrowRight className="text-primary me-2" />
                    International Certificate
                  </p>
                </div>
                <div className="col-sm-6">
                  <p className="mb-0">
                    <FaArrowRight className="text-primary me-2" />
                    Skilled Instructors
                  </p>
                </div>
                <div className="col-sm-6">
                  <p className="mb-0">
                    <FaArrowRight className="text-primary me-2" />
                    Online classNames
                  </p>
                </div>
                <div className="col-sm-6">
                  <p className="mb-0">
                    <FaArrowRight className="text-primary me-2" />
                    International Certificate
                  </p>
                </div>
              </div>
              <Link className="btn btn-primary py-3 px-5 mt-2" to="/">
                Read More
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- About End --> */}
    </>
  );
}
