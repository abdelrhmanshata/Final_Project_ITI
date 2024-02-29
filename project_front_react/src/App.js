import { BrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";
import Spinner from "./components/Spinner";
import Router from "./Router/Router";

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
        <Router />
      </BrowserRouter>
    </>
  );
}

export default App;
