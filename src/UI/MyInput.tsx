import React, { useState, useEffect } from "react";

export const MyInput = (props: any) => {
  const { type, id } = props;
  const [value, setValue] = useState(props.value ?? "");
  const [valid, setValid] = useState(true);

  console.log('VALUE', value)

  const checkInputValue = (e: any) => {
    console.log('HIT', e.target.value)
    var t: string = e.target.value;
    if (props.type === "number" && t.includes(".")) {
      let val = t.split(".");
      const temp = val[1];
      temp.split("");

      if (temp.length == 1) {
        t = val[0] + "." + temp[0];
      } else {
        t = val[0] + "." + temp[0] + temp[1];
      }
    }
    console.log(t)
    setValue(t);

    let temp = t;
    let tempBool = null;
    if (temp.replace(/ /g, "") === "" || temp.replace(/ /g, "") === ".") {
      setValid(false);
      tempBool = false;
    } else {
        setValid(true);
        tempBool = true;
    }
    props.isValid(tempBool);
  };

  const checkCharacters = (e: any) => {
    if (props.type === "number") {
      ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();
    }
  };

  useEffect(() => {
    if(props.formReset) {
        setValue("");
        setValid(true);
    }
  }, [props.formReset])

  return (
    <div className={`text-div${!valid ? "__error" : ""}`} style={{ width: props.divWidth }}>
      <label>{props.label}</label>
      <input
        type={props.type}
        id={props.id}
        name={props.id}
        style={{ width: "100%", fontSize:"16px", fontFamily:"Open Sans" }}
        onChange={(e) => checkInputValue(e)}
        onKeyDown={checkCharacters}
        step="0.01"
        min="0"
        value={value}
      />
      {!valid ? <span
        style={{ position: "absolute", fontSize: "12px", padding: "5px 15px" }}
      >
        This field is required
      </span> : <span></span>}
    </div>
  );
};
