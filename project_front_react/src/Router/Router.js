import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Spinner from "../components/Spinner";

const LoginForm = React.lazy(() => import("../pages/LoginForm/index"));
const RegisterForm = React.lazy(() => import("../pages/RegisterForm/index"));
const Home = React.lazy(() => import("../pages/Home"));
const Admin = React.lazy(() => import("../pages/Admin"));
const NotFound = React.lazy(() => import("../pages/NotFound"));
export default function Router() {
  const isAdmin = true;
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="" element={<Home />} />
        {isAdmin ? <Route path="/admin" element={<Admin />} /> : null}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
