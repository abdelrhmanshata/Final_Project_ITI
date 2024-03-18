import React, { useCallback, useEffect, useState } from "react";
import { axiosInstance } from "api/config";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  IconButton,
  Typography,
} from "@mui/material";
import AddAnswer from "./AddAnswer";
import ListAnswer from "./ListAnswer";
import { MdOutlineDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { updateState } from "store/slices/update";

export default function ListQuestions({ courseId }) {
  const dispatch = useDispatch();
  const isUpdate = useSelector((state) => state.update.isUpdate);
  // dispatch(updateState(isUpdate + 1));

  const [questions, setQuestions] = useState([]);
  const getData = useCallback(async () => {
    try {
      await axiosInstance
        .get(`course/${courseId}/questions/all/`)
        .then((res) => {
          if (typeof res.data.message != "string")
            setQuestions(res.data.message);
          else {
            setQuestions([]);
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

  const deleteQuestion = async (id) => {
    try {
      await axiosInstance
        .delete(`/course/deleteAQuestion/${id}`)
        .then((res) => {
          dispatch(updateState(isUpdate + 1));
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {questions.map((item) => (
        <Accordion key={item.question.id}>
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls={`panel${item.question.id}-content`}
            id={`panel${item.question.id}-header`}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Typography width={"75%"}>
                {item.question.questionHead}
              </Typography>
              <div
                className="d-flex me-4"
                style={{
                  width: "25%",
                }}
              >
                <AddAnswer questionID={item.question.id} />

                <IconButton edge="end" aria-label="delete">
                  <MdOutlineDeleteForever
                    color="red"
                    size={20}
                    onClick={() => {
                      deleteQuestion(item.question.id);
                    }}
                  />
                </IconButton>
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <ListAnswer question={item} />
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
