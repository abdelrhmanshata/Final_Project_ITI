import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const LoginForm = React.lazy(() => import("../pages/LoginForm/index"));
const RegisterForm = React.lazy(() => import("../pages/RegisterForm/index"));
const Home = React.lazy(() => import("../pages/Home"));
const NotFound = React.lazy(() => import("../pages/NotFound"));
export default function Router() {
  return (
    <Suspense fallback={<h5>Loading ...</h5>}>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
