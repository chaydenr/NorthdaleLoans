import React, { useState } from "react";
import "./Edit-DeleteButton.scss";

export const EditButton = (props:any) => {
  const [background, setBackground] = useState("white");
  const [icon, setIcon] = useState("#1F1F1F");

  return (
    <div className="edit-delete">
      <button
        onMouseEnter={() => {
          setBackground("#1F1F1F");
          setIcon("white");
        }}
        onMouseLeave={() => {
          setBackground("white");
          setIcon("#1F1F1F");
        }}
        onClick={() => props.editingFlag(props.loanID)}
      >
        <svg
          width="35"
          height="35"
          viewBox="0 0 38 38"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="19"
            cy="19"
            r="18"
            fill={background}
            stroke="#1F1F1F"
            strokeWidth="2"
          />
          <path
            d="M27.71 14.04C28.1 13.65 28.1 13 27.71 12.63L25.37 10.29C25 9.9 24.35 9.9 23.96 10.29L22.12 12.12L25.87 15.87M10 24.25V28H13.75L24.81 16.93L21.06 13.18L10 24.25Z"
            fill={icon}
          />
        </svg>
      </button>
    </div>
  );
};
