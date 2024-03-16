import About from "../components/About";
import Carousel from "../components/Carousel";
import Categories from "../components/Categories";
import Courses from "../components/Courses";
import Service from "../components/Service";
import Team from "../components/Team";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  // const dispatch = useDispatch();
  // const isUpdate = useSelector((state) => state.update.isUpdate);
  // dispatch(updateState(isUpdate+1));

  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      navigate(
        `/payment/completed/${query.get("user_id")}/${query.get("course_id")}`
      );
    } else if (query.get("cancel")) {
      console.log("cancel");
    }
  }, []);
  return (
    <>
      <Navbar active={"Home"} />
      <Carousel />
      <Service />
      <About />
      <Categories />
      <Courses />
      <Team />
      <Footer />
    </>
  );
}
