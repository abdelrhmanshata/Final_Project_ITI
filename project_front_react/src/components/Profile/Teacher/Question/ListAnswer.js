import {
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { axiosInstance } from "api/config";
import React, { useEffect, useState } from "react";
import { BiCheckCircle } from "react-icons/bi";
import { MdOutlineCancel, MdOutlineDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { updateState } from "store/slices/update";

export default function ListAnswer({ question }) {
  const dispatch = useDispatch();
  const isUpdate = useSelector((state) => state.update.isUpdate);
  // dispatch(updateState(isUpdate + 1));
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    setAnswers(question.answers);
  }, [question, isUpdate]);

  const deleteAnswer = async (id) => {
    console.log(id);
    try {
      await axiosInstance
        .delete(`/course/deleteAnswer/${id}`)
        .then((res) => {
          dispatch(updateState(isUpdate + 1));
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {answers.map((answer, index) => (
        <ListItem
          key={index}
          secondaryAction={
            <>
              <IconButton edge="end" aria-label="delete">
                <MdOutlineDeleteForever
                  color="red"
                  onClick={() => {
                    deleteAnswer(answer.id);
                  }}
                />
              </IconButton>
            </>
          }
        >
          <ListItemAvatar>
            {answer.isAnswer ? (
              <BiCheckCircle color="green" size={24} />
            ) : (
              <MdOutlineCancel color="red" size={24} />
            )}
          </ListItemAvatar>
          <ListItemText primary={answer.answerText} />
        </ListItem>
      ))}
    </>
  );
}
