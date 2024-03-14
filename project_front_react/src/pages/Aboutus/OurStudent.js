import React from "react";
import avatar1 from "../../assets/img/avatar-1.jpg";
import avatar2 from "../../assets/img/avatar-2.jpg";
import avatar3 from "../../assets/img/avatar-3.jpg";

export default function TestimonialsSection() {
  function TestimonialCard({ avatar, name, role, delay }) {
    return (
      <div
        className="card border shadow p-6 lift-md"
        style={{ marginLeft: `${delay}px` }}
      >
        <div className="card-zoom">
          <div className="d-flex align-items-center">
            <div className="avatar avatar-custom me-5">
              <img
                src={avatar}
                alt={name}
                className="avatar-img rounded-circle m-3 pl-3"
                style={{ width: "65px", height: "65px" }}
              />
            </div>
            <div className="media-body">
              <h5 className="mb-2">{name}</h5>
              <span>{role}</span>
            </div>
          </div>
        </div>
        <div className="card-footer px-12 mt-10">
          <p className="mb-3 mt-3 text-capitalize">
            “ I believe in lifelong learning is a great place to learn from
            experts. I've learned a lot and recommend it to all my friends “
          </p>
        </div>
      </div>
    );
  }
  return (
    <section className="pt-0 pt-md-11 pb-9" style={{ margin: "40px" }}>
      <div className="container">
        <div className="text-center mb-2" data-aos="fade-up">
          <h1>What our students have to say</h1>
          <p className="font-size-lg text-capitalize mb-0">
            Discover your perfect program in our courses.
          </p>
        </div>

        <div className="mx-n4" style={{ display: "flex" }}>
          <TestimonialCard
            avatar={avatar1}
            name="Albert Cole"
            role="Designer"
            delay={0}
          />
          <TestimonialCard
            avatar={avatar2}
            name="Alison Dawn"
            role="WordPress Developer"
            delay={20}
          />
          <TestimonialCard
            avatar={avatar3}
            name="Daniel Parker"
            role="Front-end Developer"
            delay={40}
          />
        </div>
      </div>
    </section>
  );
}
