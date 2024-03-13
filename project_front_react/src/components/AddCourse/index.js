import React, { useState } from "react";
import { axiosInstance } from "api/config";
import { useNavigate } from "react-router-dom";

const AddCourse = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userID: localStorage.getItem("User_ID"),
    courseName: "",
    courseDescription: "",
    coursePrice: 0,
    courseType: "",
    courseReviewScore: 0,
    courseLessons: 0,
    courseHours: 0.0,
    courseImage: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(
        "course/addACourse/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // Handle success (e.g., show success message to the user)
      if (response.status === 200) {
        navigate(`/profile`);
      }
    } catch (error) {
      // Handle error (e.g., display error message to the user)
      console.log(error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, courseImage: file });
  };

  return (
    <>
      <div className="container-body">
        <h2 className="text-centre">Add Course</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Course Name</label>
            <input
              type="text"
              className="form-control"
              name="courseName"
              value={formData.courseName}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Course Description</label>
            <input
              type="text"
              className="form-control"
              name="courseDescription"
              value={formData.courseDescription}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Course Type</label>
            <input
              type="text"
              className="form-control"
              name="courseType"
              value={formData.courseType}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Course Price</label>
            <input
              type="number"
              className="form-control"
              name="coursePrice"
              value={formData.coursePrice}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Course Lessons</label>
            <input
              type="number"
              className="form-control"
              name="courseLessons"
              value={formData.courseLessons}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Course Hours</label>
            <input
              type="number"
              className="form-control"
              name="courseHours"
              value={formData.courseHours}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Course Image</label>
            <input
              type="file"
              className="form-control bg-white"
              onChange={handleImageChange}
            />
          </div>
          <button type="submit" className="btn btn-primary submit-button">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default AddCourse;
