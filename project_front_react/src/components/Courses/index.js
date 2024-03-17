import { useCallback, useEffect, useState } from "react";
import { axiosInstance } from "api/config";
import ShowItemCourse from "./ShowItemCourse";
import { useDispatch, useSelector } from "react-redux";

export default function Courses() {
  // const dispatch = useDispatch();
  const isUpdate = useSelector((state) => state.update.isUpdate);
  // dispatch(updateState(isUpdate+1));
  const [courses, setCourses] = useState([]);
  const getData = useCallback(async () => {
    try {
      await axiosInstance
        .get(`course/listAllCourses`)
        .then((res) => {
          const allCourses = res.data.message.sort(
            (a, b) => b.courseReviewScore - a.courseReviewScore
          );
          setCourses(allCourses.slice(0, 4));
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [isUpdate]);

  return (
    <>
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title bg-white text-center text-primary px-3">
              Courses
            </h6>
            <h1 className="mb-5">Popular Courses</h1>
          </div>
          <div className="row g-4 flex-wrap justify-content-center">
            {courses.map((item) => (
              <ShowItemCourse key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
