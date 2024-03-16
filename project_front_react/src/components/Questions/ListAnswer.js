import React, { useState } from "react";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";

export default function ListAnswer({ answers, score, setScore }) {
  const acceptAnswer = (answer) => {
    if (answer.isAnswer) {
      setScore(score + 1);
    }
  };

  return (
    <>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
      >
        {answers.map((item) => (
          <FormControlLabel
            value={item.answerText}
            control={
              <Radio
                onClick={() => {
                  acceptAnswer(item);
                }}
              />
            }
            label={item.answerText}
          />
        ))}
      </RadioGroup>
    </>
  );
}
