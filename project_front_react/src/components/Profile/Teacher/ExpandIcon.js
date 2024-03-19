import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ListSection from "./ListSection";
import ListQuestions from "./Question/ListQuestions";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AddSection from "./Section/AddSection";
import AddQuestion from "./Question/AddQuestion";

export default function ExpandIcon({ courseId }) {
  return (
    <div>
      <Accordion className="mt-2">
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls={`panel-content`}
          id={`panel-header`}
        >
          <div style={{ position: "relative", width: "100%" }}>
            <Typography>Sections...</Typography>
            <div style={{ position: "absolute", top: 0, right: 0 }}>
              <AddSection courseId={courseId} />
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <ListSection courseId={courseId} />
        </AccordionDetails>
      </Accordion>
      <Accordion className="mt-2">
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls={`panel-content`}
          id={`panel-header`}
        >
          <div style={{ position: "relative", width: "100%" }}>
            <Typography>Questions...</Typography>
            <div style={{ position: "absolute", top: 0, right: 0 }}>
              <AddQuestion courseId={courseId} />
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <ListQuestions courseId={courseId} />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
