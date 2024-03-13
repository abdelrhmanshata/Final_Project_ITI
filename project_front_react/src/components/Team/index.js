import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { axiosInstance } from "api/config";
export default function Team() {
  const [teachers, setTeachers] = useState([]);
  const getData = useCallback(async () => {
    try {
      await axiosInstance
        .get(`user/Print_All_Teachers`)
        .then((res) => {
          setTeachers(res.data.data.slice(0, 4));
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <>
      {/* <!-- Team Start --> */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title bg-white text-center text-primary px-3">
              Instructors
            </h6>
            <h1 className="mb-5">Expert Instructors</h1>
          </div>
          <div className="row g-4">
            {teachers.map((item) => (
              <div
                className="col-lg-3 col-md-6 wow fadeInUp"
                data-wow-delay="0.1s"
              >
                <div className="team-item bg-light">
                  <div className="d-flex justify-content-center">
                    <img
                      className="img-fluid"
                      src={`http://127.0.0.1:9000/${item.image}`}
                      alt={item.name}
                    />
                  </div>
                  {/* <div
                    className="position-relative d-flex justify-content-center"
                    style={{ marginTop: "-23px" }}
                  >
                    <div className="bg-light d-flex justify-content-center pt-2 px-1">
                      <Link
                        className="btn btn-sm-square btn-primary mx-1"
                        to=""
                      >
                        <i className="fab fa-facebook-f"></i>
                      </Link>
                      <Link
                        className="btn btn-sm-square btn-primary mx-1"
                        to=""
                      >
                        <i className="fab fa-twitter"></i>
                      </Link>
                      <Link
                        className="btn btn-sm-square btn-primary mx-1"
                        to=""
                      >
                        <i className="fab fa-instagram"></i>
                      </Link>
                    </div>
                  </div> */}
                  <div className="text-center p-4">
                    <h5
                      className="mb-0"
                      style={{ height: "50px", overflow: "hidden" }}
                    >
                      {item.name}
                    </h5>
                    <small style={{ height: "20px", overflow: "hidden" }}>
                      {item.email}
                    </small>
                    <br />
                    <small style={{ height: "20px", overflow: "hidden" }}>
                      {item.phonenumber}
                    </small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* <!-- Team End --> */}
    </>
  );
}
