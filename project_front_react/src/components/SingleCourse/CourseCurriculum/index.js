import React, { useCallback, useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { List } from "@mui/material";
import { axiosInstance } from "api/config";
import Section from "./Section";

export default function Curriculum({ course,isPlay }) {
  const [dense] = useState(true);
  const [sections, setSections] = useState([]);
  const getData = useCallback(async () => {
    try {
      await axiosInstance
        .get(`course/${course.id}/sections/all/`)
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
  }, [course]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div className="d-flex flex-column py-4 gap-2">
      {sections.map((item, index) => (
        // defaultExpanded
        <>
          {index === 0 ? (
            <Accordion defaultExpanded>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                {item.sectionName}
              </AccordionSummary>
              <AccordionDetails>
                <List dense={dense}>
                  <Section sectionData={item} index={index} isPlay={isPlay} />
                </List>
              </AccordionDetails>
            </Accordion>
          ) : (
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                {item.sectionName}
              </AccordionSummary>
              <AccordionDetails>
                <List dense={dense}>
                  <Section sectionData={item} isPlay={isPlay} />
                </List>
              </AccordionDetails>
            </Accordion>
          )}
        </>
      ))}
    </div>
  );
}
