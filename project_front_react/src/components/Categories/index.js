import { Link } from "react-router-dom";
import image1 from "../../assets/img/cat-1.jpg";
import image2 from "../../assets/img/cat-5.jpg";
import image3 from "../../assets/img/cat-3.jpg";
import image4 from "../../assets/img/cat-4.jpg";
export default function Categories() {
  return (
    <>
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
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
