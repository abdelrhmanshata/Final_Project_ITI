import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
export default function FormControlLayout({ text, value, select }) {
  return (
    <div className="container">
      <div className="row" style={{ alignItems: "center" }}>
        <p className="col-lg-9 col-md-12 ">{text}</p>
        <div className="col-lg-3 col-sm-12">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-autowidth-label">
              Category
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={value}
              onChange={(e) => {
                select(e.target.value);
              }}
              autoWidth
              label=" All Category"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"Arabic"}>Arabic</MenuItem>
              <MenuItem value={"English"}>English</MenuItem>
              <MenuItem value={"Computer Science"}>Computer Science</MenuItem>
              <MenuItem value={"History"}>History</MenuItem>
              <MenuItem value={"Geography"}>Geography</MenuItem>
              <MenuItem value={"Science"}>Science</MenuItem>
              <MenuItem value={"Physics "}>Physics</MenuItem>
              <MenuItem value={"Chemistry"}>Chemistry</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
    </div>
  );
}
