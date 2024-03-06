import React, { Suspense, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Spinner from "../components/Spinner";

const LoginForm = React.lazy(() => import("../pages/LoginForm/index"));
const RegisterForm = React.lazy(() => import("../pages/RegisterForm/index"));
const Home = React.lazy(() => import("../pages/Home"));
const Admin = React.lazy(() => import("../pages/Admin"));
const UserProfile = React.lazy(() => import("../pages/UserProfile/index"));
const Courses = React.lazy(() => import("../pages/Courses/index"));


const Teachers = React.lazy(() => import("../pages/Teachers/index"));
const NotFound = React.lazy(() => import("../pages/NotFound"));
export default function Router() {
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("User_ID") !== null) {
      if (localStorage.getItem("isAdmin") !== null) {
        setIsAdmin(localStorage.getItem("isAdmin") === "true");
      }
    }
  }, []);
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="" element={<Home />} />
        {isAdmin ? (
          <Route path="/admin" element={<Admin />} />
        ) : (
          <Route path="/profile" element={<UserProfile />} />
        
        )}
        {/* Auth */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />

        <Route path="/courses" element={<Courses />} />
    
        <Route path="/teachers" element={<Teachers />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
