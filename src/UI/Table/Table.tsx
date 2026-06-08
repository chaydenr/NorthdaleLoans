import React, { useState } from "react";
import { useLoansContext } from "Context/Context";
import "./Table.scss";
import { EditButton } from "../Buttons/EditButton";
import { DeleteButton } from "../Buttons/DeleteButton";
import { Pagination } from "./Pagination";
import { Form } from "UI/Form";
import { ErrorIcon } from "./ErrorIcon";
import { DetailsButton } from "UI/Buttons/DetailsButton";

export const Table = (props: any) => {
  const context = useLoansContext();
  const [currentPagination, setCurrentPagination] = useState(1);
  const [currentlyEditing, setCurrentlyEditing] = useState(-1);
  const [activeSeeDetailsList, setActiveSeeDetailsList] = useState<Array<number>>([]);

  const handleChangePage = (page: number | string) => {
    setActiveSeeDetailsList([]);
    if (page === "back") {
      if (currentPagination !== 1) {
        setCurrentPagination(currentPagination - 1);
      }
    } else if (page === "forward") {
      setCurrentPagination(currentPagination + 1);
    } else {
      setCurrentPagination(+page);
    }
  };

  const handleEditFlag = (id: number) => {
    if (currentlyEditing === id) {
      setCurrentlyEditing(-1);
    } else {
      setCurrentlyEditing(id);
    }
  };

  const errorMessage =
  <div className="error-message">
    <ErrorIcon />
    <div>
      <span>We simulated your current payment plan and could not pay off all of the loan.<br/ >
      This usually occurs from interest growing faster than you're paying off principle.<br/ >
      <u>This loan will be excluded from the paydown calculations.</u></span>
    </div>
  </div>

  /**
   * Toggles the hide/show button of a row.
   * @param item - The item number
   */
  const snowballHandler = (item: number) => {
    
    const INDEX = activeSeeDetailsList.indexOf(item);

    let tempArr = JSON.parse(JSON.stringify(activeSeeDetailsList));

    if(INDEX === -1) {
      tempArr.push(item);
    }
    else {
      tempArr.splice(INDEX, 1);
    }

    setActiveSeeDetailsList(tempArr);
  }

  const getLoanDetails = (loanID: number) => {
    let tempArr =[]
    for (let j=0; j<context.snowballDetails[loanID].length; j++) {
      tempArr.push(
        // <div className="loan-item">
        <div className="snow-av-details">
          <p>{context.snowballDetails[loanID][j].loanName}</p>
          <p>${context.snowballDetails[loanID][j].principalPaid.toFixed(2)}</p>
          <p>${context.snowballDetails[loanID][j].interestPaid.toFixed(2)}</p>
          <p>{context.snowballDetails[loanID][j].piRatio.toFixed(2)}</p>
          <p>${context.snowballDetails[loanID][j].amountPaid.toFixed(2)}</p>
        </div>)
    }
    return tempArr;
  }

  const getAvalancheDetails = (loanID: number) => {
    let tempArr =[]

    for (let j=0; j<context.avalancheDetails[loanID].length; j++) {
      tempArr.push(
        <div className="snow-av-details">
          <p>{context.avalancheDetails[loanID][j].loanName}</p>
          <p>${context.avalancheDetails[loanID][j].principalPaid.toFixed(2)}</p>
          <p>${context.avalancheDetails[loanID][j].interestPaid.toFixed(2)}</p>
          <p>{context.avalancheDetails[loanID][j].piRatio.toFixed(2)}</p>
          <p>${context.avalancheDetails[loanID][j].amountPaid.toFixed(2)}</p>
        </div>)
    }
    return tempArr;
  }

  const rows: any = [];
  const getLoansRow = () => {
    if (context.loansArray.length <= 0) {
      // setCurrentPagination(1);
      rows.push(
        <p key={0} className="no-loans">
          No loans to show
        </p>
      );
    }
    else if (context.loansArray.length > 0) {
      if (context.loansArray.length < 6) {
        // setCurrentPagination(1);
      }
      let pageLimit = currentPagination * 5;
      let pageStart = pageLimit - 5;
      for (
        let i = pageStart;
        i < pageLimit && i < context.loansArray.length;
        i++
      ) {
        rows.push(
          <div className={context.loansArray[i].paysOff === "true" ? "loan-item" : "loan-item__error"}>
            <div key={context.loansArray[i].id} className="column-items">
              <p>{context.loansArray[i].loanName}</p>
              <p>${context.loansArray[i].principal}</p>
              <p>{context.loansArray[i].interest}%</p>
              <p>${context.loansArray[i].minPay}</p>
              <EditButton
                loanID={context.loansArray[i].id}
                editingFlag={handleEditFlag}
                />
              <DeleteButton
                loanID={context.loansArray[i].id}
                arrayLength={context.loansArray.length}
                changePage={handleChangePage}
                />
            </div>
            {context.loansArray[i].paysOff === "true" ? <></> : errorMessage}
          </div>
        );
        if (currentlyEditing === context.loansArray[i].id) {
          let item= {
            id: context.loansArray[i].id,
            loanName: context.loansArray[i].loanName,
            principal: context.loansArray[i].principal,
            interest: context.loansArray[i].interest,
            minPay: context.loansArray[i].minPay
          }
          rows.push(
            <Form type="update" item={item} closeForm={handleEditFlag} />
          )
        }
      }
    }
    return rows;
  };

  const getSnowballRow = () => {
    console.log(context.snowballArray);
    if (context.snowballArray.length <= 0) {
      rows.push(
        <p key={0} className="no-loans">
          No loans to show
        </p>
      );
    }
    else if (context.snowballArray.length > 0) {
      if (context.snowballArray.length < 6) {
      }
      let pageLimit = currentPagination * 5;
      let pageStart = pageLimit - 5;
      for (
        let i = pageStart;
        i < pageLimit && i < context.snowballArray.length;
        i++
      ) {
        const IS_ACTIVE = activeSeeDetailsList.indexOf(context.snowballArray[i].id) !== -1;
       
        rows.push(<div className="loan-item">
          <div key={context.snowballArray[i].id} className="snow-av-column-items">
            <p>{context.snowballArray[i].currentMonth}</p>
            <p>${context.snowballArray[i].principalPaid.toFixed(2)}</p>
            <p>${context.snowballArray[i].interestPaid.toFixed(2)}</p>
            <p>{context.snowballArray[i].piRatio.toFixed(2)}</p>
            <p>${context.snowballArray[i].amountPaid.toFixed(2)}</p>
            <p><DetailsButton checkActive={snowballHandler} isActive={IS_ACTIVE} itemNumber={context.snowballArray[i].id} /></p>
          </div>
        </div>);
        if (activeSeeDetailsList.indexOf(context.snowballArray[i].id) !== -1) {
          rows.push(<div className="loan-item">
            {getLoanDetails(context.snowballArray[i].id)}
          </div>)
          ;
        }
      }
    }
    return rows;
  };


  const getAvalancheRow = () => {
    console.log(context.avalancheArray);
    if (context.avalancheArray.length <= 0) {
      rows.push(
        <p key={0} className="no-loans">
          No loans to show
        </p>
      );
    }
    else if (context.avalancheArray.length > 0) {
      if (context.avalancheArray.length < 6) {
      }
      let pageLimit = currentPagination * 5;
      let pageStart = pageLimit - 5;
      for (
        let i = pageStart;
        i < pageLimit && i < context.avalancheArray.length;
        i++
      ) {
        const IS_ACTIVE = activeSeeDetailsList.indexOf(context.avalancheArray[i].id) !== -1;
        rows.push(<div key={context.avalancheArray[i].id} className="loan-item">
          <div  className="snow-av-column-items">
            <p>{context.avalancheArray[i].currentMonth}</p>
            <p>${context.avalancheArray[i].principalPaid.toFixed(2)}</p>
            <p>${context.avalancheArray[i].interestPaid.toFixed(2)}</p>
            <p>{context.avalancheArray[i].piRatio.toFixed(2)}</p>
            <p>${context.avalancheArray[i].amountPaid.toFixed(2)}</p>
            <p><DetailsButton checkActive={snowballHandler} isActive={IS_ACTIVE} itemNumber={context.avalancheArray[i].id} /></p>
          </div>
        </div>);
        if (activeSeeDetailsList.indexOf(context.avalancheArray[i].id) !== -1) {
          console.log(context.avalancheDetails);
          rows.push(<div  className="loan-item">
            {getAvalancheDetails(context.avalancheArray[i].id)}
          </div>)
          ;
        }
      }
    }
    return rows;
  };
  console.log("tabledata", context.loansArray);

  // !! COLE MAP EXAMPLE !!
  // const renderTableCorrectly = () => {
  //   const tableData = context.loansArray.slice(0, 5)
  //   console.log(tableData)
  //   return tableData.map((ele: any) => {
  //     console.log(ele)
  //     return <div style = {{color: 'black'}}>
  //       <span>{ele.loanName !== 'heart' ? ele.loanName : '<3'}</span>
  //       <span>{ele.principal}</span>
  //       <span>{ele.interest}</span>
  //     </div>
  //   })
  // }

  const getTableLength = () => {
    if (props.tableType === "inputs") {
      return(context.loansArray.length)
    }
    else if (props.tableType === "snowball") {
      return(context.snowballArray.length)
    }
    else if (props.tableType === "avalanche") {
      return(context.avalancheArray.length)
    }
  }

  if(props.tableType === 'inputs') {
    return  (<LayoutWrapper 
      getTableLength={getTableLength}
      handleChangePage={handleChangePage}
      currentPagination={currentPagination}
      tableType={props.tableType}

      >
      <div>
    <div className="title">
      <div>Loans</div>
      <div className="badge">{context.loansArray.length}</div>
    </div>
    <div className="column-names">
      <p>Loan Name</p>
      <p>Principal</p>
      <p>Interest</p>
      <p>Minimum Payment</p>
      <p></p>
    </div>
    {getLoansRow()}
  </div>
      </LayoutWrapper>)
  }

  if(props.tableType === 'snowball') {
    return <LayoutWrapper 
    getTableLength={getTableLength}
    handleChangePage={handleChangePage}
    currentPagination={currentPagination}
    tableType={props.tableType}
    >
       <div>
        <div className="title">
          <div>Paydown</div>
          <div className="badge">{context.snowballArray.length}</div>
        </div>
        <div className="snow-av-column-names">
          <p>Month</p>
          <p>Principal Paid</p>
          <p>Interest Paid</p>
          <p>P/I Ratio</p>
          <p>Amount Paid</p>
          <p></p>
        </div>
        {getSnowballRow()}
      </div>
    </LayoutWrapper>
  }

  if (props.tableType === "avalanche") {
    return <LayoutWrapper 
    getTableLength={getTableLength}
    handleChangePage={handleChangePage}
    currentPagination={currentPagination}
    tableType={props.tableType}
    >
      <div>
      <div className="title">
        <div>Paydown</div>
        <div className="badge">{context.avalancheArray.length}</div>
      </div>
      <div className="snow-av-column-names">
        <p>Month</p>
        <p>Principal Paid</p>
        <p>Interest Paid</p>
        <p>P/I Ratio</p>
        <p>Amount Paid</p>
        <p></p>
      </div>
      {getAvalancheRow()}
    </div>
  </LayoutWrapper>
  }
}

const LayoutWrapper = (props: any) => {
  const { children, getTableLength, handleChangePage, currentPagination } = props; 

  return   <div>
  <div className={"table-base"}>{children}</div>
  {/* {renderTableCorrectly()} */}
  {getTableLength() >= 6 ? (
    <Pagination
      changePage={handleChangePage}
      currPage={currentPagination}
      arrayLength={getTableLength()}
      tableType={props.tableType}
    />
  ) : (
    <></>
  )}
</div>
}

