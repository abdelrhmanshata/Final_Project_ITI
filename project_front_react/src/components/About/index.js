import { Link } from "react-router-dom";
import image from "../../assets/img/about.jpg";
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
                Welcome to E-Learning Platform, where learning knows no bounds.
                Our mission is to provide accessible, high-quality education to
                learners worldwide, empowering them to pursue their passions and
                achieve their goals.
              </p>
              <p className="mb-4">
                At Your E-Learning Platform , we believe that education should
                be inclusive, flexible, and engaging. That's why we offer a
                diverse range of courses taught by industry experts, covering
                topics spanning from technology and business to arts and
                humanities. Whether you're a beginner looking to explore new
                interests or a professional aiming to enhance your skills, we
                have something for everyone.
              </p>
              <div className="row gy-2 gx-4 mb-4">
                <div className="col-sm-6">
                  <p className="mb-0">
                    <i className="fa fa-arrow-right text-primary me-2"></i>
                    Skilled Instructors
                  </p>
                </div>
                <div className="col-sm-6">
                  <p className="mb-0">
                    <i className="fa fa-arrow-right text-primary me-2"></i>
                    Online classNamees
                  </p>
                </div>
                <div className="col-sm-6">
                  <p className="mb-0">
                    <i className="fa fa-arrow-right text-primary me-2"></i>
                    International Certificate
                  </p>
                </div>
                <div className="col-sm-6">
                  <p className="mb-0">
                    <i className="fa fa-arrow-right text-primary me-2"></i>
                    Interactive Learning Experience
                  </p>
                </div>
              </div>
              <Link className="btn btn-primary py-3 px-5 mt-2" to="/Aboutus">
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
