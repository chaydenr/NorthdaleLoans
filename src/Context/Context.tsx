import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

const LoansContext = createContext<any | null>(null);

const useLoansContext = () => {
  const context = useContext(LoansContext);

  if (!context) {
    throw new Error("error");
  }

  const addToArray = (id:string, loanName:string, principal:string, interest:string, minPay:string, paysOff:string) => {
    const updateLoans:any[] = [{
      id: id,
      loanName: loanName,
      principal: principal,
      interest: interest,
      minPay: minPay,
      paysOff: paysOff
    }, ...context.loansArray]

    context.setLoansArray(updateLoans);
  }

  const updateArray = (id:string, loanName:string, principal:string, interest:string, minPay:string, paysOff:string) => {
    let itemIndex = context.loansArray.findIndex(((object:any) => object.id == id));
    console.log("Before update:", context.loansArray[itemIndex]);

    context.loansArray[itemIndex].loanName = loanName;
    context.loansArray[itemIndex].principal = principal;
    context.loansArray[itemIndex].interest = interest;
    context.loansArray[itemIndex].minPay = minPay;
    context.loansArray[itemIndex].paysOff = paysOff;

    console.log("After update:", context.loansArray[itemIndex]);

    context.setEditedFlag(context.editedFlag + 1);
  }

  const initializeArray = (existingLoans:any[]) => {
    context.setLoansArray(existingLoans.sort((loanA, loanB) => (parseInt(loanA.id) < parseInt(loanB.id)) ? 1: -1));
  }

  const setFirstRenderStatus = (status: boolean) => {
    context.setFirstRender(status);
  }

  const deletedItem = () => {
    context.setDeletedFlag(context.deletedFlag + 1);
  }

  const setSnowballArr = (arrayInfo:any[]) => {
    context.setSnowballArray(arrayInfo);
  }

  const setSnowballDetails = (arrayInfo:any[]) => {
    context.setSnowballMonthDetails(arrayInfo);
  }

  const setAvalancheArr = (arrayInfo:any[]) => {
    context.setAvalancheArray(arrayInfo);
  }

  const setAvalancheDetails = (arrayInfo:any[]) => {
    context.setAvalancheMonthDetails(arrayInfo);
  }


  const setRangeMinMax = (min, max) => {
    context.setRangeMin(min);
    context.setRangeMax(max);
  }

  const setRangeValue = (val:any) => {
    context.setRangeCurrentVal(val);
  }

  return {
    loansArray: context.loansArray,
    addToArray,
    initializeArray,
    firstRender: context.firstRender,
    setFirstRenderStatus,
    deletedItem,
    deletedFlag: context.deletedFlag,
    updateArray,
    editedFlag: context.editedFlag,
    setRangeMinMax,
    setRangeValue,
    rangeMin: context.rangeMin,
    rangeMax: context.rangeMax,
    rangeVal: context.rangeCurrentVal,
    setSnowballArr,
    snowballArray: context.snowballArray,
    setSnowballDetails,
    snowballDetails: context.snowballMonthDetails,
    setAvalancheArr,
    avalancheArray: context.avalancheArray,
    setAvalancheDetails,
    avalancheDetails: context.avalancheMonthDetails
  };
};

const LoansProvider = (props: { children: ReactNode }) => {
  const [loansArray, setLoansArray] = useState<any | null>([]);
  const [snowballArray, setSnowballArray] = useState<any | null>([]);
  const [snowballMonthDetails, setSnowballMonthDetails] = useState<any | null>([]);
  const [avalancheArray, setAvalancheArray] = useState<any | null>([]);
  const [avalancheMonthDetails, setAvalancheMonthDetails] = useState<any | null>([]);
  const [firstRender, setFirstRender] = useState(true);
  const [deletedFlag, setDeletedFlag] = useState(0);
  const [editedFlag, setEditedFlag] = useState(0);
  const [rangeMin, setRangeMin] = useState(() => {
    let min = 0;
    console.log(loansArray)
    for (let i = 0; i < loansArray.length; i++) {
      min += parseFloat(loansArray[i].minPay);
    }

    console.log("min: " + min);
    return min;
  })
  
  const [rangeMax, setRangeMax] = useState(()=>{
    let max = 0;
    for (let i = 0; i < loansArray.length; i++) {
      max += parseFloat(loansArray[i].principal);
    }
    return max;
  });

  
  const [rangeCurrentVal, setRangeCurrentVal] = useState(() => {
    if (rangeMin > 0) {
      return rangeMin;
    } else {
      return 0;
    }
  });

  // on first render, create an iterable "savedCount" used for loan IDs.
  // if not first render, grab loans from local storage and save to loansArray
  useEffect(() => {
    if (!localStorage.getItem("savedCount")) {
      localStorage.setItem("savedCount", JSON.stringify(0));
    } else {
      if (firstRender) {
        let tempLoans: any[] = [];
        for (var i = 0; i < localStorage.length; i++) {
          if (localStorage.key(i)?.startsWith("\"NDL")) {
            const currentRow = JSON.parse(
              localStorage.getItem(localStorage.key(i))
            );
            tempLoans = [
              {
                id: localStorage.key(i),
                loanName: currentRow.loanName,
                principal: currentRow.principal,
                interest: currentRow.interest,
                minPay: currentRow.minPay,
                paysOff: currentRow.paysOff
              },
              ...tempLoans,
            ];
          }
        }
        setLoansArray(tempLoans);
        setFirstRender(false);
      }
    }
  }, []);

// set inputs page min and max for range slider
  useEffect(() => {
    console.log(loansArray)
    let min = 0;
    let max = 0;
    for (let i = 0; i < loansArray.length; i++) {
      if(loansArray[i].paysOff !== "false") {
        min += parseFloat(loansArray[i].minPay);
        max += parseFloat(loansArray[i].principal);
      }
    }
    setRangeMin(min);
    setRangeMax(max);
    setRangeCurrentVal(min);
  }, [loansArray])

  return (
    <LoansContext.Provider
      value={{
        loansArray,
        setLoansArray,
        firstRender,
        setFirstRender,
        deletedFlag,
        setDeletedFlag,
        editedFlag,
        setEditedFlag,
        snowballArray,
        setSnowballArray,
        snowballMonthDetails,
        setSnowballMonthDetails,
        avalancheArray,
        setAvalancheArray,
        avalancheMonthDetails,
        setAvalancheMonthDetails,
        rangeMin,
        setRangeMin,
        rangeMax,
        setRangeMax,
        rangeCurrentVal,
        setRangeCurrentVal
      }}
    >
      {props.children}
    </LoansContext.Provider>
  );
};

export { useLoansContext, LoansProvider };
