import { BrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";
import Spinner from "./components/Spinner";
import Router from "./Router/Router";
import AdminContext from "./context/AdminContext";
import React from "react";
function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);
  const [adminPanel, setAdminPanel] = useState({
    activeItem: 0,
  });

  return (
    <>
      {loading ? <Spinner /> : null}

      <AdminContext.Provider value={{ adminPanel, setAdminPanel }}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </AdminContext.Provider>
    </>
  );
}

export default App;
