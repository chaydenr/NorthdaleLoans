import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from "react-router-dom";
import { Logo } from "./Logo";
import "./Links.scss";

const Links = () => {
  return (
    <div className="header">
      <h2 className="header__red">
        <Logo />
        <Link to="/NorthdaleLoans/" style={{paddingLeft: "10px"}}>Northdale Loans</Link>
      </h2>
      <ul className="list">
        <li>
          <NavLink to="./NorthdaleLoans/Inputs">Inputs</NavLink>
        </li>
        <li>
          <NavLink to="./NorthdaleLoans/Snowball">Snowball</NavLink>
        </li>
        <li>
          <NavLink to="./NorthdaleLoans/Avalanche">Avalanche</NavLink>
        </li>
      </ul>
      <div className="header__profile"></div>
    </div>
  );
};

export default Links;
