import React, { useCallback, useEffect, useState } from "react";
import { axiosInstance } from "api/config";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import EditSection from "./Section/EditSection";
import DeleteSection from "./Section/DeleteSection";
import Video from "./Section/AddVideo";
import ListVideo from "./Section/ListVideo";
import AddVideo from "./Section/AddVideo";
import { useDispatch, useSelector } from "react-redux";

const ListSection = ({ courseId }) => {
  const dispatch = useDispatch();
  const isUpdate = useSelector((state) => state.update.isUpdate);
  // dispatch(updateState(isUpdate + 1));

  const [sections, setSections] = useState([]);
  const getData = useCallback(async () => {
    try {
      await axiosInstance
        .get(`course/${courseId}/sections/all/`)
        .then((res) => {
          if (typeof res.data.message != "string")
            setSections(res.data.message);
          else {
            setSections([]);
          }
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }, [courseId]);

  useEffect(() => {
    getData();
  }, [isUpdate]);

  return (
    <div>
      {sections.map((item) => (
        <Accordion key={item.id}>
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls={`panel${item.id}-content`}
            id={`panel${item.id}-header`}
          >
            <div style={{ position: "relative", width: "100%" }}>
              <Typography>{item.sectionName}</Typography>
              <div style={{ position: "absolute", top: 0, right: 0 }}>
                <AddVideo sectionID={item.id} />
                <EditSection section={item} />
                <DeleteSection sectionID={item.id} />
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <ListVideo sectionID={item.id} />
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default ListSection;
