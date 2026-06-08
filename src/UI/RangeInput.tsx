import React, { useEffect, useState } from "react";
import { useLoansContext } from "Context/Context";

export const RangeInput = () => {
  const context = useLoansContext();
  const [textboxValue, setTextboxValue] = useState(context.rangeVal);

  const handleValChange = (event) => {
    event.preventDefault();
    const value = parseFloat(event.target.value);
    context.setRangeValue(value);
    setTextboxValue(event.target.value);
  };

  const getRangeMinMax = () => {
    let min = 0;
    let max = 0;
    for (let i = 0; i < context.loansArray.length; i++) {
      if(context.loansArray[i].paysOff !== "false") {
        min += parseFloat(context.loansArray[i].minPay);
        max += parseFloat(context.loansArray[i].principal);
      }
    }
    context.setRangeMinMax(min, max);
  };

  useEffect(() => {
    getRangeMinMax();

    for (let e of document.querySelectorAll(
      'input[type="range"].slider-progress'
    )) {
      e.style.setProperty("--value", e.value);
      e.style.setProperty("--min", e.min == "" ? "0" : e.min);
      e.style.setProperty("--max", e.max == "" ? "100" : e.max);
      e.addEventListener("input", () =>
        e.style.setProperty("--value", e.value)
      );
    }

  }, [context.editedFlag, textboxValue]);

  const handleRangeInputVal = (event) => {
    var split = event.target.value.split(".");
    var decimal = split[1];
    console.log(decimal);

    if (decimal === undefined || decimal.length <= 2) {
      setTextboxValue(event.target.value);
      context.setRangeValue(event.target.value);
    }
  };

  const checkValidRangeInput = (event) => {
    var value = parseFloat(event.target.value);
    console.log(event.target.value);
    if (value <= parseFloat(context.rangeMin) || event.target.value === "") {
      setTextboxValue(context.rangeMin);
      context.setRangeValue(context.rangeMin);
    } else if (value >= parseFloat(context.rangeMax)) {
      setTextboxValue(context.rangeMax);
      context.setRangeValue(context.rangeMax);
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <input
        type="range"
        step={0.01}
        min={context.rangeMin}
        max={context.rangeMax}
        value={context.rangeVal}
        onChange={handleValChange}
        style={{
          padding: "10px",
          border: "none",
          width: "225px",
          backgroundColor: "transparent",
          marginRight: "10px",
        }}
        className="styled-slider slider-progress"
      />
      <input
        type="number"
        value={textboxValue}
        style={{ width: "110px" }}
        onChange={handleRangeInputVal}
        step={0.01}
        onBlur={checkValidRangeInput}
      />
    </div>
  );
};
