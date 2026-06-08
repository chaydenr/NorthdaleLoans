import React, { useEffect, useState } from "react";
import { useLoansContext } from "Context/Context";
import { MyInput } from "./MyInput";


let loanInputData = {
  id: "",
  loanName: "",
  principal: "",
  interest: "",
  minPay: "",
  paysOff: ""
};

export const Form = (props: any) => {
  const context = useLoansContext();
  // states for Add New Loan form
  const [validForm, setValidForm] = useState(false);
  const [validLoanName, setValidLoanName] = useState(false);
  const [validPrincipal, setValidPrincipal] = useState(false);
  const [validInterest, setValidInterest] = useState(false);
  const [validMinPay, setValidMinPay] = useState(false);
  // states for Update loan form
  const [validUpdate, setValidUpdate] = useState(true);
  const [validLoanNameUpdate, setValidLoanNameUpdate] = useState(true);
  const [validPrincipalUpdate, setValidPrincipalUpdate] = useState(true);
  const [validInterestUpdate, setValidInterestUpdate] = useState(true);
  const [validMinPayUpdate, setValidMinPayUpdate] = useState(true);
  const [submitUpdate, setSubmitUpdate] = useState(false);

  const [formCount, setFormCount] = useState(() => {
    const savedCount = localStorage.getItem("savedCount");
    const intCount = parseInt(savedCount);
    return intCount || 0;
  });

if (props.type === "update") {
  loanInputData = {
    id: props.item.id,
    loanName: props.item.loanName,
    principal: props.item.principal,
    interest: props.item.interest,
    minPay: props.item.minPay,
    paysOff: props.item.paysOff
  };
}

  // sets Add New Loan button to clickable if all values are valid
  useEffect(() => {
    if (validLoanName && validPrincipal && validInterest && validMinPay) {
      setValidForm(true);
    } else if (!validLoanName || !validPrincipal || !validInterest || !validMinPay) {
      setValidForm(false);
    }
  }, [validLoanName, validPrincipal, validInterest, validMinPay]);

  // sets Update Loan button to clickable if all values are valid
  useEffect(() => {
    if (validLoanNameUpdate && validPrincipalUpdate && validInterestUpdate && validMinPayUpdate) {
      setValidUpdate(true);
    } else if (!validLoanNameUpdate || !validPrincipalUpdate || !validInterestUpdate || !validMinPayUpdate) {
      setValidUpdate(false);
    }
  }, [validLoanNameUpdate, validPrincipalUpdate, validInterestUpdate, validMinPayUpdate]);

  // grabs form data and sets up struct for data submission
  const submitHandler = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    let tempFormCount = formCount + 1;

    loanInputData = {
      id: tempFormCount.toString(),
      loanName: event.target.form[0].value,
      principal: event.target.form[1].value,
      interest: event.target.form[2].value,
      minPay: event.target.form[3].value,
      paysOff: ""
    };

    let loanPaidOff = checkPayoffPeriod(loanInputData);
    console.log(loanPaidOff)

    loanInputData["paysOff"] = loanPaidOff.toString();

    // !!!!! EDIT THIS LINE TO TEST CONTEXT INPUT !!!!!!!
    context.addToArray(
      tempFormCount.toString(),
      event.target.form[0].value,
      event.target.form[1].value,
      event.target.form[2].value,
      event.target.form[3].value,
      loanPaidOff.toString()
    );

    // once formCount updates, form data is sent to local storage in useEffect below
    setFormCount((formCount) => formCount + 1);
  };

  const updateHandler = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    loanInputData = {
      id: props.item.id,
      loanName: event.target.form[0].value,
      principal: event.target.form[1].value,
      interest: event.target.form[2].value,
      minPay: event.target.form[3].value,
      paysOff: ""
    };

    let loanPaidOff = checkPayoffPeriod(loanInputData);
    console.log(loanPaidOff)
    loanInputData["paysOff"] = loanPaidOff.toString();

    console.log(loanInputData);
    props.closeForm(props.item.id);

      console.log(loanInputData);
      localStorage.setItem(
        loanInputData.id,
        JSON.stringify(loanInputData)
      );
      
      context.updateArray(loanInputData.id, loanInputData.loanName, loanInputData.principal, loanInputData.interest, loanInputData.minPay, loanInputData.paysOff)
  }

  // checks if loan can be paid off within 100 years. returns true or false 
  const checkPayoffPeriod = (loan: any) => {
    let principal = loan.principal;
    let monthlyInterest = (loan.interest / 100) / 12;
    let monthTrack = 0;
    let paidOff;

    for(monthTrack; monthTrack <= 1200; monthTrack++) {
      principal = principal - loan.minPay; 
      console.log("principal after payment " + monthTrack+": " + principal)
      principal = principal + (principal * monthlyInterest);
      console.log("principal after interest: " + principal)

      if (principal <= 0) {
        console.log("paid off at month " + monthTrack);
        paidOff = true;
        return paidOff;
      } else if (monthTrack === 1200) {
        console.log("loan not paid off. balance left: $" + principal);
        paidOff = false;
        return paidOff;
      }
    }
  }

  // checks if all inputs are valid, submits form values to local storage, and resets form
  useEffect(() => {
    if (validLoanName && validPrincipal && validInterest && validMinPay) {
      const prefix = "NDL_"
      localStorage.setItem(
        JSON.stringify(prefix + formCount),
        JSON.stringify(loanInputData)
      );
    }

    // reset values
    loanInputData = {
      id: "",
      loanName: "",
      principal: "",
      interest: "",
      minPay: "",
      paysOff: ""
    };
    setValidLoanName(false);
    setValidPrincipal(false);
    setValidInterest(false);
    setValidMinPay(false);
    localStorage.setItem("savedCount", JSON.stringify(formCount));
  }, [formCount]);

  return (
    <form id="loanInputs" className={props.type === "update" ? "editLoan" : ""}>
      <div className={props.type === "update" ? "formList" : "form-elements"}>
        <MyInput
          label="Loan Name"
          type="text"
          id="loanName"
          divWidth="30%"
          isValid={(validity: boolean) => {
            setValidLoanName(validity);

            if (props.type ==="update") {
              setValidLoanNameUpdate(validity);
            }
          }}
          value={loanInputData.loanName}
          formReset={props.type==="submit" ? formCount : null}
        />
        <MyInput
          label="Principal Balance Remaining"
          type="number"
          id="principal"
          divWidth="30%"
          isValid={(validity: boolean) => {
            setValidPrincipal(validity);

            if (props.type ==="update") {
              setValidPrincipalUpdate(validity);
            }
          }}
          value={loanInputData.principal}
          formReset={props.type==="submit" ? formCount : null}
        />
        <MyInput
          label="Interest Rate"
          type="number"
          id="interest"
          divWidth="15%"
          isValid={(validity: boolean) => {
            setValidInterest(validity);
            if (props.type ==="update") {
              setValidInterestUpdate(validity);
            }
          }}
          value={loanInputData.interest}
          formReset={props.type==="submit" ? formCount : null}
        />
        <MyInput
          label="Minimum Payment"
          type="number"
          id="minPay"
          divWidth="20%"
          isValid={(validity: boolean) => {
            setValidMinPay(validity);
            if (props.type ==="update") {
              setValidMinPayUpdate(validity);
            }
          }}
          value={loanInputData.minPay}
          formReset={props.type==="submit" ? formCount : null}
        />
      </div>
      <div className="newLoan">
        {props.type === "submit" ? (
          <button type="submit" onClick={submitHandler} disabled={!validForm}>
            Add New Loan
          </button>
        ) : (
          <button type="submit" onClick={updateHandler} disabled={!validUpdate}>
            Update
          </button>
        )}
      </div>
    </form>
  );
};
