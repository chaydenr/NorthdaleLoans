import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from "react-router-dom";
import { Logo } from "./Logo";
import "./Links.scss";

const Links = () => {
  return (
    <div className="header">
      <h2 className="header__red">
        <Logo />
        <Link to="/" style={{paddingLeft: "10px"}}>Northdale Loans</Link>
      </h2>
      <ul className="list">
        <li>
          <NavLink to="./Inputs">Inputs</NavLink>
        </li>
        <li>
          <NavLink to="./Snowball">Snowball</NavLink>
        </li>
        <li>
          <NavLink to="./Avalanche">Avalanche</NavLink>
        </li>
      </ul>
      <div className="header__profile"></div>
    </div>
  );
};

export default Links;
