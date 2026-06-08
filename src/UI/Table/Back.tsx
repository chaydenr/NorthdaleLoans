import React, { useEffect, useState } from "react";

export const Back = (props: any) => {
  const[active, setActive] = useState(false);

  useEffect(() => {
    if (props.page === 1) {
      setActive(false);
    } else {
      setActive(true);
    }
  }, [props.page])

  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 12 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.5 1L1 8.5L10.5 16.5"
        stroke={active ? "#4D4A4A" : "#d9d9d9" }
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
