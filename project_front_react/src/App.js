import { BrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Spinner from "./components/Spinner";
import Home from "./pages/Home";
import Footer from "./components/Footer";

function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  return (
    <>
      {loading ? <Spinner /> : null}
      <BrowserRouter>
        <Navbar />
        <Home />
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
