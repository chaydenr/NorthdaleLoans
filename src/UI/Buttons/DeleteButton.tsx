import React, {  useState } from "react";
import { useLoansContext } from "Context/Context";
import "./Edit-DeleteButton.scss";

export const DeleteButton = (props:any) => {
  const context = useLoansContext();
  const [background, setBackground] = useState("white");
  const [icon, setIcon] = useState("#FF2E00");

  const deleteLoan = () => {
    console.log("delete loanID: " + props.loanID);
    var index = context.loansArray
      .map(function (e: any) {
        return e.id;
      })
      .indexOf(props.loanID);
    // var index = context.loansArray.indexOf(context.loansArray.id === props.loanID);
    console.log(index);
    if (index >= 0) {
      context.loansArray.splice(index, 1);
    }
    context.deletedItem();

    localStorage.removeItem(props.loanID);

    // console.log("length" + context.loansArray.length)

    if (context.loansArray.length % 5 === 0) {
      console.log("back")
      props.changePage("back");
    }
    console.log(context.loansArray);
  };

  return (
    // <div style={{ paddingLeft: "35px" }} className="edit-delete">
    <div className="edit-delete">
      <button
        onMouseEnter={() => {
          setBackground("#FF2E00");
          setIcon("white");
        }}
        onMouseLeave={() => {
          setBackground("white");
          setIcon("#FF2E00");
        }}
        onClick={deleteLoan}
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
            stroke="#FF2E00"
            strokeWidth="2"
          />
          <path
            d="M27 13.91L24.09 11L19 16.09L13.91 11L11 13.91L16.09 19L11 24.09L13.91 27L19 21.91L24.09 27L27 24.09L21.91 19L27 13.91Z"
            fill={icon}
          />
        </svg>
      </button>
    </div>
  );
};
