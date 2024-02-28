import Footer from "../components/Footer";
import About from "../components/Home/About";
import Categories from "../components/Home/Categories";
import Carousel from "../components/Home/Carousel";
import Services from "../components/Home/Services";

export default function Home() {
  return (
    <>
      {/* <!-- Carousel Start --> */}
      <Carousel />
      <Services />
      <About />
      <Categories />
      <Footer />

      {/* <!-- Carousel End --> */}
    </>
  );
}
