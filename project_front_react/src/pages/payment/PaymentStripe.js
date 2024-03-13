import { axiosInstance } from "api/config";
import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { useParams } from "react-router-dom";



export default function PaymentStripe() {
    const [course, setCourse] = useState({});
    const params = useParams();

    const getCourseData = async () => {
        await axiosInstance
            .get(`course/listAllCourses/${params.courseID}`)
            .then((res) => {
                setCourse(res.data.message[0]);
            })
            .catch((err) => console.log(err));
    };
    useEffect(() => {
        getCourseData()
    }, []);
    return (
        <>
            <div className="container">
                <div className="card">
                    <Image
                        width={"100%"}
                        height={250}
                        src={`http://127.0.0.1:9000/${course.courseImage}`}
                        // src={`http://127.0.0.1:9000/course/get_image/${data.id}`}
                        rounded
                        className="border border-2 border-primary"
                    />
                    <div>
                        <h3>
                            {course?.courseName}
                        </h3>
                        <p>$ {course?.coursePrice}</p>
                    </div>
                    <form action={`http://127.0.0.1:9000/api/create-checkout-session/${course.id}/`} method="POST">
                        <button type="submit" className="btn">
                            Checkout
                        </button>
                    </form>
                </div>
            </div>

        </>)
}