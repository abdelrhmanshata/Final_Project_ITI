import React, { Suspense, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useSelector } from "react-redux";

const Apps = React.lazy(() => import("../pages/Accordion/index"));

const SingleInstructor = React.lazy(() =>
  import("../pages/SingleInstructor/index")
);
const Aboutus = React.lazy(() => import("../pages/Aboutus/index"));
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
const ShopComplete = React.lazy(() => import("../pages/payment/ShopComplete"));

export default function Router() {
  const navigate = useNavigate();
  const isUpdate = useSelector((state) => state.update.isUpdate);
  // const dispatch = useDispatch();
  // dispatch(updateState(isUpdate+1));

  const [isAdmin, setIsAdmin] = useState(false);
  const [userType, setUserType] = useState("");

  useEffect(() => {
    const currentUrl = new URL(window.location.href).pathname;
    if (localStorage.getItem("User_ID") !== null) {
      if (localStorage.getItem("isAdmin") !== null) {
        setIsAdmin(localStorage.getItem("isAdmin") === "true");
      }
      setUserType(localStorage.getItem("User_Type"));

      const isAuth = localStorage.getItem("User_ID").length > 0;
      if ((currentUrl === "/login" || currentUrl === "/register") && isAuth) {
        if (isAdmin) navigate("/admin");
        else navigate("/profile");
      }
    }
  }, [isUpdate]);

  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="" element={<Home />} />
        {isAdmin ? (
          <Route path="/admin" element={<Admin />} />
        ) : (
          <>
            <Route path="/profile" element={<UserProfile />} />
            {userType === "teacher" && (
              <>
                <Route path="/Addcourse" element={<Addcourse />} />
                <Route
                  path="/UpdateCourse/:courseID"
                  element={<Updatecourse />}
                />
              </>
            )}
          </>
        )}

        {/* Auth */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />

        {/*  Course */}
        <Route path="/courses" element={<Courses />} />
        <Route path="/course/:courseID" element={<SingleCourse />} />
        <Route path="/lesson/:courseID" element={<LessonSingle />} />
        <Route path="/single/:teacherID" element={<SingleInstructor />} />
        <Route path="/Apps" element={<Apps />} />
        <Route path="/payment/:courseID" element={<Stripe />} />
        <Route path="/Aboutus" element={<Aboutus />} />
        <Route path="/teachers" element={<Teachers />} />
        <Route
          path="/payment/completed/:userID/:courseID"
          element={<ShopComplete />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
