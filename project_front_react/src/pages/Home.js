import About from "../components/About";
import Carousel from "../components/Carousel";
import Categories from "../components/Categories";
import Courses from "../components/Courses";
import Service from "../components/Service";
import Team from "../components/Team";
import Testimonial from "../components/Testimonial";

export default function Home() {
  return (
    <>
      <Carousel />
      <Service />
      <About />
      <Categories />
      <Courses />
      <Team />
      <Testimonial />
    </>
  );
}
