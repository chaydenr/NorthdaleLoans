import React, { useEffect, useState } from "react";
import { useLoansContext } from "Context/Context";
import "./Pagination.scss";
import { Back } from "./Back";
import { Forward } from "./Forward";

export const Pagination = (props: any) => {
  const context = useLoansContext();
  const [pages, setPages] = useState(0);

  let tableLength = 0;
  if (props.tableType === "inputs") {
    tableLength = context.loansArray.length
    console.log(tableLength)
  }
  else if (props.tableType === "snowball") {
    tableLength = context.snowballArray.length
    console.log(tableLength)
  }
  else if (props.tableType === "avalanche") {
    tableLength = context.avalancheArray.length
    console.log(tableLength)
  }

  let pagesTemp: any = [];
  let startPage: number,
    endPage: number,
    ellipses1: boolean,
    ellipses2: boolean;

  useEffect(() => {
    let totalPages = Math.ceil(tableLength / 5);
    // create pagination rules
    if (totalPages > 5) {
      if (props.currPage < 5) {
        // [1] 2 3 4 5 ... x
        // THROUGH
        // 1 2 3 [4] 5 ... x
        startPage = 1;
        endPage = 5;
        ellipses1 = false;
        ellipses2 = true;
      } else if (props.currPage >= 5 && totalPages - props.currPage >= 4) {
        // 1 ... 3 4 [5] 6 7 ... x
        startPage = props.currPage - 1;
        endPage = props.currPage + 1;
        ellipses1 = ellipses2 = true;
      } else if (props.currPage >= 5 && totalPages - props.currPage <= 3) {
        // 1 ... 6 7 8 9 [10]
        startPage = totalPages - 4;
        endPage = totalPages;
        ellipses1 = true;
        ellipses2 = false;
      }
    } else {
      // regular pagination
      // [1] 2 3 4 5
      startPage = 1;
      endPage = totalPages;
      ellipses1 = ellipses2 = false;
    }

    // form pagination button list
    // add back button to pagination list
    pagesTemp.push(
    <button 
        key={"back"}
        onClick={() => props.changePage("back")} 
        className={props.currPage === 1 ? "inactive__e__arrow" : "inactive"} 
        disabled={props.currPage === 1 ? true : false }>
          <Back page={props.currPage}/>
    </button>)
    // check if 1st ellipses is needed. if needed, add to front of pagination list
    if (ellipses1) {
      pagesTemp.push(
      <button 
        key={1}
        onClick={() => props.changePage(1)} 
        className="inactive">
          1
      </button>);
      pagesTemp.push(
      <button 
        key={"e1"} 
        className="inactive__e" 
        style={{cursor:"default"}} 
        disabled>
          ...
      </button>);
    }
    // create pagination enumerable list from startPage to endPage
    for (let i = startPage; i <= endPage; i++) {
      pagesTemp.push(
      <button 
        key={i}
        onClick={() => props.changePage(i)} 
        className={props.currPage === i ? "active" : "inactive"}>
          {i}
      </button>);
    }
    // check if 2nd ellipses is needed. if needed, add to end of pagination list
    if (ellipses2) {
      pagesTemp.push(
      <button 
        key={"e2"}
        className="inactive__e" 
        style={{cursor:"default"}} 
        disabled>
          ...
      </button>);
      pagesTemp.push(
      <button 
        key={totalPages}
        onClick={() => props.changePage(totalPages)} 
        className="inactive">
          {totalPages}
      </button>);
    }
    // add forward button to pagination list
    pagesTemp.push(
    <button 
      key={"forward"}
      onClick={() => props.changePage("forward")} 
      className={props.currPage === totalPages ? "inactive__e__arrow" : "inactive"} 
      disabled={props.currPage === totalPages ? true : false }>
        <Forward page={props.currPage} last={totalPages}/>
    </button>)
    // set state using table list created above
    setPages(pagesTemp)
  }, [context.loansArray.length, props.currPage, context.avalancheArray.length, context.snowballArray.length]); 

  return <div className="pages-row">{pages}</div>;
};
