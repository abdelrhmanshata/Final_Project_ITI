import React, { Suspense, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Spinner from "../components/Spinner";
import PaymentStripe from "../pages/payment/PaymentStripe";


const ShopComplete = React.lazy(() => import("../pages/ShopComplete/ShopComplete"));
const SingleInstructor = React.lazy(() => import("../pages/SingleInstructor/index"));
const Aboutus =React.lazy(() => import("../pages/Aboutus/index"));
;
const Apps =React.lazy(() => import("../pages/Accordion/index"));

const LoginForm = React.lazy(() => import("../pages/LoginForm/index"));
const RegisterForm = React.lazy(() => import("../pages/RegisterForm/index"));
const Home = React.lazy(() => import("../pages/Home"));
const Admin = React.lazy(() => import("../pages/Admin"));
const UserProfile = React.lazy(() => import("../pages/UserProfile/index"));
const Addcourse = React.lazy(() => import("../pages/Addcourse/index"));
const Updatecourse = React.lazy(() => import("../pages/Updatecourse/index"));
const Courses = React.lazy(() => import("../pages/Courses/index"));
const SingleCourse = React.lazy(() => import("../pages/SingleCourse/index"));
const LessonSingle = React.lazy(() =>
  import("../components/SingleCourse/Lesson/LessonSingle")
);
const Teachers = React.lazy(() => import("../pages/Teachers/index"));
const NotFound = React.lazy(() => import("../pages/NotFound"));
const Stripe = React.lazy(() => import("../pages/payment/PaymentStripe"));
const PaymentCompleted = React.lazy(() =>
  import("../pages/payment/PaymentCompleted")
);

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
          <>
            <Route path="/profile" element={<UserProfile />} />

            <Route path="/Addcourse" element={<Addcourse />} />
            <Route path="/Aboutus" element={<Aboutus />} />
            <Route path="/single/:teacherID" element={<SingleInstructor />} />
            <Route path="/Addcourse" element={<Addcourse />} />
            <Route path="/UpdateCourse/:courseID" element={<Updatecourse />} />
            <Route path="/shop" element={< ShopComplete/>} />
            <Route path="/Apps" element={< Apps/>} />

          
        </>
        
        
            
           
         
        )}
        {/* Auth */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/payment/:courseID" element={<Stripe />} />
        <Route path="/payment/completed" element={<PaymentCompleted />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/course/:courseID" element={<SingleCourse />} />
        <Route path="/lesson/:courseID" element={<LessonSingle />} />
        <Route path="/teachers" element={<Teachers />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
