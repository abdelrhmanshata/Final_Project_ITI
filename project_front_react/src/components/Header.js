import { FaBook, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
export default function Header() {
  return (
    <>
      {/* // <!-- Navbar Start --> */}
      <nav className="navbar navbar-expand-lg bg-white navbar-light shadow sticky-top p-2">
        <Link
          className="navbar-brand d-flex align-items-center px-4 px-lg-5"
          to="/"
        >
          <FaBook style={{ width: 30, height: 30, color: "#06bbcc" }} />
          <h2 className="m-0 text-primary">
            <i className="fa fa-book me-3"></i>E-LEARNING
          </h2>
        </Link>
        <button
          type="button"
          className="navbar-toggler me-4"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav ms-auto p-4 p-lg-0">
            <Link className="nav-item nav-link active fs-6 fw-bold" to="/">
              Home
            </Link>
            <Link className="nav-item nav-link fs-6 fw-bold" to="/">
              About
            </Link>
            <Link className="nav-item nav-link fs-6 fw-bold" to="/">
              Courses
            </Link>
            <div className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle fs-6 fw-bold"
                data-bs-toggle="dropdown"
                to="/"
              >
                Pages
              </Link>
              <div className="dropdown-menu fade-down m-0">
                <Link className="dropdown-item fs-6 " to="/">
                  Our Team
                </Link>
                <Link className="dropdown-item fs-6 " to="/">
                  Testimonial
                </Link>
                <Link className="dropdown-item fs-6 " to="/">
                  404 Page
                </Link>
              </div>
            </div>
            <Link className="nav-item nav-link fs-6 fw-bold " to="/">
              Contact
            </Link>
          </div>
          <Link
            className="btn btn-primary py-4 px-lg-5 d-none d-lg-block fs-5 fw-bold"
            to="/"
          >
            Join Now
            <FaArrowRight style={{ marginLeft: 15 }} />
          </Link>
        </div>
      </nav>
      {/* // <!-- Navbar End --> */}
    </>
  );
}
