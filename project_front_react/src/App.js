import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Router from "./Router/Router";
import React from "react";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Router />
    </BrowserRouter>
  );
}

export default App;
