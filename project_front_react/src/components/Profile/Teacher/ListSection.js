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

const ListSection = ({ isUpdate, setIsUpdate, courseId }) => {
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
                <AddVideo
                  sectionID={item.id}
                  isUpdate={isUpdate}
                  setIsUpdate={setIsUpdate}
                />

                <EditSection
                  section={item}
                  isUpdate={isUpdate}
                  setIsUpdate={setIsUpdate}
                />

                <DeleteSection
                  sectionID={item.id}
                  isUpdate={isUpdate}
                  setIsUpdate={setIsUpdate}
                />
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <ListVideo
              sectionID={item.id}
              isUpdate={isUpdate}
              setIsUpdate={setIsUpdate}
            />
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default ListSection;
