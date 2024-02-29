import { useState } from "react";
export default function Service() {
  const [list] = useState([
    {
      icon: "fa fa-3x fa-graduation-cap text-primary mb-4",
      title: "Skilled Instructors",
      description:
        "Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam",
    },
    {
      icon: "fa fa-3x fa-globe text-primary mb-4",
      title: "Online class Names",
      description:
        "Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam",
    },
    {
      icon: "fa fa-3x fa-home text-primary mb-4",
      title: "Home Projects",
      description:
        "Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam",
    },
    {
      icon: "fa fa-3x fa-book-open text-primary mb-4",
      title: "Book Library",
      description:
        "Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam",
    },
  ]);

  const serviceItem = (item) => {
    return (
      <div
        className="col-lg-3 col-sm-6 wow h-25"
        data-wow-delay="0.1s"
        style={{ maxHeight: "250px" }}
      >
        <div className="service-item text-center pt-3">
          <div className="p-4">
            <i className={item.icon}></i>
            <h5 className="mb-3">{item.title}</h5>
            <p>{item.description}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* <!-- Service Start --> */}
      <br />
      <br />
      <br />
      <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
        <h4 className="section-title bg-white text-center text-primary px-3">
          Services
        </h4>
      </div>
      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-4">
            {list.map((item, i) => serviceItem(item))}
          </div>
        </div>
      </div>
      {/* <!-- Service End --> */}
    </>
  );
}
