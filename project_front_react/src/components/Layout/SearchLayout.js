import React from "react";
import { IconButton, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";
export default function SearchLayout({ text, action }) {
  return (
    <div className="container-fluid bg-light py-5 mb-5">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-10 text-center">
            <div className="d-flex display-3 gap-3 text-white animated slideInDown">
              <TextField
                fullWidth
                label="Search..."
                color="info"
                onChange={(e) => {
                  text(e.target.value);
                }}
              />
              <IconButton
                style={{ width: "50px", height: "50px" }}
                color="primary bg-primary"
                aria-label="search"
                onClick={() => action()}
              >
                <Search className="text-light" />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
