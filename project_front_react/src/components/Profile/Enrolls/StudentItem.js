import { Button } from "@mui/material";
import React from "react";
import { BiCheckCircle, BiXCircle } from "react-icons/bi";

export default function StudentItem({ index, student }) {
  return (
    <div>
      <div key={index} className="item-list">
        <div
          className="d-flex w-25 justify-content-start teacher--detail"
          style={{}}
        >
          <img src={require("../../../assets/img/cat-1.jpg")} alt={""} />
          <span>AbdElrhman</span>
        </div>
        <div className="w-25">
          <span>Email</span>
        </div>

        <div style={{ width: "150px" }}>
          <span style={{ color: true ? "green" : "red" }}>
            {true ? (
              <BiCheckCircle fontSize={"20"} />
            ) : (
              <BiXCircle fontSize={"20"} />
            )}
            Approve
          </span>
        </div>

        <div style={{ width: "100px" }} className="action--button">
          {true ? (
            <Button
              variant="danger"
              size="sm"
              style={{ width: "100px" }}
              onClick={() => {
                // activeUser(teacher.id, 0);
              }}
            >
              Block
            </Button>
          ) : (
            <Button
              variant="primary"
              size="sm"
              style={{ width: "100px" }}
              onClick={() => {
                // activeUser(teacher.id, 1);
              }}
            >
              Approve
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
