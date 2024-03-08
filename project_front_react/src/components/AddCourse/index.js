
import React, { useState } from 'react';

const AddCourse = () => {
  const [formData, setFormData] = useState({
   
    courseName: '',
    courseDescription: '',
    coursePrice: '',
    courseType: '',
    courseImage: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, courseImage: file });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log(formData);
  };

  return (
    <>
  
    
    <div className="container-body">
      <h2 className="text-centre">Add Course</h2>
      <form onSubmit={handleSubmit}>
        
        <div className="form-group">
          <label>Course Name</label>
          <input type="text" className="form-control" name="courseName" value={formData.courseName} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Course Description</label>
          <input type="text" className="form-control" name="courseDescription" value={formData.courseDescription} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Course Price</label>
          <input type="number" className="form-control" name="coursePrice" value={formData.coursePrice} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Course Type</label>
          <input type="text" className="form-control" name="courseType" value={formData.courseType} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Course Image</label>
          <input type="file" className="form-control bg-white" onChange={handleImageChange} />
        </div>
        <button type="submit" className="btn btn-primary submit-button">Submit</button>
      </form>
      
      </div>
   
    </>
    
  );
};

export default AddCourse;
