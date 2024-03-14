import CardCourse from "components/Profile/Teacher/CardCousre";
import React, { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";

const TabsComponent = () => {
  const [activeTab, setActiveTab] = useState("overview"); // State to manage active tab

  return (
    <div className="container">
      {" "}
      {/* Container for the tabs */}
      <div className="row">
        <div className="col-xl-8 mx-xl-auto">
          {" "}
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
              <p class="mb-6 line-height-md">
                Do you want to become a UI/UX designer but you don't know where
                to start? This course will allow you to develop your user
                interface design skills and you can add UI designer to your CV
                and start getting clients for your skills.
              </p>
              <p class="mb-6 line-height-md">
                Hi everyone. I'm Arash and I'm a UI/UX designer. In this course,
                I will help you learn and master Figma app comprehensively from
                scratch. Figma is an innovative and brilliant tool for User
                Interface design. It's used by everyone from entrepreneurs and
                start-ups to Apple, Airbnb, Facebook, etc.
              </p>
              <p class="collapse mb-20 line-height-md" id="readcollapseExample">
                Anim pariatur cliche reprehenderit, enim eiusmod high life
                accusamus terry richardson ad squid. Nihil anim keffiyeh
                helvetica, craft beer labore wes anderson cred nesciunt sapiente
                I will help you learn and master Figma app comprehensively from
                scratch. Figma is an innovative and brilliant tool for User
                Interface design. It's used by everyone from entrepreneurs ea
                proident.
              </p>
            </Tab>
            <Tab eventKey="courses" title="Courses">
              <div
                className="component mb-20"
                style={{ display: "flex", flexDirection: "row", gap: "16px" }}
              >
                {/* <CardCourse />
                <CardCourse />
                <CardCourse /> */}
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default TabsComponent;
