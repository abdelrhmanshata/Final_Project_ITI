import About from "../components/About";
import Carousel from "../components/Carousel";
import Categories from "../components/Categories";
import Courses from "../components/Courses";
import Service from "../components/Service";
import Team from "../components/Team";
// import Testimonial from "../components/Testimonial";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Carousel />
      <Service />
      <About />
      <Categories />
      <Courses />
      <Team />
      {/* <Testimonial /> */}
      <Footer />
    </>
  );
}
