import React from "react";
import AccordionDropdown from "./Accordion";

export default function Apps() {
  const items = [
    {
      question: "Question 1",
      answers: [
        { label: "Answer 1", value: "answer1" },
        { label: "Answer 2", value: "answer2" },
        { label: "Answer 3", value: "answer3" },
        { label: "Answer 4", value: "answer4" },
      ],
      selectedValue: "",
      onSelect: (value) => console.log("Selected Value:", value),
    },
    {
      question: "Question 1",
      answers: [
        { label: "Answer 1", value: "answer1" },
        { label: "Answer 2", value: "answer2" },
        { label: "Answer 3", value: "answer3" },
        { label: "Answer 4", value: "answer4" },
      ],
      selectedValue: "",
      onSelect: (value) => console.log("Selected Value:", value),
    },
  ];

  return (
    <div className="App w-100">
      <AccordionDropdown items={items} />
    </div>
  );
}
