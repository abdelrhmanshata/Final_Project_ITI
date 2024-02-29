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
      title: "Python Course for Beginners",
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
                <div
                  className="col-lg-4 col-md-6 wow fadeInUp"
                  data-wow-delay="0.5s"
                  style={{ maxHeight: "500px" }}
                >
                  <div className="course-item bg-light">
                    <div className="position-relative overflow-hidden">
                      <img className="img-fluid" src={image} alt="" />
                      <div className="w-100 d-flex justify-content-center position-absolute bottom-0 start-0 mb-4">
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
                    <div className="text-center p-4 pb-0">
                      <h3 className="mb-0">{item.price}</h3>
                      <div className="mb-3">
                        {rating(item.num_of_rating)}
                        <small>({item.num_of_student_rating})</small>
                      </div>
                      <h5 className="mb-4">{item.title}</h5>
                    </div>
                    <div className="d-flex border-top">
                      <small className="flex-fill text-center border-end py-2">
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
