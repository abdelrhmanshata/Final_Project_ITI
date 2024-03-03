import { Link } from "react-router-dom";
import image from "../../assets/img/course-1.jpg";

export default function Courses() {
  const rating = (numRating) => {
    const items = [];
    for (let i = 0; i < 5; i++) {
      if (i < numRating) {
        items.push(<small className="fa fa-star text-primary"></small>);
      } else {
        items.push(<small className="fa fa-star"></small>);
      }
    }
    return <>{items}</>;
  };
  const listCourses = [
    {
      image: "",
      price: "$150.00",
      num_of_rating: 5,
      num_of_student_rating: 150,
      title: "Web Design Course for Beginners",
      instructor: "Abd El-rhman",
      hours: 25,
      students: 50,
    },
    {
      image: "",
      price: "$190.00",
      num_of_rating: 3,
      num_of_student_rating: 123,
      title:
        "Python Course for Beginners Python Course for BeginnersPython Course for BeginnersPython Course for BeginnersPython Course for BeginnersPython Course for Beginners",
      instructor: "Yossif",
      hours: 15,
      students: 25,
    },
    {
      image: "",
      price: "$180.00",
      num_of_rating: 1,
      num_of_student_rating: 10,
      title: "Backend Course for Beginners",
      instructor: "Ali",
      hours: 12.5,
      students: 30,
    },
    {
      image: "",
      price: "$180.00",
      num_of_rating: 1,
      num_of_student_rating: 10,
      title: "Backend Course for Beginners",
      instructor: "Ali",
      hours: 12.5,
      students: 30,
    },
  ];

  return (
    <>
      {/* <!-- Courses Start --> */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title bg-white text-center text-primary px-3">
              Courses
            </h6>
            <h1 className="mb-5">Popular Courses</h1>
          </div>
          <div className="row g-4 justify-content-center">
            {listCourses.map((item, index) => (
              <>
                <div className="col-lg-3 col-md-6">
                  <div
                    className="course-item bg-light"
                    style={{ borderRadius: "5%" }}
                  >
                    {/* Course Image */}
                    <div
                      className="position-relative overflow-hidden"
                      style={{ borderRadius: "5%" }}
                    >
                      <img className="img-fluid" src={image} alt="" />
                      <div className="w-100 d-flex justify-content-center position-absolute bottom-0 start-0 mb-2">
                        <Link
                          to="/"
                          className="flex-shrink-0 btn btn-sm btn-primary px-3 border-end"
                          style={{ borderRadius: "30px 0 0 30px" }}
                        >
                          Read More
                        </Link>
                        <Link
                          to="/"
                          className="flex-shrink-0 btn btn-sm btn-primary px-3"
                          style={{ borderRadius: "0 30px 30px 0" }}
                        >
                          Join Now
                        </Link>
                      </div>
                    </div>
                    {/* Course Title */}
                    <div className="text-center">
                      {/* Price */}
                      <h5 className="m-1">{item.price}</h5>
                      {/* Rating */}
                      <div className="mb-3">
                        {rating(item.num_of_rating)}
                        <small>({item.num_of_student_rating})</small>
                      </div>
                      {/* Title */}
                      <h5
                        className="m-2"
                        style={{ height: "50px", overflow: "hidden" }}
                      >
                        {item.title}
                      </h5>
                    </div>
                    {/* Info */}
                    <div className="d-flex border-top py-1">
                      <small
                        className="text-center border-end p-2"
                        style={{ overflow: "hidden" }}
                      >
                        <i className="fa fa-user-tie text-primary me-2"></i>
                        {item.instructor}
                      </small>
                      <small className="flex-fill text-center border-end py-2">
                        <i className="fa fa-clock text-primary me-2"></i>
                        {item.hours}Hrs
                      </small>
                      <small className="flex-fill text-center py-2">
                        <i className="fa fa-user text-primary me-2"></i>
                        {item.students} Students
                      </small>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
      {/* <!-- Courses End --> */}
    </>
  );
}
