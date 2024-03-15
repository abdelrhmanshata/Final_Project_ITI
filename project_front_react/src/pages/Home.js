import About from "../components/About";
import Carousel from "../components/Carousel";
import Categories from "../components/Categories";
import Courses from "../components/Courses";
import Service from "../components/Service";
import Team from "../components/Team";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";

export default function Home() {
  const [isPayment, setIsPayment] = useState(false);
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("success");
      // setIsPayment(true);
      query.forEach((value, key) => {
        // You can add conditions here to extract specific metadata
        console.log("Key:  ", key, " Value: ", value);
      });
      // setMessage(
      //   "order completed you will recieve the order shortly with your order details"
      // );
    }
    if (query.get("cancel")) {
      console.log("cancel");
      // setIsPayment(true);
      // setMessage("payment unsuccessful");
    }
  }, []);
  return (
    <>
      {isPayment ? (
        <>
          <p>isPayment</p>
        </>
      ) : (
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
      )}
    </>
  );
}
