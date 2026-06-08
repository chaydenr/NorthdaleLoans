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
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
        congue erat tortor, at tristique sem semper a. Cras aliquet, nunc.
      </p>
      <div className="startButton">
        <Link to="/Inputs">Get Started Now</Link>
      </div>
    </div>
  );
};
