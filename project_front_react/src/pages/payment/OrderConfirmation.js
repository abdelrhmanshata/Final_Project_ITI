import React, { useCallback, useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import OrderItem from "./OrderItem";
import Grid from "./Grid";
import { axiosInstance } from "api/config";

const OrderReceived = ({ params }) => {
  const [payment, setPayment] = useState({});
  const [course, setCourse] = useState({});
  const [user, setUser] = useState({});

  const getData = useCallback(async () => {
    try {
      await axiosInstance
        .get(`api/checkPayment/${params.userID}/${params.courseID}`)
        .then((res) => {
          setPayment(res.data.payment[0]);
          setCourse(res.data.course[0]);
          setUser(res.data.user[0]);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }, [params]);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className=" container p-2 w-50">
      <div className="d-flex flex-column  align-items-center justify-content-center">
        <FaCheckCircle color="green" size={50} />
        <h1>Order Received</h1>
        <p>Thank you. Your order has been received.</p>
      </div>
      <div className="entry-content">
        <Grid payment={payment} course={course} />
        <OrderItem payment={payment} course={course} />
      </div>
    </div>
  );
};

export default OrderReceived;
