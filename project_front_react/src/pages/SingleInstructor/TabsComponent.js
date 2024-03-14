import { axiosInstance } from "api/config";
import CourseItem from "pages/Courses/CourseItem";
import React, { useCallback, useEffect, useState } from "react";
import { Tabs, Tab } from "react-bootstrap";

const TabsComponent = ({ teacher }) => {
  const [activeTab, setActiveTab] = useState("overview"); // State to manage active tab
  const [courses, setCourses] = useState([]);
  const getData = useCallback(async () => {
    try {
      await axiosInstance
        .get(`course/teacherCourses/${teacher.id}`)
        .then((res) => {
          if (typeof res.data.message != "string") {
            setCourses(res.data.message);
          } else {
            setCourses([]);
          }
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container">
      {/* Container for the tabs */}
      <div className="row">
        <div className="col-xl-8 mx-xl-auto">
          {/* Column for the tabs */}
          <Tabs
            id="controlled-tabs"
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k)}
            className="mb-3"
            style={{ marginBottom: "20px" }}
          >
            <Tab eventKey="overview" title="Overview">
              <h3 class="m">Bio</h3>
              <p class="mb-6 line-height-md">{teacher.description}</p>
            </Tab>
            <Tab eventKey="courses" title="Courses">
              <div
                className="component mb-20"
                style={{ display: "flex", flexDirection: "row", gap: "16px" }}
              >
                <div className="container p-5">
                  <div
                    className="d-flex flex-wrap gap-4"
                    style={{ justifyContent: "space-around" }}
                  >
                    {courses.map((item, index) => (
                      <div key={index}>
                        <CourseItem data={item} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default TabsComponent;
