import { Form } from "UI/Form";
import { Table } from "UI/Table/Table";
import { RangeInput } from "UI/RangeInput.js";
import "./Inputs.scss";

export const Inputs = () => {
  return (
    <div style={{ maxHeight: "100vh" }}>
      <div className="inputs">
        <div>
          <Form type="submit"/>
          <div className="slider">
            <label>Monthly Payment</label>
            <div className="side-by-side">
              <RangeInput />
            </div>
          </div>
        </div>
        <Table tableType="inputs" />
      </div>
    </div>
  );
};
