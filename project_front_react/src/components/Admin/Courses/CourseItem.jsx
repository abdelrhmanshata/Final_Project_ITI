import React from "react";
const CourseItem = ({ data, onSelect }) => {
  return (
    <>
      <div
        className="col-5"
        style={{
          background: "#dde6ed",
          borderRadius: "5%",
          height: "250px",
          overflow: "hidden",
        }}
      >
        <img
          src={data.image}
          width={"100%"}
          style={{ borderRadius: "5%" }}
          alt=""
        />
        <h5 className="m-3 overflow-hidden">{data.title}</h5>
        <button
          type="button"
          className="btn btn-info "
          style={{ borderRadius: "5px" }}
          onClick={() => {
            onSelect(data);
          }}
        >
          Show
        </button>
      </div>
    </>
  );
};

export default CourseItem;
