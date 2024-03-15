import React, { useCallback, useEffect, useState } from "react";
import { axiosInstance } from "api/config";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateCourse() {
  const navigate = useNavigate();
  const params = useParams();
  const [course, setCourse] = useState({});

  const getData = useCallback(async () => {
    try {
      await axiosInstance
        .get(`course/listAllCourses/${params.courseID}`)
        .then((res) => {
          setCourse(res.data.message[0]);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }, [params.courseID]);

  useEffect(() => {
    getData();
  }, [getData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.put(
        `course/updateACourse/${course.id}`,
        course,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        console.log(response.data.message);
        navigate(`/profile`);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setCourse({ ...course, courseImage: file });
  };

  return (
    <>
      <div className="container-body">
        <h2 className="text-centre">Update Course</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Course Name</label>
            <input
              type="text"
              className="form-control"
              name="courseName"
              value={course.courseName}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Course Description</label>
            <input
              type="text"
              className="form-control"
              name="courseDescription"
              value={course.courseDescription}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Course Type</label>
            <select
              className="form-control bg-white"
              name="courseType"
              value={course.courseType}
              onChange={handleInputChange}
            >
              <option value="">Choose Type</option>
              <option value="Arabic">Arabic</option>
              <option value="English ">English</option>
              <option value="Computer Science">Computer Science</option>
              <option value="History">History</option>
              <option value="Geography">Geography</option>
              <option value="Science">Science</option>
              <option value="Physics ">Physics</option>
              <option value="Chemistry">Chemistry</option>
            </select>

            {/* <label>Course Type</label>
            <input
              type="text"
              className="form-control"
              name="courseType"
              value={course.courseType}
              onChange={handleInputChange}
            /> */}
          </div>
          <div className="form-group">
            <label>Course Price</label>
            <input
              type="number"
              className="form-control"
              name="coursePrice"
              value={course.coursePrice}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Course Lessons</label>
            <input
              type="number"
              className="form-control"
              name="courseLessons"
              value={course.courseLessons}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Course Hours</label>
            <input
              type="number"
              className="form-control"
              name="courseHours"
              value={course.courseHours}
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
}
