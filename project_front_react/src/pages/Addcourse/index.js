import Footer from "components/Footer";
import Navbar from "components/Navbar";
import AddCourse from "components/AddCourse";
import "./Addcourse.css";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const AddCourses = () => {
  return (
    <>
      <Navbar />
      <div className="top-left-button">
        <Link to="/profile" style={{ margin: "10px" }}>
          <button type="submit" className="to-home-button">
            To Profile
          </button>
        </Link>
      </div>
      <AddCourse />
      <Footer />
    </>
  );
};

export default AddCourses;
