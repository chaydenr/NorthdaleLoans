import "./Home.scss";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div className="welcome">
      <h1>
        Northdale
        <br />
        Loan Calculator
      </h1>
      <p>
        Welcome to the Northdale Loans Paydown Calulator app! Click Get Started below to enter your loan information.
      </p>
      <div className="startButton">
        <Link to="/Inputs">Get Started Now</Link>
      </div>
    </div>
  );
};
