import React, { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

import "./AccordionDropdown.css";

export default function AccordionDropdown({ items }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const onItemClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="accordion-dropdown w-100 bg-primary">
      {items.map((item, index) => (
        <div key={index} className="accordion-item">
          <div
            className="accordion-question"
            onClick={() => onItemClick(index)}
          >
            <h3>{item.question}</h3>
            <span
              className="list-icon"
              onClick={(e) => {
                e.stopPropagation();
                onItemClick(index);
              }}
            >
              <IoMdArrowDropdown />
            </span>
          </div>
          <div
            className={
              activeIndex === index
                ? "accordion-answers show"
                : "accordion-answers"
            }
          >
            {item.answers.map((answer, ansIndex) => (
              <div key={ansIndex} className="accordion-answer">
                <label>{answer.label}</label>
                <input
                  type="radio"
                  value={answer.value}
                  checked={answer.value === item.selectedValue}
                  onChange={() => item.onSelect(answer.value)}
                />
              </div>
            ))}
            <button
              className="submit-button"
              onClick={() => console.log("Submit clicked")}
            >
              Submit
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
