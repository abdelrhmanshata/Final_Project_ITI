import Navbar from "components/Navbar";
import Socialprofile from "./Social";

import ReviewsComponent from "./Review";
import TabsComponent from "./TabsComponent";
import Footer from "components/Footer";
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { axiosInstance } from "api/config";
import { useDispatch, useSelector } from "react-redux";
import { updateState } from "store/slices/update";

export default function SingleInstructor() {
   const dispatch = useDispatch();
  const isUpdate = useSelector((state) => state.update.isUpdate);
  // dispatch(updateState(isUpdate+1));

  
  const params = useParams();
  const [user, setUser] = useState({});
  const [avatar, setAvatar] = useState("");

  const getData = useCallback(async () => {
    try {
      await axiosInstance
        .get(`user/Get_Specific_User/${params.teacherID}`)
        .then((res) => {
          setUser(res.data.data);
          setAvatar(`http://127.0.0.1:9000/${res.data.data.image}`);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }, [params]);

  useEffect(() => {
    getData();
  }, [isUpdate]);

  return (
    <>
      <Navbar />
      <div class="container pt-8 pt-md-11">
        <div className="row">
          <div className="col-xl-8 mx-xl-auto">
            <Socialprofile avatar={avatar} teacher={user} />
            <h1 className="text-center mb-1">{user.name}</h1>
            <div className="text-center mb-7">{user.subject} Teacher</div>
            <br />
            <ReviewsComponent teacher={user} />
            <br />
            <br />
          </div>
        </div>
        <TabsComponent teacher={user} />
        <br />
        <br />
      </div>
      <Footer />
    </>
  );
}
