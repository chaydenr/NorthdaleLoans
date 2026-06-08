import React, { useEffect, useState } from "react";

export const Forward = (props:any) => {
  const[active, setActive] = useState(true);

  useEffect(() => {
    if (props.page === props.last) {
      setActive(false);
    } else {
      setActive(true);
    }
  }, [props.page, props.last])

  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 12 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.5 17L11 9.5L1.5 1.5"
        stroke={active ? "#4D4A4A" : "#d9d9d9" }
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
