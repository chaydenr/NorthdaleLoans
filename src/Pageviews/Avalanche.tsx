import React, { useEffect, useState } from "react";
import { BackToInputs } from "UI/BackToInputs";
import { Graph } from "UI/Graph";
import { Table } from "UI/Table/Table";
import { useLoansContext } from "Context/Context";
import "./Avalanche-Snowball.scss";

export const Avalanche = () => {
  const context = useLoansContext();
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPaid, setTotalPaid] = useState(0);
  const [averageInterest, setAverageInterest] = useState(0);
  const [totalInterestArray, setTotalInterestArray] = useState<any>([]);
  const [totalPaidArray, setTotalPaidArray] = useState<any>([]);
  const [averageInterestArray, setAverageInterestArray] = useState<any>([]);

  var avalancheMonthTotals: any[] = [];
  var avalancheMonthlyLoans: any[] = [];
  var date = new Date();
  var month = date.getMonth();
  var year = date.getFullYear();
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var tmptotalInterest:number = 0 , tmptotalPaid:number = 0, tmpaverageInterest:number = 0;
  var tmptotalInterestArray: number[] = [];
  var tmptotalPaidArray: number[] = [];
  var tmpaverageInterestArray: number[] = [];
  var id = 0;

  const payOffLoans = () => {
    var loansCopy = structuredClone(context.loansArray);

    // sort in order of highest interest rate to lowest (avalanche order)
    loansCopy.sort((loan1, loan2) =>
      parseFloat(loan1.interest) < parseFloat(loan2.interest) ? 1
        : parseFloat(loan1.interest) > parseFloat(loan2.interest) ? -1
        : 0
    );
    // console.log(loansCopy)

    // loop through loansCopy, delete loans as they pay off, loop through until array is empty
    while (loansCopy.length !== 0) {
      // create month object
      var monthObj = { id: id,
        currentMonth: months[month] + " " + year,
        principalPaid: 0,
        interestPaid: 0,
        piRatio: 0,
        amountPaid: 0 };

      var currentMonthLoansList = [];
      
      // calculate any extra monthly payment to apply to loans in avalanche order
      var monthlyPayment = context.rangeVal;
      for (let i = 0; i < loansCopy.length; i++) {
        monthlyPayment -= parseFloat(loansCopy[i].minPay);
      }

      // loop through loans list and do current month's calculations
      for (let i = 0; i < loansCopy.length; i++) {
        if(loansCopy[i].paysOff === "false") {
          loansCopy.splice(i, 1); // remove loans that do not pay off in time
          i--;
          continue;
        }

        // create current loan object
        var loanObj = { loanName: loansCopy[i].loanName,
        principalPaid: 0,
        interestPaid: 0,
        piRatio: 0,
        amountPaid: 0 }

        var currPrincipal = parseFloat(loansCopy[i].principal);
        var currInterest = parseFloat(loansCopy[i].interest) / 1200;
        var currPayment = parseFloat(loansCopy[i].minPay);

        currPrincipal -= currPayment;
        loanObj["principalPaid"] += currPayment;
        if (monthlyPayment > 0) {
          currPrincipal -= monthlyPayment;
          loanObj["principalPaid"] += monthlyPayment;
          monthlyPayment -= monthlyPayment;
        }

        // track any leftover payment for next loan
        if (currPrincipal <= 0) {
          loanObj["principalPaid"] += currPrincipal;
          monthlyPayment += currPrincipal * -1;
          loansCopy.splice(i, 1); // remove paid off loan from loans list
          i--;
          
        } // if no leftovers, update loan's principal
        else if (currPrincipal > 0) {
          var interestPaid = currPrincipal * currInterest
          loanObj["interestPaid"] += interestPaid;
          currPrincipal += interestPaid;
          loansCopy[i].principal = currPrincipal;
        }

        // update month object with current loan's totals
        monthObj["principalPaid"] += loanObj["principalPaid"];
        monthObj["interestPaid"] += loanObj["interestPaid"];

        // calculate loan's PI ratio and amount paid
        loanObj["piRatio"] = loanObj["principalPaid"] / loanObj["interestPaid"];
        loanObj["amountPaid"] = loanObj["principalPaid"] + loanObj["interestPaid"];

        // add loan to monthly loans list
        currentMonthLoansList.push(loanObj);
      }
      // save current month's loan payoff list
      avalancheMonthlyLoans.push(currentMonthLoansList);

      // calculate total monthly PI ration and amount paid
      monthObj["piRatio"] = monthObj["principalPaid"] / monthObj["interestPaid"];
      monthObj["amountPaid"] = monthObj["principalPaid"] + monthObj["interestPaid"];

      // add current month's total numbers to array
      avalancheMonthTotals.push(monthObj);
      id++;
      tmptotalInterest += monthObj["interestPaid"];
      tmptotalPaid += monthObj["amountPaid"];
      tmpaverageInterest = tmptotalInterest / id;
      
      tmptotalInterestArray.push(monthObj["interestPaid"]);
      tmptotalPaidArray.push(monthObj["amountPaid"]);
      tmpaverageInterestArray.push(tmpaverageInterest);

      month++;
      if (month === 12) {
        month = 0;
        year++;
      }

      if (year > (year + 100)) {
        break;
      }
    }
    
    // if no loans to pay off, show empty loans list
    if(avalancheMonthTotals.length > 0 &&
      avalancheMonthTotals[0].principalPaid === 0 && 
      avalancheMonthTotals[0].interestPaid === 0 &&  
      Number.isNaN(avalancheMonthTotals[0].piRatio)) {
        avalancheMonthTotals.splice(0, 1);
    }

    console.log("loans: ",  avalancheMonthTotals);
    console.log("totals: ",  avalancheMonthlyLoans);

    context.setAvalancheArr(avalancheMonthTotals);
    context.setAvalancheDetails(avalancheMonthlyLoans);
    setTotalInterest(parseFloat(tmptotalInterest.toFixed(2)));
    setTotalPaid(parseFloat(tmptotalPaid.toFixed(2)));
    setAverageInterest(parseFloat(tmpaverageInterest.toFixed(2)));
    setTotalInterestArray(tmptotalInterestArray);
    setTotalPaidArray(tmptotalPaidArray);
    setAverageInterestArray(tmpaverageInterestArray);
  };

  useEffect(() => {
    payOffLoans();
  }, [])

  return (
    <div className="av-snow">
      <BackToInputs />
      <h1>Avalanche paydown</h1>
      <p>Pay down loans with the highest interest rate first</p>
      <div className="graph-list">
      <Graph color="purple" title="Total interest" amount={totalInterest} arrayVals={totalInterestArray} />
        <Graph color="orange" title="Total paid" amount={totalPaid} arrayVals={totalPaidArray} />
        <Graph color="green" title="Average interest" amount={averageInterest} arrayVals={averageInterestArray} />
      </div>
      <Table tableType="avalanche" />
    </div>
  );
};

// 9/23 - 3/24
// 4383.8 (988 min) 
// 4189.12(1500)
// 4001.69(2000)
// 3820.17(2500)