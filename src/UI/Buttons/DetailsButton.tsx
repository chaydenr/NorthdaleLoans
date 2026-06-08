import "./DetailsButton.scss";

export const DetailsButton = (props:any) => {
  const { isActive } = props; 

  const clickHandler = () => {
    console.log(props.itemNumber)
    props.checkActive(props.itemNumber);
  }

  return (
    <>
      {!isActive ? (
        <div className="see-details" onClick={clickHandler}>
          See Details
        </div>
      ) : (
        <div className="hide-details" onClick={clickHandler}>
          Hide Details
        </div>
      )}
    </>
  );
};
